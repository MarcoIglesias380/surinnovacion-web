---
name: seo-geo-local
description: Auditar y mejorar el posicionamiento de un sitio web en Google, en Google Maps y en buscadores con IA como ChatGPT, Gemini y Perplexity. Usala siempre que aparezca SEO, posicionamiento, keywords, palabras clave, H1, meta description, title, datos estructurados, Schema, sitemap, robots.txt, Search Console, GEO, AEO, SEO local, Google Business Profile, ficha de Google, Google Maps, resenas, E-E-A-T, enlazado interno, backlinks o visibilidad en IA. Usala tambien cuando alguien pregunte por que su web no aparece en Google, como salir en ChatGPT, como conseguir mas clientes desde buscadores, o pida revisar, auditar o mejorar una web aunque no diga la palabra SEO.
---

# SEO, GEO y SEO Local

Posicionar hoy son tres juegos distintos sobre el mismo sitio:

- **SEO**: aparecer en los resultados de Google.
- **SEO Local**: aparecer en el mapa y en el paquete local cuando alguien busca cerca.
- **GEO**: que una IA te cite al responder. Ya no basta con rankear: hay que ser
  citable.

Comparten base tecnica, pero premian cosas distintas. Google premia relevancia y
autoridad; una IA premia que tu contenido sea facil de extraer, verificable y
atribuible; Maps premia proximidad, categoria y resenas. Una web puede ir bien en
uno y no existir en los otros.

## Antes de tocar nada: audita

Corre el script. Evita reescribir a mano lo que ya esta resuelto y te da una
linea base contra la que comparar despues.

```bash
python3 scripts/auditar.py https://elsitio.cl
```

Sin dependencias externas. Devuelve title, description, canonical, jerarquia de
encabezados, palabras visibles, tipos de Schema, enlazado, imagenes, sitemap y
una lista de hallazgos ordenada por gravedad. Con `--json` sale en JSON para
compararlo entre ejecuciones.

Lo que el script no puede ver lo lista aparte: ficha de Google Business Profile,
resenas, posiciones reales en el mapa, coherencia del NAP y si la IA te cita. Eso
se revisa a mano y suele ser donde esta el problema de un negocio local.

Audita **cada plantilla distinta**, no solo la portada. Una ruta de producto, una
de servicio y una de blog fallan de formas distintas.

## El orden importa

El error mas comun es optimizar detalles sobre un sitio que no tiene nada que
decir. Este es el orden que de verdad mueve la aguja:

1. **Que el sitio tenga contenido.** Una pagina de 150 palabras no compite, por
   bien puestas que esten las keywords, y una IA no tiene de donde citarte.
2. **Que cada pagina tenga una intencion clara.** Una pagina, una busqueda, una
   accion.
3. **Que la estructura lo refleje.** H1 unico con la keyword, H2 por bloque,
   enlazado interno que conecte lo relacionado.
4. **Que los metadatos no se corten.** Title entre 30 y 60 caracteres,
   description entre 70 y 160.
5. **Que haya datos estructurados** que describan el negocio y las preguntas.
6. **Que exista prueba de quien eres** (E-E-A-T): autor identificable, trabajo
   verificable, datos de contacto reales.
7. **Recien ahi**, enlaces externos y afinado tecnico.

Si el paso 1 falla, los demas rinden poco. Dilo claramente en vez de entregar una
lista de ajustes cosmeticos.

## Intencion de busqueda

Antes de elegir una keyword, pregunta que quiere quien la escribe:

| Intencion | Ejemplo | Que pagina responde |
|---|---|---|
| Informativa | "que es la automatizacion de procesos" | articulo, guia, FAQ |
| Comercial | "mejor software de agenda para salones" | comparativa, analisis |
| Transaccional | "asesoria en inteligencia artificial precio" | pagina de servicio |
| Local | "consultor de IA en Puerto Montt" | pagina local + ficha de Maps |
| Marca | "como se llame la empresa" | portada |

Una pagina que mezcla intenciones no gana ninguna. Si el texto quiere informar y
vender a la vez, normalmente conviene separarlo en dos.

**Elige por posibilidad, no por volumen.** Un negocio nuevo no gana una keyword
generica y nacional. Gana la cola larga: especifica, local, o con un angulo que
solo ese negocio tiene. Es preferible ser primero en algo que buscan cien
personas al mes que el numero cuarenta en algo que buscan cien mil.

## El contenido que una IA puede citar

Para aparecer en respuestas de ChatGPT, Gemini o Perplexity el contenido tiene
que poder extraerse y atribuirse. Lo que funciona:

- **Responder la pregunta en la primera frase**, y despues desarrollar. Los
  modelos extraen fragmentos cortos y autocontenidos.
- **Datos propios**: precios, plazos, proceso, lo que incluye y lo que no. Lo que
  solo tu puedes afirmar es lo que te hace citable. Un texto que repite lo que ya
  dicen mil paginas no da motivo para nombrarte.
- **Preguntas frecuentes reales**, con las palabras que usa la gente, marcadas
  con `FAQPage`.
- **Entidades claras**: nombre del negocio, persona, ciudad y servicio escritos
  explicitamente, no insinuados. Las IA trabajan con entidades, no con adjetivos.
- **Fechas y autoria visibles.**

Los buscadores con IA descomponen una pregunta en varias subconsultas antes de
responder. Por eso una pagina que cubre bien un tema completo, con sus preguntas
derivadas, aparece mas que varias paginas sueltas que lo rozan.

Detalle tecnico: si `robots.txt` bloquea a los rastreadores de IA (GPTBot,
ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot), no te pueden citar.
Es una decision de negocio, no un descuido: conviene decidirla a proposito.

Mas detalle en `references/geo-buscadores-ia.md`.

## Negocios locales

Para un negocio con zona de servicio, la ficha de Google Business Profile suele
pesar mas que la web. Google ordena el mapa por tres cosas: **relevancia**
(cuanto encaja la ficha con la busqueda), **distancia** y **prominencia**
(cuanto se conoce el negocio).

Lo que mas se descuida y mas rinde:

- La **categoria principal** es el factor mas determinante de la ficha. Una
  categoria mal elegida te deja fuera de busquedas enteras.
- Las **resenas**, por cantidad, constancia y respuesta. Pedirlas de forma
  sistematica cambia resultados. Comprarlas o incentivarlas con descuentos viola
  las normas de Google y arriesga la ficha.
- El **NAP** (nombre, direccion, telefono) identico en la web, la ficha y los
  directorios. Las variaciones dispersan la identidad del negocio.
- Una **pagina en la web por zona o servicio**, con contenido propio. Repetir la
  misma pagina cambiando el nombre de la ciudad es una practica que Google
  detecta y que ademas no convence a nadie.

La posicion en el mapa cambia segun donde este quien busca, asi que mirar "como
salgo yo" desde una sola ubicacion enganna. Se mide con una cuadricula de puntos
(GeoGrid).

Mas detalle en `references/seo-local.md`.

## Al escribir o revisar textos

- Escribe para quien decide comprar, no para el buscador. Un texto que se lee
  como escrito para un robot tampoco convence a una IA, que evalua calidad.
- La keyword va en el H1, en el title, en la primera frase y donde caiga natural.
  Repetirla no suma; forzarla resta.
- **No inventes cifras, clientes, casos de exito, premios ni certificaciones.**
  Es la linea roja: un dato inventado destruye la confianza que todo esto busca
  construir, y puede tener consecuencias legales. Si el negocio no tiene pruebas
  todavia, el texto se apoya en lo que si es cierto: el proceso, el criterio, lo
  que incluye y lo que no.
- Declarar los limites ("esto no incluye X") genera mas confianza que prometer de
  mas, y suele ser justo el contenido que una IA cita porque nadie mas lo escribe.

## Antes de dar algo por hecho

Mide en el sitio publicado, no en lo que crees que publicaste:

```bash
python3 scripts/auditar.py https://elsitio.cl          # antes
# ... cambios ...
python3 scripts/auditar.py https://elsitio.cl          # despues
```

Y recuerda decir lo que **no** se verifico. Que el HTML este correcto no prueba
que el sitio este indexado, ni que la IA lo cite, ni que la ficha de Maps mejore.
Eso se confirma en Search Console, preguntandole a los modelos por el negocio, y
midiendo el mapa.

Los cambios de posicionamiento tardan semanas. Prometer resultados en dias es la
senal mas clara de que alguien esta vendiendo humo. No lo hagas tu.

## Referencias

Leelas cuando el trabajo entre en ese terreno:

- `references/on-page.md` — title, description, encabezados, URLs, enlazado
  interno, imagenes y los errores tecnicos que mas se repiten.
- `references/seo-local.md` — Google Business Profile paso a paso, categorias,
  resenas, NAP, paginas por zona y como medir el mapa.
- `references/geo-buscadores-ia.md` — como funcionan los buscadores con IA, que
  hace citable un contenido, rastreadores y como comprobar si te nombran.
- `references/datos-estructurados.md` — que Schema usar segun el caso, con
  ejemplos listos para copiar y los errores que invalidan el marcado.

## Procedencia

El temario de esta skill sigue el de siete cursos en espanol de SEO con IA, SEO
local y GEO (The BIG / Romuald Fons, y Pedro SEO), tomado de sus capitulos
publicos. Las recomendaciones concretas provienen de la documentacion de Google y
de practica conocida, no de una transcripcion de esos videos. Cuando una
afirmacion dependa de algo que cambia rapido (limites exactos, nombres de
rastreadores, comportamiento de un buscador con IA), verificala antes de
presentarla como un hecho.
