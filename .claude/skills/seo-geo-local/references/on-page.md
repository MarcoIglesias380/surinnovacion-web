# SEO on-page

Lo que se controla desde el HTML de cada pagina.

## Title

Lo que se lee en el resultado de Google y lo primero que decide el clic.

- Entre 30 y 60 caracteres. Mas largo se corta con puntos suspensivos.
- La keyword principal al inicio, porque es lo que se lee aunque se corte.
- La marca al final, separada por `|`, salvo en la portada de una marca conocida.
- Distinto en cada pagina. Dos paginas con el mismo title compiten entre ellas.

Google reescribe el title cuando considera que el suyo responde mejor. Si ves uno
distinto en los resultados, suele ser senal de que el tuyo no encajaba con la
busqueda.

## Meta description

No es factor de posicionamiento, pero decide clics.

- Entre 70 y 160 caracteres.
- Que diga el beneficio concreto y, si hay, la oferta.
- Que incluya la keyword, porque Google la resalta en negrita.
- Sin repetir literalmente el title.

## Encabezados

- **Un solo H1** por pagina, con la keyword principal, que diga de que trata.
- **H2** por bloque tematico, con variantes y keywords secundarias.
- **H3** subordinados a su H2.
- Sin saltos de nivel (de H2 a H4). Rompe la estructura para lectores de pantalla
  y le cuesta mas a un rastreador entender la jerarquia.

Un error frecuente: usar parrafos con estilo de titulo en lugar de encabezados
reales. Se ve igual y es invisible para buscadores y lectores de pantalla. Si algo
parece un titulo, que sea un encabezado.

## URLs

- Cortas, legibles y con la keyword: `/asesoria-ia`, no `/pagina?id=42`.
- Con guiones, en minusculas, sin acentos ni enes.
- Estables. Si cambia una URL ya indexada, hay que redirigir con 301.
- Sin profundidad innecesaria: cuantos mas niveles, menos autoridad llega.

## Enlazado interno

De lo mas rentable y mas olvidado. Reparte autoridad, guia el rastreo y mantiene
a la gente dentro.

- Desde las paginas con mas visitas hacia las que quieres posicionar.
- Con texto de enlace descriptivo. "Haz clic aqui" no dice nada; "asesoria en
  inteligencia artificial" si.
- Una pagina sin enlaces entrantes desde el propio sitio es casi invisible.
- En un sitio de una sola pagina, el enlazado interno no existe. Es una de las
  razones por las que una landing unica tiene techo bajo.

Cuidado con las anclas: un `href="#seccion"` solo funciona dentro de esa pagina.
Desde otra ruta hay que escribirlo absoluto (`/#seccion`).

## Imagenes

- Nombre de archivo descriptivo antes de subirla.
- `alt` que describa la imagen. Si es puramente decorativa, `alt=""` mas
  `aria-hidden="true"`: eso es correcto y le dice al lector de pantalla que la
  ignore. Lo que esta mal es que falte el atributo.
- Formatos modernos (WebP, AVIF) y tamano acorde al uso.
- `loading="lazy"` salvo en la imagen principal visible al cargar.

## Errores tecnicos que mas se repiten

- Falta el `canonical`, o apunta a otra pagina por error.
- La misma meta description repetida en todo el sitio.
- Paginas huerfanas, sin ningun enlace interno que llegue a ellas.
- Sitemap con URLs que responden 404 o que estan bloqueadas en robots.txt.
- `noindex` olvidado desde la fase de desarrollo. Revisa esto primero cuando una
  web "no aparece en Google": suele ser la causa.
- Enlaces externos con `target="_blank"` sin `rel="noopener noreferrer"`.
- Contenido importante que solo existe tras una interaccion y no esta en el HTML.
- Metadatos de Open Graph incompletos tras sobrescribirlos en una pagina hija:
  en varios frameworks, declarar `openGraph` en una pagina reemplaza el del
  layout y se pierde la imagen. Comprueba `og:image` pagina por pagina.

## Rendimiento

Importa por conversion antes que por posicionamiento. Mide con datos de campo en
PageSpeed Insights, no solo de laboratorio:

- **LCP** por debajo de 2,5 s: cuanto tarda en verse lo principal.
- **INP** por debajo de 200 ms: cuanto tarda en responder al tocar algo.
- **CLS** por debajo de 0,1: cuanto se mueve el contenido al cargar.

Las causas habituales son imagenes sin optimizar, fuentes que bloquean el
renderizado y scripts de terceros.
