# Sesion actual

- Feature en curso: ninguna
- Ultimas trabajadas: 19 (`done`), 18 (`done`), 9 (`blocked`)
- Inicio: 2026-11-12
- Agente: Claude Code

## Plan

- Cerrar la feature 9 cuando el owner complete `docs/contacto-setup.md`.
- Abrir despues la pagina `/marco-iglesias` de autoridad, y la feature de
  analitica y Search Console.

## Bitacora

- 2026-11-12: feature 19 cerrada. Pagina `/asesoria-ia` con la oferta y FAQ.
- 2026-11-12: se desplego la feature 18, que habia quedado sin pushear.
- 2026-11-03: feature 18 cerrada. H1, H2 y metadata con keywords.
- 2026-11-02: feature 9 implementada y desplegada, queda `blocked` en el setup
  del owner. Endpoint `POST /api/contacto` en produccion.
- 2026-11-02: evaluacion de conversion, leads y SEO en
  `docs/estrategia-conversion-seo.md`.

## Feature 19: que se implemento

Diagnostico: la landing tenia 193 palabras y no explicaba la oferta en ninguna
parte. Las keywords estaban bien puestas desde la feature 18, pero no habia
contenido que las respaldara, asi que la pagina no podia competir por la
busqueda comercial.

- Nueva ruta `/asesoria-ia`, estatica, con 816 palabras de contenido propio.
- Secciones: que pasa en los 30 minutos, que NO incluye, para quien es segun
  tamano de empresa, como funciona, por donde suelen empezar las empresas,
  quien asesora y preguntas frecuentes.
- La seccion "que no incluye" es deliberada: declara que no hay informe
  escrito, que no se accede a datos del cliente y que no se prometen
  resultados ni porcentajes de ahorro.
- Marcado `Service` con `Offer` en 0 CLP y `FAQPage` con las siete preguntas.
  Las preguntas se renderizan y se serializan desde el mismo arreglo, asi que
  el schema no puede desviarse de lo que se ve.
- Estilos nuevos con prefijo `doc-` en `globals.css`, usando los tokens de
  marca existentes. No se agregaron dependencias.
- La navegacion incorpora "Asesoria" y sus enlaces pasan a ser absolutos
  (`/#proyectos` en vez de `#proyectos`) para que funcionen desde cualquier
  ruta, no solo desde la portada.
- `sitemap.ts` declara la ruta nueva.

## Verificacion

- `RUN_BUILD=1 ./init.sh`: lint, typecheck y build pasaron. `/asesoria-ia`
  queda como ruta estatica prerenderizada.
- `git diff --check`: paso.
- Contenido medido sobre el HTML renderizado: 816 palabras, "empresa" 12 veces,
  "asesoria" 7, "inteligencia artificial" 5.
- Jerarquia: un H1, siete H2 y cuatro H3 subordinados a "Para quien es".
- `FAQPage` y `Service` presentes en el HTML servido.
- Revision visual en escritorio y en 375 px: sin desborde horizontal
  (`scrollWidth` igual a `clientWidth`), CTAs a ancho completo de 49 px de alto
  en movil.
- Header y footer verificados en ambas paginas despues de cambiarlos a `Link`.

### Correccion de un reporte previo

Durante esta sesion reporte que lint habia pasado cuando en realidad fallaba:
habia truncado la salida con `tail -6` y los errores quedaron fuera de la
ventana. El error era `@next/next/no-html-link-for-pages` por usar `<a>` hacia
rutas internas. Se corrigio con `next/link` en la pagina nueva, el header y el
footer. Leccion: no truncar la salida de verificacion.

## Riesgos pendientes

- La feature 9 sigue bloqueada: el DNS no tiene MX ni SPF, el buzon no existe y
  el formulario no captura leads.
- Sin analitica no hay forma de medir si el contenido nuevo convierte.
- No esta confirmado que el sitio este indexado. Falta verificar el dominio en
  Google Search Console y enviar el sitemap; requiere la cuenta del owner.
- Las features 10 y 11 siguen `pending`.
- `/asesoria-ia` enlaza a la portada y a marcoiglesias.cl, pero todavia no
  existe `/marco-iglesias`, que es la pagina de autoridad del plan.

## Proximo paso

Que el owner complete `docs/contacto-setup.md` para cerrar la feature 9. En
paralelo se puede abrir `/marco-iglesias`.

## 2026-11-12, trabajo adicional: skill de SEO y correcciones

El owner pidio revisar siete cursos de SEO en video, crear una skill y volver a
analizar la web.

### Los videos

Los siete son cursos en espanol de SEO con IA, GEO y SEO Local (The BIG /
Romuald Fons, y Pedro SEO), unas 17 horas en total. **No se pudo acceder a las
transcripciones**: YouTube devuelve vacio en todos los formatos del endpoint de
subtitulos y `yt-dlp` no esta instalado. Si se obtuvieron los temarios completos
con marcas de tiempo desde las descripciones, que son contenido real y
verificable. El temario del curso de 6 horas trae mas de 50 capitulos y fue la
base de la estructura de la skill.

### Skill creada

`.claude/skills/seo-geo-local/`, 883 lineas:

- `SKILL.md`: metodo de auditoria, orden de prioridades, intencion de busqueda,
  contenido citable por IA, negocios locales y reglas de redaccion.
- `references/on-page.md`, `seo-local.md`, `geo-buscadores-ia.md` y
  `datos-estructurados.md`.
- `scripts/auditar.py`: auditor de una URL sin dependencias externas. Extrae
  title, description, canonical, jerarquia de encabezados, palabras visibles,
  tipos de Schema, enlazado, imagenes y sitemap, y emite hallazgos ordenados por
  gravedad. Se escribio porque este mismo analisis se habia rehecho a mano cinco
  veces durante la sesion.

La skill declara su procedencia: sigue el temario de esos cursos, pero las
recomendaciones vienen de documentacion de Google y practica conocida, no de una
transcripcion.

Para usarla en todos los proyectos y no solo en este:
`cp -r .claude/skills/seo-geo-local ~/.claude/skills/`

### Correcciones que encontro la auditoria

Cuatro eran defectos introducidos en las features 18 y 19:

| Hallazgo | Antes | Ahora |
|---|---|---|
| Title de la portada | 65 caracteres, se cortaba en Google | 49 |
| Description de la portada | 161 | 150 |
| Title de /asesoria-ia | 74 | 60 |
| Description de /asesoria-ia | 166 | 146 |
| og:image en /asesoria-ia | perdida al sobrescribir openGraph en la pagina hija | restaurada |
| Nodo de organizacion en /asesoria-ia | el `@id` apuntaba a un nodo de otra pagina | incluido en la pagina |

En el title de la portada se quito el sufijo de marca para conservar la keyword
completa dentro del limite. El esquema de organizacion y fundador se extrajo a
`content/schema.ts` para que las dos paginas usen la misma fuente y no se
desincronicen.

Tambien se corrigio un falso positivo del propio script: `alt=""` en una imagen
decorativa marcada con `aria-hidden` es correcto, no un fallo de accesibilidad.

### Estado tras las correcciones

- `/asesoria-ia`: 0 hallazgos.
- Portada: 2 hallazgos, ambos conocidos y estructurales.
  - 144 palabras visibles. Lo resolveria sumar contenido al cierre de la
    landing, que no toca el hero pero si cambia la experiencia; queda a decision
    del owner.
  - Sin `FAQPage` en la portada. No se agrega marcando preguntas que no estan
    visibles, porque eso es motivo de penalizacion.

### Verificacion

- `RUN_BUILD=1 ./init.sh`: lint, typecheck y build pasaron.
- `scripts/auditar.py` contra las dos paginas, antes y despues.
