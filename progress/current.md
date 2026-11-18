### Lo que faltaba, ya resuelto el 2026-11-18

Se completo la cadena: cuenta propia de Resend con `send.surinnovacion.cl`
verificado, tabla `public.leads` en Supabase con RLS activo, y las cinco
variables en Vercel. Verificado contra produccion:

```
POST https://surinnovacion.cl/api/contacto
{"ok":true,"channels":["almacen","correo"]}
```

En ese orden: el endpoint guarda antes de notificar, que era el criterio que
faltaba. La feature 9 quedo `done`.

Dos decisiones que conviene recordar, ambas detalladas en
`docs/contacto-setup.md`:

- La cuenta de Resend es **propia de SurInnovacion**, separada de la del salon.
- La tabla vive en el proyecto `surinnovacion-social-ia` porque el plan gratuito
  de Supabase limita a dos proyectos activos **por usuario**, no por
  organizacion. Antes de cualquier reset de esa base, exportar `public.leads`.

# Sesion actual

- Feature en curso: ninguna
- Ultima feature cerrada: **24, medir trafico, conversion e indexacion**, el
  2026-11-18. Resumen en `progress/history.md`.
- Ultima feature cerrada: **9, conectar contacto real sin perder leads**,
- Anterior: 9, conectar contacto real sin perder leads, cerrada el mismo dia:
  el formulario captura, guarda y avisa.
- Antes: 23, datos estructurados y metadatos del blog.
  **Desplegada y verificada en produccion** el 2026-11-17 (commit `f18ee0f`):
  titles 57/56/52/56, `Blog` y `BreadcrumbList` en el indice, `isPartOf` en los
  articulos y tarjetas sociales propias, reauditado sobre el dominio.

## 2026-11-18, analitica: feature 24

El sitio ya captura leads, pero no sabiamos cuanta gente llega ni que
porcentaje escribe. Se monto medicion.

### Decision: Vercel Web Analytics, no Google Analytics

La eligio el owner entre tres opciones. Las razones:

- Viene **incluida en el plan Pro** que ya paga, asi que no suma costo.
- **No usa cookies ni identificadores persistentes**, por lo que no obliga a un
  banner de consentimiento. Eso importa en este sitio: cualquier banner tapa
  parte de la portada, que es el activo visual que no se toca.
- GA4 se descarto por tres cosas: el banner, el peso y enviar datos de los
  visitantes a un tercero. El peso, medido y no estimado: el script de Vercel
  Analytics pesa **2 080 bytes**; el `gtag.js` de Google, **157 441 bytes**
  comprimido. Son 75 veces mas.

### Dependencias nuevas, justificadas

`AGENTS.md` exige justificarlas aqui:

| Paquete | Version | Por que |
|---|---|---|
| `@vercel/analytics` | 2.0.1 | Visitas, paginas y el evento de conversion |
| `@vercel/speed-insights` | 2.1.0 | Metricas de carga reales de los visitantes, utiles para la feature 11 |

Ambas fijadas sin `^`, siguiendo la convencion del resto de `package.json`.

### El evento de conversion

El formulario marca `contacto` con un unico campo, `desenlace`, que vale
`enviado`, `whatsapp` o `fallido`. **No viaja ningun dato del visitante**: ni
nombre, ni correo, ni mensaje. Solo cual de los tres finales ocurrio.

La llamada va envuelta en `try/catch` a proposito: si la analitica falla, el
lead se envia igual. Medir nunca puede costar un cliente.

Con eso se puede calcular la unica cifra que importa hoy: cuantas de las visitas
terminan en alguien escribiendo.

### Verificacion en produccion

Los scripts no aparecen en el HTML servido: Vercel los inyecta al montar el
componente y los sirve bajo **rutas aleatorias** para que los bloqueadores de
anuncios no los reconozcan por el nombre. Buscarlos con `curl` sobre el HTML da
cero; hay que mirar el navegador.

Medido sobre el sitio en vivo:

| | |
|---|---|
| `/bcf09d2d40e14856/script.js` | 2 080 bytes, analitica |
| `/d997a92d2d885d6a/script.js` | 7 619 bytes, speed insights |
| **Total** | **9 699 bytes** |

Evidencia de que mide de verdad, no solo de que carga:

```
POST /bcf09d2d40e14856/view    200
POST /d997a92d2d885d6a/vitals  200
```

Y la comprobacion que importaba para no necesitar banner: el sitio devuelve
**cero cabeceras `Set-Cookie`** y `document.cookie` esta vacio.

### Search Console

Propiedad **de dominio** `surinnovacion.cl`, no de prefijo de URL: cubre `www` y
sin `www`, `http` y `https`, y cualquier subdominio futuro de una sola vez. Con
la otra habria que crear propiedades separadas y los datos saldrian partidos.

Verificada por DNS el 2026-11-18. El TXT se publico en el apex **junto al SPF**,
no en su lugar:

```
"v=spf1 include:_spf.mail.hostinger.com ~all"
"google-site-verification=xdNfOw_zxrD4rGkoueMviyXnxPemGjXm8KrjmyqiZcI"
```

Un dominio admite todos los TXT que quiera; la regla de "uno solo" aplica al
SPF en particular. Comprobado tras el cambio: sigue habiendo exactamente **un**
registro SPF, y los MX y el registro A del apex no se movieron.

El sitio ya estaba listo para que Google lo leyera: `robots.txt` con `Allow: /`
y declarando el sitemap, y `sitemap.xml` con las ocho URLs.

Los datos tardan dos o tres dias en aparecer y la indexacion una o dos semanas.
Ver todo en cero al dia siguiente no es sintoma de nada.

### Hallazgo de otro proyecto, anotado al pasar

Al abrir Search Console se vio la propiedad de **columbaboutique.com**, que es
uno de los proyectos de la vitrina de este sitio:

```
0 clics en la busqueda web
39 paginas no indexadas, 0 paginas indexadas
```

Google conoce 39 URLs de ese ecommerce y no acepto ninguna. No se toco porque es
otro proyecto, pero el informe de "Paginas no indexadas" dice exactamente por
que las rechaza, y es trabajo que vale la pena.

### Hallazgo aparte, no introducido por este cambio

`npm audit` reporta **31 vulnerabilidades** (22 altas, 1 critica) en el arbol de
dependencias. Se verifico que **ninguna proviene de los dos paquetes nuevos**:
vienen de `next`, `tailwindcss` y el instrumental de `eslint`. Queda anotado
como trabajo propio, no se toco en esta feature para no mezclar.

## 2026-11-17, correo corporativo montado

Se desbloqueo la mitad de la feature 9. El dominio ya tiene correo.

- Plan **Free Business Email** de Hostinger sobre `surinnovacion.cl`, sin costo:
  el cupo gratuito ya estaba en la cuenta del owner.
- Buzon `contacto@surinnovacion.cl`, activo.
- Reenvio al Gmail personal, **activo** tras la confirmacion del owner, con
  copia guardada en el buzon. El plan gratuito da una sola regla y esta usada.
- Hostinger publico los registros DNS por su cuenta, porque la zona del dominio
  ya se administra ahi (nameservers `dns-parking.com`).

Verificado contra DNS publico, no contra el panel: MX `mx1`/`mx2.hostinger.com`,
SPF `include:_spf.mail.hostinger.com`, DKIM con clave real en el selector `a` y
DMARC `p=none`. El registro A del apex sigue en `76.76.21.21` (Vercel) y el
sitio responde 200 en apex y en www: agregar el correo no toco el hosting.

Dos cosas que conviene no olvidar:

- El webmail mostro un aviso de "faltan registros de dominio" que era una foto
  vieja: el chequeo corrio antes de que propagaran los registros, con TTL 300.
  El propio verificador de Hostinger, en Ajustes de dominio, los daba por
  correctos. Se descarto por DNS publico antes de tocar nada.
- **Nunca aceptar que Hostinger "repare" o "restablezca" la zona DNS completa.**
  Eso devuelve el registro A a sus servidores y tumba el sitio, que vive en
  Vercel.

El plan original era Zoho Mail. Se cambio porque el DNS ya estaba en Hostinger
(cero registros a mano), el costo es el mismo y el plan incluye IMAP, que el
gratuito de Zoho no da. Queda anotado en `docs/contacto-setup.md` y marcado como
superado en `docs/estrategia-conversion-seo.md`.

Prueba de punta a punta del owner: envio desde `contacto@marcoiglesias.cl` a
`contacto@surinnovacion.cl` y llego al Gmail. Queda una salvedad: el origen es
otro dominio de Hostinger, asi que el mensaje pudo enrutarse internamente sin
pasar por el MX publico. Conviene repetirlo alguna vez desde un remitente
externo, que es como llegaran los leads reales.

### Formulario conectado el 2026-11-17

El sitio ya avisa cuando alguien escribe. Verificado contra produccion:

```
POST https://surinnovacion.cl/api/contacto
{"ok":true,"channels":["correo"]}
```

Resend registra el envio como **Delivered** a `contacto@surinnovacion.cl`, con
asunto `Asesoria IA: Prueba tecnica`. De ahi el reenviador lo lleva al Gmail.

Como quedo montado:

- Cuenta de Resend **propia de SurInnovacion**, separada de la del salon. Se
  descarto compartirla: el plan gratuito da tres dominios y la del salon ya
  tenia dos, ademas de compartir el tope de 100 envios diarios y la reputacion.
  Los equipos dentro de una misma cuenta son funcion de pago.
- Dominio de envio `send.surinnovacion.cl`, **Verified**, region Sao Paulo.
- Tres registros publicados en Hostinger: el TXT DKIM y dos CNAME. Resend **no
  pidio SPF**: lo resuelve por el CNAME `send.send`, asi que el SPF del apex no
  se toco. El riesgo que anticipaba este documento no existia.
- API key con permiso **Sending access** y limitada a ese dominio, asi que no
  puede leer envios ni administrar nada.
- Variables en Vercel: `RESEND_API_KEY`, `LEAD_NOTIFY_TO` y `LEAD_NOTIFY_FROM`
  con remitente `web@send.surinnovacion.cl`.

Comprobado ademas que el apex no se movio: MX en `mx1`/`mx2.hostinger.com`,
SPF de Hostinger intacto y el registro A en `76.76.21.21`.

### Lo que sigue faltando

Queda el **almacen durable**. La feature 9 pide que el lead se guarde antes de
intentar la notificacion, para que exista aunque el correo falle; hoy
`channels` devuelve solo `["correo"]`. Mientras no este Supabase, si Resend
falla el endpoint responde 502 y el visitante ve WhatsApp como salida, asi que
el lead no se pierde en silencio, pero tampoco queda registrado.

Por eso la feature 9 pasa de `blocked` a `in_progress`: ya no la bloquea nadie,
falta trabajo.

## 2026-11-17, SEO como proyecto continuo

El SEO pasa a llevarse en una linea propia, separada de las mejoras funcionales
y visuales del sitio.

- [Informe de estado del SEO](informe-seo-2026-11-17.md): estado medido de las
  ocho URLs publicadas, hallazgos y prioridades.
- [Recomendacion sobre el title de la portada](../docs/recomendacion-title-portada.md):
  **espera decision del owner.** La portada no menciona "inteligencia
  artificial" ni "innovacion empresarial" ni una vez en sus 273 palabras
  visibles, y su title promete una frase que el cuerpo no dice.
- Feature 23 corrigio el blog: `Blog` y `BreadcrumbList` en el indice,
  `BreadcrumbList` e `isPartOf` en los articulos, titles de 82/68/80 a 56/52/56
  sin tocar los H1, y `og:image` mas `twitter` propios en las cuatro rutas.
- Hallazgo que queda abierto fuera del blog: `/servicios`, `/asesoria-ia` y
  `/marco-iglesias` siguen anunciando en X el titulo de la portada, porque
  ninguna sobrescribe `twitter`. La correccion de fondo es un helper compartido
  que arme `openGraph` y `twitter` desde el title y la description de cada
  pagina.
- `scripts/auditar.py` de la skill tenia un defecto: reportaba como vacios los
  encabezados que envuelven un enlace. Corregido, porque es el instrumento con
  el que se mide.
- El embudo dejo de estar roto: el 2026-11-17 se monto el correo y se conecto
  el formulario, verificado en produccion. El trafico que el SEO consiga ya
  llega a alguna parte.
- Feature 11, avance parcial: Servicios, Asesoría y portada del Blog comparten un fondo WebP de 99 804 bytes, generado a partir del concepto visual del hero. En Servicios y Asesoría el detalle se abre con controles nativos.
- Verificación del avance: `RUN_BUILD=1 ./init.sh` pasó fuera del sandbox por la escritura de caché de Next.js. Chrome a 375×812 y 1440×900 confirmó el fondo, ausencia de desborde horizontal y apertura/cierre con Espacio y clic.
- Última feature verificada: 10, blog editorial con tres análisis y fuentes primarias.

## 2026-11-15, blog de IA e innovación

- `/blog` y tres artículos prerenderizados con títulos propios, fuentes visibles, fechas, canonical y `BlogPosting`. Navegación, sitemap y `llms.txt` enlazan al blog.
- `RUN_BUILD=1 ./init.sh` pasó (lint, typecheck y build). Se verificaron los tres enlaces en portada editorial y sitemap, un H1 por artículo y la correspondencia entre citas JSON-LD y enlaces visibles.
- Para nuevas notas, agregar un registro al inicio de `content/blog.ts`. Describir el hecho, su contexto y su relevancia para empresas. Citar la fuente primaria dentro de la sección correspondiente y separar datos observados de perspectivas.
- Última feature verificada: 22, posicionamiento de innovación empresarial. Pendiente de publicación.

## 2026-11-15, SEO y GEO

- [Auditoría y plan de medición](auditoria-seo-geo-2026-11-15.md).
- `RUN_BUILD=1 ./init.sh` pasó lint, typecheck y build. El chequeo inicial sin permisos de escritura falló al actualizar la caché de TypeScript.
- Verificados en HTML estático los H1 únicos, canonicals, JSON-LD y sitemap.
- Chrome a 375 y 1440 px: portada y Servicios sin desborde horizontal; botones de WhatsApp visibles y alcanzables.
- Ajuste posterior solicitado por el owner: hero reducido a titular y bajada sobre sistemas a medida para administración o producción. Se retiraron los dos CTA del hero. `RUN_BUILD=1 ./init.sh` pasó y Chrome confirmó texto dentro de pantalla a 375×812 y 1440×900.
- Ultimas trabajadas: 19 (`done`), 18 (`done`), 9 (`blocked`)
- Inicio: 2026-11-12
- Agente: Claude Code

## Plan

- La feature 11, pulido responsive y performance, es la unica que sigue
  `pending`. Ahora cuenta con datos reales de carga via Speed Insights, en vez
  de mediciones de laboratorio.
- Decision abierta del owner: el title de la portada,
  `docs/recomendacion-title-portada.md`.
- Ya hay analitica y Search Console. Los datos tardan dos o tres dias en
  aparecer y la indexacion una o dos semanas, asi que la primera lectura util
  es hacia el 21 de noviembre.
- Pendiente del owner, no bloqueante: el filtro de Gmail y el "Enviar como",
  para que las respuestas no salgan desde su direccion personal.

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

- La feature 9 quedo cerrada el 2026-11-18. El embudo funciona de punta a
  punta: el formulario guarda el lead y avisa por correo.
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

## 2026-11-12, tercera tanda: proyectos, contexto de negocio y AVIF movil

### Contexto de negocio que faltaba registrar

El owner aclaro que SurInnovacion vende **asesorias, sitios web y plataformas,
CRM** y trabajos relacionados. El sitio publicado comunica solo la linea de
asesoria en IA. Queda anotado en `docs/conventions.md` como decision pendiente:
ampliar el mensaje a las demas lineas o mantener el foco actual.

### Vitrina de proyectos

- Se retiraron EventDash POS y Eventos IA a pedido del owner.
- "Distribuidora Oriente" paso a llamarse "Ecommerce Ferreteria", conservando su
  enlace, y su descripcion ahora dice de que rubro es.
- Quedan cuatro proyectos: Columba Boutique, Ecommerce Ferreteria, Marco
  Iglesias y Marca Visible.

### Secuencia movil en AVIF

Pregunta del owner: si los fotogramas pesan mucho y si deberian ser WebP.

**Ya eran WebP.** El problema real era otro: el perfil movil usaba los mismos
1280x720 que escritorio y, sobre todo, esos WebP venian de los JPG ya
comprimidos de la primera version, no del video 4K original. Medido contra la
fuente, el error medio del WebP actual es de 9,27 sobre 255.

Se genero un perfil AVIF desde el 4K (`assets/source/hero-puerto-montt.mov`,
3840x2160) a 1280x720, calidad 42:

| | WebP actual | AVIF nuevo |
|---|---|---|
| Peso por cuadro | 50 KB | 31 KB |
| Error contra el original | 9,27 | 2,54 |
| 72 cuadros | 3,4 MB | 2,3 MB |

Es decir, **36% mas liviano y a la vez 3,6 veces mas fiel**. Se descarto
regenerar el WebP desde el 4K porque mejora la calidad pero sube el peso a
4,1 MB, y el objetivo era bajarlo.

El perfil WebP se conserva intacto como respaldo. El cargador detecta soporte
AVIF con una imagen de 1x1 y elige el directorio; Safari admite AVIF desde
iOS 16, y quien no lo soporte recibe exactamente lo que recibe hoy. El fondo de
la seccion de contacto sigue en WebP a proposito, para que el render del
servidor sea determinista.

Solo se agrego el perfil movil. Escritorio no se toco porque el problema
planteado era de datos moviles.

### Verificacion

- Recorrido movil sintetico de 60 pasos en 375x812: **1,79 MB transferidos**,
  57 cuadros AVIF y 1 WebP (el fondo de contacto, esperado).
- Fluidez: p95 de 13,9 ms y maximo de 14 ms por cuadro, bajo el presupuesto de
  16,7 ms de 60 fps.
- Lienzo de 750x1624 dibujando imagen real (brillo medio 124, rango 3-252).
- Los cuadros nuevos se verificaron contra los antiguos: mismo instante del
  video, sin desfase.
- Vitrina renderizando los cuatro proyectos correctos.
- `RUN_BUILD=1 ./init.sh`: lint, typecheck y build pasaron.

`public/hero` paso de 9,7 MB a 12 MB en el repositorio, a cambio de 1,2 MB menos
de descarga por visita movil.

## 2026-11-12, cuarta tanda: las cinco lineas de negocio

El owner pidio ampliar el mensaje del sitio a todo lo que vende, y agrego una
linea que no estaba en la lista inicial: **integrar agentes de IA en las
plataformas**.

### Decisiones tomadas

El owner no respondio dos de las tres preguntas, asi que se resolvieron asi y
quedan abiertas a correccion:

- **Cinco lineas**, con los agentes integrados como linea propia y primera, no
  escondida dentro de "plataformas". Es donde se cruzan la IA y el desarrollo,
  que es la combinacion que lo diferencia.
- **La asesoria gratuita cubre todas las lineas.** Una sola puerta de entrada;
  obligar al visitante a autoclasificarse antes de escribir pierde contactos.
- **Una pagina `/servicios`**, no cinco paginas por linea. Cinco paginas flacas
  se vuelven en contra, y eso lo confirmo la revision de evidencia.
- **El H1 de la portada se mantiene en IA.** Es la keyword mas fuerte y el
  diferenciador; ampliarlo para abarcar todo diluiria lo unico que ya funciona.

### Cambios

- Nueva ruta estatica `/servicios` con 804 palabras: agentes integrados,
  asesoria en IA, sitios web y ecommerce, plataformas a medida y CRM, mas como
  empieza un proyecto y seis preguntas frecuentes.
- Las preguntas de precio y plazo se responden sin inventar numeros: se explica
  por que no se publican y que la asesoria sirve para dimensionar.
- Marcado `ItemList` con un `Service` por linea, mas `FAQPage` y el nodo de
  organizacion.
- La bajada del hero pasa a "IA, sitios web, plataformas y CRM. Asesoria
  gratuita de 30 minutos."
- La navegacion suma "Servicios"; el sitemap declara tres URLs.

### Verificacion

- Auditoria de `/servicios`: **0 hallazgos**. Title 60, description 150, un H1 y
  ocho H2, 12 enlaces internos.
- Hero en 375 px: el H1 conserva sus 2 lineas y 68 px. La bajada bajo de 3
  lineas a 2, asi que el bloque termina en 462 px contra 481 px antes y 501 px
  en el estado original. **El hero quedo mas compacto, no mas alto.**
- Menu en 1280 px: los seis enlaces en una sola linea, sin desborde y con 164 px
  de holgura respecto del logo.
- `/servicios` en 375 px: sin desborde horizontal, CTAs a ancho completo.
- `RUN_BUILD=1 ./init.sh` y `git diff --check`: pasaron.

### Pendiente

La linea de plataformas y la de CRM no tienen ningun trabajo publico que
mostrar, ahora que EventDash y Eventos IA salieron de la vitrina. El texto no
inventa casos, pero esas dos lineas se sostienen solo en la descripcion del
servicio. Conviene sumar algun ejemplo verificable cuando exista.

## 2026-11-12, correccion: capas invisibles capturaban los clics

El owner reporto que al pinchar "Asesoria gratuita" en el hero terminaba en
marcoiglesias.cl.

### Causa

El scrollytelling superpone capas y solo las separa por opacidad. Una capa con
`opacity: 0` sigue recibiendo clics, y el panel de proyectos ademas declaraba
`pointer-events: auto` en CSS.

Medido en produccion, en 375x812:

- Boton "Asesoria gratuita": de y=417 a y=463.
- Panel de proyectos invisible: empieza en y=438, mismo ancho.
- Se superponen 25 de los 46 px de alto del boton.

Es decir, la mitad inferior del boton entregaba el toque al panel invisible, y
dentro de ese panel estan los enlaces de proyectos. Segun la altura exacta del
telefono, el toque caia sobre "Marco Iglesias", que apunta a marcoiglesias.cl.

### Correccion

Se agrego `capaVisible(opacity)`, que apaga `pointer-events` cuando la opacidad
baja de 0,05, y se aplico a las cuatro capas con opacidad animada: intro,
ciudad, futuro y panel de proyectos. Solo recibe clics lo que se ve.

### Verificacion

- Arriba del todo: ningun punto de los dos botones del hero cae en otro enlace.
  Los puntos que no dan en el enlace reciben su propio contenedor, que son los
  huecos normales de un enlace en linea.
- Panel de proyectos invisible: `pointer-events: none`.
- Con el panel visible (progreso 0,86): `pointer-events: auto` y sus enlaces
  reciben su clic.
- Se reviso una sospecha de segundo fallo y se descarto: el cuarto proyecto
  queda bajo el borde de la pantalla, pero el panel desplaza internamente
  (479 px de contenido en 339 px) y el enlace es alcanzable y clicable.
- `RUN_BUILD=1 ./init.sh` y `git diff --check`: pasaron.

Nota pendiente: con `prefers-reduced-motion`, el hero y el panel de proyectos
quedan ambos con opacidad 1 y se superponen igual. Ahi el panel si es visible,
asi que no es una trampa invisible, pero tapa parte de los botones. No se toco
porque implica cambiar el layout del hero.

## 2026-11-12, correccion de la vitrina

Al preparar la pagina de autoridad se audito `marcoiglesias.cl`: es el sitio de
un salon de belleza, no el portafolio de IA que decia su descripcion
("Servicios, experiencia y divulgacion en IA"). Era falsa y estaba en
produccion.

Decision del owner: **es solo un proyecto de sitio web** y se queda en la
vitrina con ese caracter. El CRM del salon **no entra al sitio**, porque esta en
funcionamiento con datos sensibles de clientas.

Cambios:

- La vitrina mantiene cuatro proyectos, todos con enlace. "Marco Iglesias" pasa
  a describirse como lo que es: "Sitio de un salon de belleza: servicios,
  precios y reservas."
- No se menciona ningun CRM real ni en la vitrina ni en `/servicios`.
- Se retiro el enlace al salon desde `/asesoria-ia`, donde figuraba como "mi
  sitio personal". Ese parrafo ahora remite solo a los proyectos.

### Pendiente

**La pagina `/marco-iglesias` no se escribio.** Los unicos datos verificables
disponibles son "Master en Inteligencia Artificial", "divulgador" y "fundador".
Una pagina de autoridad sobre eso seria relleno. Hacen falta datos concretos del
owner: donde y cuando curso el Master, donde hace divulgacion, desde cuando
trabaja en tecnologia y cualquier charla o publicacion con fecha.

## 2026-11-12, pagina de autoridad

El owner entrego su formacion: **Master en Inteligencia Artificial, cursado en
BIG School (Barcelona) con titulacion de la Universidad Isabel I (Espana),
terminado.** Confirmo que es un unico master con doble titulacion, no dos
formaciones separadas.

Al verificar las instituciones aparecio un matiz: BIG School tiene acuerdo con
la Universidad Isabel I desde 2024, y estos programas son titulos propios, no
masteres oficiales del registro espanol. Por eso la pagina nombra el master y
ambas instituciones **sin usar la palabra "oficial"**, que seria una afirmacion
distinta y no verificada.

### Cambios

- Nueva ruta estatica `/marco-iglesias`: formacion, que hace, trabajo que se
  puede abrir, como trabaja y desde donde. 384 palabras, deliberadamente breve:
  se escribio solo lo verificable en vez de rellenar.
- `content/schema.ts`: el `Person` suma `alumniOf` con las dos instituciones,
  `jobTitle`, `knowsAbout` y su `url`. Mejora en las cuatro paginas, porque el
  nodo es compartido.
- Enlazada desde `/servicios` (seccion "Quien hace el trabajo") y desde
  `/asesoria-ia`. El sitemap declara cuatro URLs.
- El title de la pagina omite el sufijo de marca con `absolute`: con el llegaba
  a 65 caracteres y Google lo cortaba.

### Verificacion

- Auditoria: 1 hallazgo, de nivel bajo, por no tener `FAQPage`. Se dejo asi a
  proposito: no se inventaron preguntas para rellenar.
- En 375 px: sin desborde horizontal, H1 en dos lineas.
- `RUN_BUILD=1 ./init.sh` y `git diff --check`: pasaron.

### Pendiente

- No se publico nada sobre divulgacion porque no hay dato verificable de donde
  la hace. Si hay charlas, canal o publicaciones con fecha, es lo mas citable
  que se puede sumar.
- Queda a decision del owner si quiere aclarar en la pagina que el master es
  titulo propio y no oficial. Declararlo genera confianza, pero es su llamado.
