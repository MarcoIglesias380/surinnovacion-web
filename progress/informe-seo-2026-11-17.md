# Informe de estado del SEO - surinnovacion.cl

Fecha: 2026-11-17
Medicion: sobre el sitio publicado, no sobre el repositorio.
Herramienta: `.claude/skills/seo-geo-local/scripts/auditar.py`.

Este informe abre el SEO como proyecto continuo y separado de las mejoras
funcionales y visuales del sitio.

---

## 1. Criterio aplicado

Manda `references/evidencia.md` de la skill. Tres cosas que se ensenan como
regla y no resisten, y que por lo tanto **no** se usan aqui como argumento:

- **El numero de palabras no es un factor de posicionamiento.** Google lo ha
  dicho de forma explicita. Cuando el auditor marca "pocas palabras", lo que hay
  que diagnosticar es si la pagina responde la pregunta completa y si deja algo
  propio que citar, no si llega a un minimo.
- **Los resultados enriquecidos de FAQ se retiraron el 7 de mayo de 2026.**
  Marcar `FAQPage` sigue sirviendo para comprension y para buscadores con IA,
  pero prometer que la FAQ se vera desplegada en Google es vender una funcion
  muerta.
- **E-E-A-T no es un factor del algoritmo.** Es un concepto de las guias que
  Google entrega a evaluadores humanos. No hay casilla que marcar; lo que vale
  son las senales de fondo: autor identificable, trabajo verificable, contacto
  real.

Regla operativa que se respeto en todo el trabajo: **no se marca con datos
estructurados nada que no este visible en la pagina.** Marcar contenido
invisible es motivo de penalizacion manual, no solo de que se ignore el marcado.

---

## 2. Estado medido antes de tocar nada

Las seis rutas publicadas responden HTTP 200. El sitemap declara 8 URLs.

| Ruta | Title | Palabras | Datos estructurados | Hallazgos |
|---|---|---|---|---|
| `/` | 53 | 236 | ProfessionalService, WebSite, WebPage, Person | 2 |
| `/servicios` | 48 | 890 | + Service, ItemList, FAQPage | 0 |
| `/asesoria-ia` | 60 | 344 | + Service, Offer, FAQPage | 0 |
| `/marco-iglesias` | 49 | 384 | ProfessionalService, Person | 1 |
| `/blog` | 57 | 137 | **ninguno** | 3 |
| `/blog/modelos-de-frontera-ia-noviembre-2026` | **82** | 387 | BlogPosting | 3 |
| `/blog/adopcion-ia-empresas-ocde-2026` | **68** | 343 | BlogPosting | 3 |
| `/blog/centros-de-datos-energia-ia-2026` | **80** | 300 | BlogPosting | 3 |

`/servicios` y `/asesoria-ia` estan limpias. El problema estaba concentrado en
el blog.

### Los cinco hallazgos del traspaso: confirmados

1. `/blog` sin ningun JSON-LD. Confirmado.
2. El title del articulo medido en 82 caracteres. Confirmado.
3. Ni `/blog` ni los articulos declaran `og:image`. Confirmado.
4. La portada tiene 236 palabras visibles y no declara `FAQPage`. Confirmado.
5. "inteligencia artificial" salio del title de la portada. Confirmado, y es
   mas grande de lo descrito. Ver la seccion 3.

### Tres hallazgos adicionales que no estaban en el traspaso

6. **El title largo no era de un articulo, era del patron.** Los tres articulos
   superaban los 60 caracteres: 82, 68 y 80. La causa es el sufijo de marca
   `| SurInnovacion` sumado a titulares ya largos.

7. **`twitter:title` y `twitter:description` de todo el sitio son los de la
   portada.** Ninguna pagina sobrescribe el objeto `twitter`, y Next.js fusiona
   los metadatos de forma superficial, asi que todas heredan el bloque del
   layout. Medido en produccion, `/servicios`, `/blog` y los articulos anuncian
   en X el titulo "Consultoría en innovación empresarial | SurInnovacion".
   Es la misma causa raiz que la `og:image` perdida.

8. **El auditor reportaba los H2 de `/blog` como vacios.** Era un defecto del
   script, no del sitio: solo capturaba el texto del encabezado cuando estaba
   directamente bajo el, y en `/blog` cada H2 envuelve un enlace. El HTML
   publicado siempre tuvo sus encabezados completos. Corregido en el script,
   porque un instrumento que miente lleva a "arreglar" lo que esta bien.

---

## 3. El hallazgo mas serio: la portada perdio su entidad

El traspaso decia que "inteligencia artificial" salio del title. Medido sobre el
HTML publicado, salio de la pagina entera.

Conteo sobre el texto visible de la portada, 273 palabras:

| Termino | Veces |
|---|---|
| inteligencia artificial | **0** |
| innovacion empresarial | **0** |
| automatizacion | **0** |
| consultoria | 1 |
| procesos | 3 |
| Puerto Montt | 4 |

Dos consecuencias:

- La keyword mas fuerte del negocio no aparece **en ninguna parte** del texto
  visible de la pagina principal. Solo quedan dos apariciones de la sigla "IA",
  ambas en el bloque del blog.
- **El title promete algo que la pagina no dice.** El title es "Consultoría en
  innovación empresarial", y la frase "innovacion empresarial" no esta en el
  cuerpo. El H1 es "Sistemas a medida para tu empresa". Title y H1 compiten por
  intenciones distintas, y ninguna de las dos esta desarrollada abajo.

El commit `b64a4be` del 2026-11-15 cambio, en el mismo movimiento:

- title: `Asesoria en Inteligencia Artificial para empresas` -> `Consultoría en innovación empresarial`
- H1: `Inteligencia artificial para tu empresa.` -> `Sistemas a medida para tu empresa`
- y elimino del hero la linea `Marco Iglesias · Master y divulgador de Inteligencia Artificial`

Esa tercera perdida es la menos visible y pesa en GEO. El nombre de Marco sigue
en la portada: aparece 4 veces en el texto visible. Lo que desaparecio es su
formacion, que estaba solo en esa linea: "master" y "divulgador" dan **0** en
toda la pagina. Las IA trabajan con entidades explicitas (persona, formacion,
ciudad, servicio), no insinuadas.

**No cambie el posicionamiento por mi cuenta.** La recomendacion escrita, con
tres opciones y sus costos, esta en
[`docs/recomendacion-title-portada.md`](../docs/recomendacion-title-portada.md).

---

## 4. Lo que se corrigio en esta sesion

Feature 23, `seo-blog-datos-estructurados`. Alcance: datos estructurados y
metadatos del blog. No se toco el contenido de los articulos ni el
posicionamiento de la portada.

| Cambio | Antes | Despues |
|---|---|---|
| JSON-LD en `/blog` | ninguno | `Blog` con sus 3 `BlogPosting`, `BreadcrumbList` y el nodo de organizacion |
| JSON-LD en articulos | `BlogPosting` | + `BreadcrumbList`, `@id`, `url`, `isPartOf` hacia el nodo del blog, `image` y `mainEntityOfPage` como objeto |
| Title de los articulos | 82 / 68 / 80 | 56 / 52 / 56 |
| `og:image` | ausente en las 4 rutas | presente en las 4 |
| `twitter:title` y `twitter:description` | los de la portada | propios de cada pagina del blog |
| Ruta de navegacion | solo un enlace suelto de vuelta | `nav` visible "Inicio › Noticias de IA e innovación" |

Decisiones y por que:

- **El sufijo de marca sale del title de los articulos**, con `absolute`. Cuesta
  16 caracteres sobre titulares que ya son largos, y el dominio se muestra igual
  en el resultado. Es el mismo criterio que ya se habia aplicado en
  `/marco-iglesias`. El H1 de cada articulo **no se toco**: sigue siendo el
  titular completo. Solo se acorto lo que lee Google, con un campo nuevo
  `metaTitle` que se usa cuando existe.
- **La ruta de navegacion se agrego visible antes de marcarla.** `BreadcrumbList`
  describe una navegacion; marcarla sin que exista en la pagina habria sido
  justo lo que la regla prohibe. Las etiquetas visibles y las del marcado salen
  de la misma constante, asi que no pueden desincronizarse.
- **No se agrego `FAQPage` a `/blog` ni a los articulos.** No hay preguntas
  visibles ahi. Inventarlas para que el auditor quede en cero es exactamente la
  practica penalizable.
- **El `author` del `BlogPosting` sigue siendo la organizacion**, no Marco,
  porque la firma visible dice "SurInnovacion". El marcado no puede afirmar una
  autoria que la pagina no muestra.
- **`og:image` reusa el isotipo de 500x500** que ya usan `/servicios` y
  `/asesoria-ia`. Resuelve el "no aparece tarjeta" y mantiene la coherencia.
  Una imagen propia de 1200x630 sigue pendiente y es trabajo de diseno.

### Verificacion ejecutada

- `RUN_BUILD=1 ./init.sh`: lint, typecheck y build pasaron. Las cuatro rutas del
  blog quedan prerenderizadas como estaticas.
- Auditoria de las cuatro rutas sobre un **build de produccion servido en
  local**, no sobre el codigo: `/blog` pasa de 3 hallazgos a 2, y cada articulo
  de 3 a 1. Los hallazgos que quedan son los dos que se decidio no forzar:
  cobertura del indice y ausencia de `FAQPage`.
- JSON-LD parseado y validado: tipos correctos, `@id` que resuelven entre si,
  `isPartOf` del articulo apuntando al nodo del blog, 4 citas conservadas.
- Etiquetas `og:` y `twitter:` leidas del HTML servido: propias por pagina.
- Chrome a 375x812: la ruta de navegacion se ve, no desborda
  (`scrollWidth == clientWidth`) y su texto coincide con el del marcado.

---

## 5. Prioridades

Ordenadas por lo que mueve la aguja, no por esfuerzo.

**P0. El embudo esta roto y no es un problema de SEO.** El dominio no tiene MX,
SPF ni DMARC, el buzon no existe y el formulario no captura leads: deriva a
WhatsApp. Todo el trafico que este trabajo consiga cae ahi. Mientras siga asi,
cada mejora de posicionamiento rinde menos de lo que deberia. Depende del owner:
`docs/contacto-setup.md`. La feature 9 sigue `blocked`.

**P1. Decidir el posicionamiento de la portada.** Es la pagina con mas fuerza
del dominio y hoy no compite por la keyword principal ni dice la frase de su
propio title. Ver `docs/recomendacion-title-portada.md`.

**P2. Search Console.** Sin esto nada de lo anterior es medible: no hay dato de
indexacion, impresiones ni posiciones. Enviar el sitemap e inspeccionar las ocho
URLs. Requiere la cuenta del owner. Es tambien la unica forma de saber si la
decision de P1 fue correcta.

**P3. `twitter:title` y `twitter:description` propios en el resto del sitio.**
`/servicios`, `/asesoria-ia` y `/marco-iglesias` siguen anunciando el titulo de
la portada en X. La correccion de fondo es un helper compartido que arme
`openGraph` y `twitter` desde el title y la description de cada pagina, para que
el defecto no se repita en la proxima ruta.

**P4. Cobertura de `/blog`.** 141 palabras. El problema no es el largo: es que
el indice no dice nada propio. Una entrada que explique que se publica, con que
criterio se eligen las fuentes y para quien es, lo vuelve una pagina con algo
que citar en vez de una lista de enlaces.

**P5. Preguntas frecuentes visibles en la portada.** La portada es la unica
pagina comercial sin FAQ. El camino correcto es escribir las preguntas,
publicarlas y recien entonces marcarlas. Nunca al reves.

**P6. Imagen social propia de 1200x630.** Hoy las cuatro rutas del blog comparten
el isotipo. Para contenido pensado para circular, una imagen por articulo es la
diferencia entre una tarjeta generica y una que invita al clic.

---

## 6. Lo que NO quedo verificado

Honestidad sobre el alcance de esta medicion:

- **Nada de esto esta en produccion todavia.** Los cambios estan en el
  repositorio y verificados contra un build de produccion servido en local. No
  se hizo push: requiere la aprobacion del owner. Hasta que se despliegue y se
  vuelva a auditar el dominio, la correccion no esta confirmada en el sitio real.
- **Indexacion y posiciones: sin dato.** No hay acceso a Search Console. Que el
  HTML sea correcto no prueba que Google lo haya indexado, ni que posicione.
- **Citas en buscadores con IA: sin medir.** No se comprobo si ChatGPT, Gemini o
  Perplexity nombran a SurInnovacion.
- **Ficha de Google Business Profile, resenas y posicion en el mapa: fuera de
  esta medicion.** Para un negocio local suele ser donde esta el problema real, y
  no se ve desde el HTML.
- **Core Web Vitals con datos de campo: no medidos.**
- **El efecto de los cambios tarda semanas.** Cualquier lectura antes de eso es
  ruido.
