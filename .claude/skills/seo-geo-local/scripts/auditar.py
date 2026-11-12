#!/usr/bin/env python3
"""Audita una URL para SEO, GEO y SEO Local. Sin dependencias externas.

Uso:
    python3 auditar.py https://ejemplo.cl
    python3 auditar.py https://ejemplo.cl --json

Imprime un informe de los elementos que se pueden verificar desde el HTML
servido. Lo que no se puede ver desde aqui (Google Business Profile,
posiciones reales, backlinks) queda listado como pendiente de revision manual.
"""

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

UA = "Mozilla/5.0 (compatible; auditor-seo/1.0)"
LIMITES = {
    "title_min": 30, "title_max": 60,
    "desc_min": 70, "desc_max": 160,
    "palabras_min": 300,
}
RASTREADORES_IA = ["GPTBot", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "OAI-SearchBot", "CCBot"]


def traer(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "es-CL,es;q=0.9"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode("utf-8", "replace")


class Extractor(HTMLParser):
    """Recorre el HTML una sola vez y junta lo que importa."""

    VACIAS = {"script", "style", "noscript", "template", "svg"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titulo = ""
        self.meta = {}
        self.og = {}
        self.canonical = ""
        self.lang = ""
        self.encabezados = []
        self.imagenes = []
        self.enlaces = []
        self.jsonld = []
        self.texto = []
        self._pila = []
        self._en_titulo = False
        self._en_jsonld = False
        self._buffer_jsonld = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self._pila.append(tag)
        if tag == "html":
            self.lang = a.get("lang", "")
        elif tag == "title":
            self._en_titulo = True
        elif tag == "meta":
            if a.get("name"):
                self.meta[a["name"].lower()] = a.get("content", "")
            if a.get("property", "").startswith("og:"):
                self.og[a["property"]] = a.get("content", "")
        elif tag == "link" and "canonical" in (a.get("rel") or ""):
            self.canonical = a.get("href", "")
        elif tag in ("h1", "h2", "h3", "h4"):
            self.encabezados.append([tag, ""])
        elif tag == "img":
            self.imagenes.append({
                "src": a.get("src", ""),
                "alt": a.get("alt"),
                "decorativa": a.get("aria-hidden") == "true" or a.get("role") == "presentation",
                "loading": a.get("loading"),
            })
        elif tag == "a" and a.get("href"):
            self.enlaces.append({"href": a["href"], "rel": a.get("rel", ""), "target": a.get("target", "")})
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._en_jsonld = True
            self._buffer_jsonld = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._en_titulo = False
        if tag == "script" and self._en_jsonld:
            self._en_jsonld = False
            try:
                self.jsonld.append(json.loads("".join(self._buffer_jsonld)))
            except Exception:
                pass
        while self._pila:
            if self._pila.pop() == tag:
                break

    def handle_data(self, data):
        if self._en_jsonld:
            self._buffer_jsonld.append(data)
            return
        if self._en_titulo:
            self.titulo += data
            return
        if any(t in self.VACIAS for t in self._pila):
            return
        if self.encabezados and self._pila and self._pila[-1] in ("h1", "h2", "h3", "h4"):
            self.encabezados[-1][1] += data
        self.texto.append(data)


def tipos_schema(bloques):
    tipos = []

    def recorrer(n):
        if isinstance(n, dict):
            t = n.get("@type")
            if isinstance(t, str):
                tipos.append(t)
            elif isinstance(t, list):
                tipos.extend(x for x in t if isinstance(x, str))
            for v in n.values():
                recorrer(v)
        elif isinstance(n, list):
            for v in n:
                recorrer(v)

    recorrer(bloques)
    return sorted(set(tipos))


def auditar(url):
    estado, html = traer(url)
    p = Extractor()
    p.feed(html)

    palabras = [w for w in re.sub(r"\s+", " ", "".join(p.texto)).split() if any(c.isalpha() for c in w)]
    h1 = [t for t, _ in p.encabezados if t == "h1"]
    base = f"{urlparse(url).scheme}://{urlparse(url).netloc}"

    internos, externos = [], []
    for e in p.enlaces:
        h = e["href"]
        if h.startswith("#") or h.startswith("mailto:") or h.startswith("tel:"):
            continue
        (externos if urlparse(urljoin(url, h)).netloc != urlparse(url).netloc else internos).append(e)

    inseguros = [e for e in externos if e["target"] == "_blank" and "noopener" not in (e["rel"] or "") and "noreferrer" not in (e["rel"] or "")]

    robots, sitemap, rastreadores = "", "", {}
    try:
        _, robots = traer(urljoin(base, "/robots.txt"))
        for bot in RASTREADORES_IA:
            rastreadores[bot] = bot.lower() in robots.lower()
    except Exception:
        robots = None
    try:
        _, sitemap = traer(urljoin(base, "/sitemap.xml"))
        urls_sitemap = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    except Exception:
        urls_sitemap = []

    schema = tipos_schema(p.jsonld)
    titulo = p.titulo.strip()
    desc = p.meta.get("description", "").strip()

    hallazgos = []

    def anotar(nivel, area, texto):
        hallazgos.append({"nivel": nivel, "area": area, "detalle": texto})

    if not titulo:
        anotar("alto", "on-page", "No hay <title>.")
    elif not (LIMITES["title_min"] <= len(titulo) <= LIMITES["title_max"]):
        anotar("medio", "on-page", f"El title mide {len(titulo)} caracteres; conviene entre {LIMITES['title_min']} y {LIMITES['title_max']} para que no se corte en Google.")
    if not desc:
        anotar("alto", "on-page", "No hay meta description: Google improvisa el fragmento.")
    elif not (LIMITES["desc_min"] <= len(desc) <= LIMITES["desc_max"]):
        anotar("medio", "on-page", f"La meta description mide {len(desc)} caracteres; conviene entre {LIMITES['desc_min']} y {LIMITES['desc_max']}.")
    if len(h1) == 0:
        anotar("alto", "on-page", "No hay H1.")
    elif len(h1) > 1:
        anotar("medio", "on-page", f"Hay {len(h1)} H1; deberia haber uno solo.")
    if not p.canonical:
        anotar("medio", "on-page", "Falta la etiqueta canonical.")
    if not p.lang:
        anotar("medio", "accesibilidad", "El <html> no declara lang.")
    if len(palabras) < LIMITES["palabras_min"]:
        anotar("alto", "contenido", f"Solo {len(palabras)} palabras visibles. Por debajo de ~{LIMITES['palabras_min']} es muy dificil competir, y una IA tiene poco que citar.")

    niveles = [int(t[1]) for t, _ in p.encabezados]
    for i in range(1, len(niveles)):
        if niveles[i] - niveles[i - 1] > 1:
            anotar("bajo", "on-page", f"Salto de nivel en los encabezados: de H{niveles[i-1]} a H{niveles[i]}.")
            break

    # alt="" es la forma correcta de declarar una imagen decorativa, no un fallo.
    # El problema real es que falte el atributo, o que una imagen de contenido lo tenga vacio.
    sin_atributo = [i for i in p.imagenes if i["alt"] is None]
    vacio_no_decorativa = [i for i in p.imagenes if i["alt"] is not None and not i["alt"].strip() and not i["decorativa"]]
    if sin_atributo:
        anotar("medio", "accesibilidad", f"{len(sin_atributo)} de {len(p.imagenes)} imagenes sin atributo alt.")
    if vacio_no_decorativa:
        anotar("bajo", "accesibilidad", f"{len(vacio_no_decorativa)} imagenes con alt vacio sin marcarse como decorativas (aria-hidden o role=presentation).")
    if inseguros:
        anotar("medio", "seguridad", f"{len(inseguros)} enlaces externos con target=_blank sin rel noopener/noreferrer.")
    if len(internos) < 5:
        anotar("medio", "arquitectura", f"Solo {len(internos)} enlaces internos. El enlazado interno reparte autoridad y guia el rastreo.")

    if not schema:
        anotar("alto", "datos-estructurados", "No hay JSON-LD. Sin datos estructurados pierdes resultados enriquecidos y le cuesta mas a una IA entender el negocio.")
    else:
        if not any(t in schema for t in ("LocalBusiness", "ProfessionalService", "Organization")):
            anotar("medio", "datos-estructurados", "Falta un tipo de negocio (LocalBusiness, ProfessionalService u Organization).")
        if "FAQPage" not in schema:
            anotar("bajo", "geo", "Sin FAQPage. Las preguntas marcadas son de lo que mejor se cita en respuestas de IA.")
    if p.og and "og:image" not in p.og:
        anotar("bajo", "social", "Sin og:image: al compartir el enlace no se ve tarjeta.")
    if robots is None:
        anotar("medio", "rastreo", "No se pudo leer /robots.txt.")
    if not urls_sitemap:
        anotar("medio", "rastreo", "No se pudo leer /sitemap.xml o viene vacio.")

    orden = {"alto": 0, "medio": 1, "bajo": 2}
    hallazgos.sort(key=lambda h: orden[h["nivel"]])

    return {
        "url": url, "estado_http": estado, "lang": p.lang,
        "title": titulo, "title_largo": len(titulo),
        "description": desc, "description_largo": len(desc),
        "canonical": p.canonical, "robots_meta": p.meta.get("robots", ""),
        "palabras_visibles": len(palabras),
        "encabezados": [[t, re.sub(r"\s+", " ", x).strip()] for t, x in p.encabezados],
        "conteo_encabezados": {n: sum(1 for t, _ in p.encabezados if t == n) for n in ("h1", "h2", "h3", "h4")},
        "schema": schema,
        "enlaces_internos": len(internos), "enlaces_externos": len(externos),
        "enlaces_inseguros": len(inseguros),
        "imagenes": len(p.imagenes),
        "imagenes_sin_atributo_alt": len(sin_atributo),
        "imagenes_decorativas": sum(1 for i in p.imagenes if i["decorativa"]),
        "og": p.og,
        "sitemap_urls": urls_sitemap,
        "rastreadores_ia_nombrados": rastreadores,
        "hallazgos": hallazgos,
        "revisar_a_mano": [
            "Ficha de Google Business Profile: categorias, descripcion, horarios, atributos y fotos.",
            "Resenas: cantidad, frecuencia, respuestas y patrones en lo que dicen.",
            "Posiciones reales en Google Maps por zona (GeoGrid), que no se ven desde el HTML.",
            "Coherencia del NAP (nombre, direccion, telefono) en directorios externos.",
            "Si el negocio aparece citado al preguntar por el en ChatGPT, Gemini y Perplexity.",
            "Core Web Vitals con datos de campo en PageSpeed Insights.",
        ],
    }


def imprimir(r):
    print(f"\n{'=' * 72}\nAUDITORIA SEO / GEO / LOCAL\n{r['url']}  ->  HTTP {r['estado_http']}\n{'=' * 72}")
    print(f"\nBASE")
    print(f"  lang              {r['lang'] or '(sin declarar)'}")
    print(f"  title             [{r['title_largo']}] {r['title'][:70]}")
    print(f"  description       [{r['description_largo']}] {r['description'][:70]}")
    print(f"  canonical         {r['canonical'] or '(falta)'}")
    print(f"  palabras visibles {r['palabras_visibles']}")
    print(f"  schema            {', '.join(r['schema']) or '(ninguno)'}")
    c = r["conteo_encabezados"]
    print(f"  encabezados       H1:{c['h1']}  H2:{c['h2']}  H3:{c['h3']}  H4:{c['h4']}")
    print(f"  enlaces           {r['enlaces_internos']} internos / {r['enlaces_externos']} externos")
    print(f"  imagenes          {r['imagenes']} ({r['imagenes_sin_atributo_alt']} sin alt, {r['imagenes_decorativas']} decorativas)")
    print(f"  sitemap           {len(r['sitemap_urls'])} URLs")

    print(f"\nESTRUCTURA DE ENCABEZADOS")
    for t, texto in r["encabezados"][:25]:
        print(f"  {'  ' * (int(t[1]) - 1)}{t.upper()}  {texto[:66]}")

    print(f"\nHALLAZGOS ({len(r['hallazgos'])})")
    if not r["hallazgos"]:
        print("  Nada que corregir de lo que se puede ver en el HTML.")
    for h in r["hallazgos"]:
        print(f"  [{h['nivel'].upper():5}] {h['area']:18} {h['detalle']}")

    print(f"\nREVISAR A MANO (no se ve desde el HTML)")
    for x in r["revisar_a_mano"]:
        print(f"  - {x}")
    print()


def main():
    ap = argparse.ArgumentParser(description="Auditoria SEO, GEO y SEO Local de una URL.")
    ap.add_argument("url")
    ap.add_argument("--json", action="store_true", help="Salida en JSON en vez del informe legible.")
    args = ap.parse_args()
    url = args.url if "://" in args.url else "https://" + args.url
    try:
        r = auditar(url)
    except urllib.error.HTTPError as e:
        print(f"Error HTTP {e.code} al pedir {url}", file=sys.stderr); sys.exit(1)
    except Exception as e:
        print(f"No se pudo auditar {url}: {e}", file=sys.stderr); sys.exit(1)
    print(json.dumps(r, ensure_ascii=False, indent=2) if args.json else "", end="")
    if not args.json:
        imprimir(r)


if __name__ == "__main__":
    main()
