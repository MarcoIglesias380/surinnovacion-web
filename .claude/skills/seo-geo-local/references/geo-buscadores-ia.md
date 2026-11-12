# GEO: aparecer en buscadores con IA

GEO (Generative Engine Optimization), a veces AEO, es trabajar para que una IA te
**cite** al responder, no para que te liste.

Cambia la unidad de exito. En Google el premio es una posicion y un clic. En
ChatGPT, Gemini, Perplexity o los AI Overviews el premio es ser la fuente de la
respuesta, muchas veces sin clic. Eso suena mal para el trafico, pero quien llega
despues de una recomendacion llega mucho mas convencido.

## Como responden estos buscadores

Cuando alguien pregunta algo complejo, el modelo no busca esa frase literal.
Descompone la pregunta en varias subconsultas, busca cada una por separado y
compone la respuesta con lo que encuentra (es lo que se llama *query fan-out*).

Dos consecuencias practicas:

- Gana la pagina que cubre un tema **completo**, con sus preguntas derivadas, por
  encima de varias paginas sueltas que lo rozan.
- Importan las preguntas que nadie escribe en un buscador pero si le hace a una
  IA: "me conviene a mi", "cuanto demora", "que pasa si no funciona".

## Que hace que un contenido se cite

**Responde primero, desarrolla despues.** Los modelos extraen fragmentos cortos y
autocontenidos. Un parrafo que empieza con rodeos no se puede citar.

**Di algo que solo tu puedes decir.** Precios, plazos, el proceso exacto, lo que
incluye y lo que no, en que casos no conviene. Un texto que repite lo que ya dicen
mil paginas no da ningun motivo para nombrarte. Esta es la diferencia principal
con el SEO clasico, donde a veces bastaba con cubrir el tema mejor que otros.

**Nombra las entidades.** Negocio, persona, ciudad, servicio, escritos
explicitamente. Los modelos razonan con entidades y sus relaciones. "Trabajamos
desde el sur" no te asocia con nada; "SurInnovacion, en Puerto Montt" si.

**Preguntas frecuentes reales**, con las palabras de la gente, marcadas con
`FAQPage`. Es el formato mas citado porque ya viene en pares pregunta-respuesta.

**Estructura limpia.** Encabezados que describen, listas, tablas. Facilita la
extraccion.

**Fecha y autor visibles.** Un contenido sin autor ni fecha es mas dificil de
atribuir, y la atribucion es justamente lo que se busca.

**Consistencia fuera de tu web.** Los modelos se entrenan y se apoyan en muchas
fuentes. Que tu negocio se describa igual en tu web, tu ficha, LinkedIn y
directorios refuerza la entidad. Que haya contradicciones la debilita.

## Rastreadores de IA

Si los bloqueas, no te pueden citar. Los principales:

| Rastreador | De quien | Para que |
|---|---|---|
| `GPTBot` | OpenAI | entrenamiento |
| `OAI-SearchBot` | OpenAI | busqueda en ChatGPT |
| `ClaudeBot` | Anthropic | entrenamiento y busqueda |
| `PerplexityBot` | Perplexity | busqueda |
| `Google-Extended` | Google | entrenamiento de Gemini |
| `CCBot` | Common Crawl | fuente de muchos modelos |

Un `robots.txt` que permite todo ya los deja pasar. La decision de bloquearlos es
de negocio, no tecnica: bloquear protege el contenido de usarse en entrenamiento y
a la vez te saca de las respuestas. Para un negocio que quiere clientes,
normalmente conviene dejarlos entrar. Decidelo a proposito, no por omision.

Un detalle que se pasa por alto: **lo que depende de JavaScript puede no verse**.
Varios de estos rastreadores leen el HTML tal cual llega. Si el contenido
importante se inyecta en el navegador, para ellos no existe. El renderizado en
servidor no es un lujo aqui.

## Como comprobar si te citan

No hay Search Console para esto. Se hace a mano y conviene repetirlo cada cierto
tiempo:

1. Pregunta por el negocio por su nombre en ChatGPT, Gemini y Perplexity. Mira si
   lo conocen y si lo describen bien.
2. Haz las preguntas de tus clientes sin nombrar la marca ("quien hace X en Y
   ciudad") y mira si apareces y quien aparece en tu lugar.
3. Revisa que fuentes cita la respuesta. Suelen ser directorios, comparativas y
   prensa: esos son tus objetivos de aparicion.
4. Anota la fecha y repite. Lo que importa es la tendencia.

Si te describen mal, el problema casi siempre es que tu web no dice eso con
claridad, o que lo dice distinto en otros sitios.

## Lo que no hay que hacer

- Generar decenas de paginas con IA para "cubrir" temas. Contenido sin nada propio
  no se cita y arrastra la calidad del dominio.
- Rellenar de preguntas frecuentes inventadas que nadie hace.
- Marcar con `FAQPage` preguntas que no estan visibles en la pagina. El marcado
  tiene que describir lo que hay.
- Prometer "posicionamiento en ChatGPT" como un servicio con resultado garantizado.
  Nadie controla lo que cita un modelo.
