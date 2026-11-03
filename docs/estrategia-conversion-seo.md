# Estrategia de conversion, captacion de leads y SEO

Fecha: 2026-11-02
Autor: Claude Code, a pedido de Marco Iglesias
Estado: plan aprobado en sus decisiones de fondo (seccion 8). Nada
implementado todavia.

Documento de diseno para tres frentes: convertir visitas en asesorias,
no perder ningun lead y posicionar la web en Google. Restriccion fija del
owner: el hero no se toca visualmente, solo sus textos.

---

## 1. Intencion y por que

Marco Iglesias es Master en Inteligencia Artificial y divulgador. Quiere que
quien entre a surinnovacion.cl entienda que puede recibir una asesoria
gratuita para implementar IA, sea persona, empresa grande, mediana o chica.
Hoy la web impresiona visualmente pero no ofrece nada, no captura nada y no
compite por ninguna busqueda.

El contexto de mercado favorece la jugada. Segun un estudio de Entel citado
por El Pais Chile en septiembre de 2025, cerca de 7 de cada 10 pymes chilenas
ya usan IA en su trabajo diario. Un estudio de SAP de abril de 2025 indica que
los principales obstaculos son la falta de talento especializado y la poca
claridad sobre como implementarla. Las areas donde mas se aplica son servicio
al cliente, recursos humanos y marketing.

La lectura es directa: el problema del cliente no es falta de interes, es no
saber por donde empezar. Eso no se resuelve ofreciendo "implementamos IA". Se
resuelve ofreciendo criterio. Y "divulgador" es exactamente la identidad de
alguien que explica. La asesoria gratuita no es un descuento, es la demostracion
del producto.

---

## 2. Evaluacion del sitio actual

Medido sobre el HTML de produccion y el codigo del repo el 2026-11-02.

### 2.1 Conversion: la oferta no existe

- Cero menciones de "asesoria", "gratis", "gratuito" o "diagnostico" en el
  texto visible. La oferta que el owner quiere comunicar no esta en ninguna
  parte del sitio.
- Los dos CTA del hero son "Ver proyectos" (navegacion interna, no convierte)
  y "Conversemos" (WhatsApp sin contexto). Ninguno da una razon para actuar.
- La autoridad de Marco aparece una sola vez, como una linea suelta:
  "Marco Iglesias - Master y divulgador de Inteligencia Artificial". No hay
  biografia, ni formacion, ni explicacion de que significa eso para el visitante.
- No se explica en ningun lugar que hace SurInnovacion por una empresa: no hay
  servicios, ni proceso, ni que pasa despues de escribir.
- El unico camino de contacto obliga a salir del sitio a WhatsApp. Quien no usa
  WhatsApp, o esta en un computador sin sesion abierta, no tiene como contactar.
- La escalera de compromiso esta invertida: el sitio pide una conversacion
  (compromiso alto) antes de dar algo de valor (compromiso bajo).

### 2.2 Captacion de leads: el problema mas urgente

El formulario de `components/sections/scrollytelling-landing-v2.tsx` no envia
nada a ninguna parte. Su `submit` arma un texto y llama a
`window.open("https://wa.me/...?text=...")`.

Consecuencias verificadas en el codigo:

- No se envia ningun correo. No hay base de datos, ni webhook, ni registro.
- Cada lead depende de que el visitante complete una segunda accion en otra
  aplicacion. Si abandona WhatsApp, o el navegador bloquea la ventana
  emergente, el lead se pierde sin dejar rastro. Marco nunca sabe que esa
  persona existio.
- El campo "Correo" se recoge pero solo llega si el visitante termina el envio
  por WhatsApp. En la practica es decorativo.
- No hay estado de carga, ni de exito, ni de error mas alla de dos validaciones
  de campo vacio. La feature 9 pide explicitamente estados de envio, error y
  exito: no se cumplen.
- `window.open` despues de una pausa asincrona es un blanco clasico del
  bloqueador de ventanas emergentes en Safari iOS.

El lado del correo, verificado por DNS:

- `surinnovacion.cl` **no tiene registros MX**. No existe ningun buzon en el
  dominio. `contacto@surinnovacion.cl` hoy no puede recibir nada.
- **No tiene SPF ni DMARC**. El dominio no esta preparado para enviar correo
  legitimo y es suplantable por terceros.
- Los nameservers son `dns-parking.com`, de Hostinger. El DNS se administra
  ahi, consistente con lo que registra `progress/history.md`.

Conclusion: no hay correo corporativo y el formulario nunca envia correo. Las
dos mitades del problema estan confirmadas.

### 2.3 SEO

Encabezados reales en el HTML de produccion:

| Nivel | Texto actual | Keyword |
|---|---|---|
| H1 | El futuro se construye desde el sur. | ninguna |
| H2 | Tecnologia que conecta personas, negocios y territorio. | ninguna |
| H2 | Puerto Montt, hacia adelante. | solo geografica |
| H2 | Ideas para avanzar con inteligencia. | ninguna |
| H3 | La innovacion ya no es opcional. | ninguna |
| H2 | Una idea puede empezar hoy. | ninguna |

El H1 no contiene ninguna palabra que alguien busque. Es una linea bonita y,
para Google, vacia.

El sitio completo tiene **170 palabras de texto visible**. La frase
"inteligencia artificial" aparece en el cuerpo visible una sola vez, dentro de
la linea de credenciales de Marco. Google casi no tiene con que posicionar.

Lo que ya esta bien y conviene no romper:

- Metadata completa y correcta: title, description, OpenGraph, Twitter,
  canonical, keywords, robots con `max-image-preview: large`.
- JSON-LD solido: `ProfessionalService`, `WebSite`, `WebPage` y `Person`, con
  referencias cruzadas `founder` y `worksFor`, direccion, `areaServed` y
  telefono. Esta mejor que la mayoria de los sitios de su tamano.
- `robots.ts` y `sitemap.ts` existen y son correctos.
- `lang="es"`, prerender estatico y cache inmutable en la secuencia.

El problema no es tecnico. Es que no hay contenido y el H1 no habla de nada
que se busque.

Problemas adicionales:

- `app/sitemap.ts` tiene `lastModified` fijo en `2026-08-16`, ya desactualizado,
  y declara una sola URL. Un sitio de una pagina tiene una sola oportunidad de
  rankear para todo.
- Encabezados falsos: "Proyectos", "Blog Tech", "Contacto" y "Contacto directo"
  son parrafos, no encabezados. La estructura de secciones es invisible para
  buscadores y lectores de pantalla.
- Todo el valor de enlaces sale hacia afuera (OpenAI, Anthropic, Vercel) y no
  hay ninguna pagina interna que pueda rankear.
- No hay analitica de ningun tipo. No existe forma de saber si algo de esto
  funciona, ni que CTA produce leads.
- No pude confirmar que el sitio este indexado en Google. Una busqueda
  `site:surinnovacion.cl` no devolvio ninguna pagina del dominio.
- `content/site-map.ts` mantiene `siteSections`, datos muertos que describen la
  estructura anterior al rediseno. Solo se usa `navItems`. Curiosamente ya
  contenia un H1 mejor que el actual, "El futuro de tu empresa se construye con
  Inteligencia Artificial", y mencionaba "diagnostico gratuito": la idea existia
  y nunca llego a publicarse.
- Codigo muerto: unas 940 lineas en `business-sections.tsx`,
  `premium-sections.tsx`, `hero-section.tsx`, `reactive-dot-grid.tsx`,
  `contact-map-toggle.tsx`, `section-shell.tsx` y `shader-background.tsx`.
  Ningun archivo de `app/` las importa.

### 2.4 La restriccion del hero

El H1 vive dentro del hero. Se puede reescribir su texto sin tocar el visual:
el CSS dimensiona por clase, no por contenido. La unica precaucion es el largo,
porque un H1 mas extenso envuelve distinto en 390 px. El actual tiene 36
caracteres; conviene no pasar de unos 65 y verificar en movil.

---

## 3. Objetivos, no objetivos y anti objetivos

### Objetivos

1. Que el visitante entienda en los primeros cinco segundos que puede recibir
   una asesoria gratuita en IA y quien se la va a dar.
2. Que ningun lead se pierda: todo envio queda guardado y notificado, sin
   depender de que el visitante complete una accion en otra aplicacion.
3. Que exista un correo corporativo en el dominio, con notificacion al telefono.
4. Que la web compita por busquedas comerciales y geograficas reales, con H1 y
   H2 que contengan esas keywords.

### No objetivos

- Rediseno visual. El hero y la secuencia de scrollytelling se mantienen.
- Un blog con articulos propios escritos ahora. Puede venir despues.
- CRM, automatizaciones de marketing o campanas pagadas en esta etapa.
- Competir por la keyword generica "inteligencia artificial", imposible de
  ganar a nivel nacional o global.

### Anti objetivos

Senales de que salio mal aunque funcione tecnicamente:

- Que el sitio pierda la identidad premium por llenarlo de texto comercial.
- Que se prometa una asesoria que Marco no pueda sostener en tiempo real. Una
  oferta gratuita sin limite claro se convierte en una deuda.
- Que se inventen clientes, cifras, casos de exito o certificaciones. Lo
  prohibe `docs/conventions.md` y destruye la confianza que el sitio quiere
  construir.
- Que se rellene de keywords y el texto se lea como escrito para un robot.

---

## 4. Frente 1: captacion de leads que no puede perder un lead

Primero porque cada dia sin esto pierde leads, y porque traer trafico de Google
sin capturarlo es trabajo perdido.

### Arquitectura

- `app/api/contacto/route.ts`, un Route Handler POST de Next.js. No requiere
  runtime nuevo y funciona en Vercel. Verificado: el proyecto no usa
  `output: export`, asi que las rutas dinamicas son viables.
- **Guardar primero, notificar despues.** El lead se escribe en un almacen
  durable y solo entonces se envia el correo. Si el correo falla, el lead
  sigue existiendo.
- Almacen: Supabase, con una tabla `leads` y RLS. Marco ya tiene cuenta
  (el conector esta configurado, aunque requiere autorizacion via `/mcp`).
  Alternativa sin cuentas nuevas: correo a dos destinatarios distintos. Se
  recomienda el almacen porque el objetivo declarado es no perder leads y el
  correo puede fallar en silencio.
- Notificacion: Resend. Su plan gratuito permite unos 3.000 correos al mes con
  tope de 100 diarios, de sobra para avisos de formulario. Requiere verificar
  el dominio con SPF y DKIM, que de todos modos hacen falta.
- WhatsApp se mantiene como segundo camino en paralelo, no como el unico. El
  formulario envia al servidor y recien en el exito ofrece seguir por WhatsApp.
- Estados reales: cargando, exito con que pasa despues y en que plazo, y error
  con el correo visible y el enlace de WhatsApp como salida.
- Anti spam: campo trampa oculto, control de tiempo minimo hasta el envio y
  limite por IP. Sin CAPTCHA, que perjudica la conversion.
- Ley 21.719 de proteccion de datos personales: una fuente indica que entra en
  vigencia el 1 de diciembre de 2026, y conviene confirmarlo en fuentes
  oficiales. Como se van a almacenar datos personales, corresponde agregar una
  linea de consentimiento y declarar la finalidad. Es tambien una razon para no
  guardar mas datos que los necesarios.

### Criterios de aceptacion

- Un envio del formulario queda registrado aunque el correo de notificacion
  falle.
- Marco recibe la notificacion en un buzon del dominio y le llega al telefono.
- El formulario muestra estados de carga, exito y error.
- El visitante que no usa WhatsApp puede contactar sin salir del sitio.
- Existe una pagina o estado de agradecimiento utilizable como evento de
  conversion.

---

## 5. Frente 2: correo corporativo

Donde tenerlo activo. Tres opciones honestas:

| Opcion | Costo aproximado | Cuando conviene |
|---|---|---|
| **Zoho Mail gratis (elegida)** | $0 hasta 5 cuentas, 5 GB cada una | Recomendada para empezar. Dominio propio, webmail y apps moviles. Limite: el plan gratuito no admite IMAP/POP, es decir no sirve con Outlook o Apple Mail de escritorio |
| Hostinger Mail o Titan | aproximadamente 1 a 2 USD por buzon al mes | Comodo porque el DNS ya esta en Hostinger: un proveedor menos que administrar |
| Google Workspace | aproximadamente 6 a 7 USD por usuario al mes | Solo si quiere Gmail, Drive y Meet sobre el dominio, con 30 GB |

Los precios provienen de blogs comparativos, no de las paginas oficiales, asi
que hay que confirmarlos antes de contratar.

Decidido: Zoho Mail gratis, con `contacto@surinnovacion.cl` y un alias
`marco@surinnovacion.cl`, redirigido al Gmail personal de Marco para que la
notificacion llegue al telefono de inmediato. Migrar a Workspace mas adelante
si quiere la suite.

### Trabajo de DNS en Hostinger, con cualquier opcion

- Registros MX del proveedor elegido.
- SPF que cubra al proveedor del buzon y tambien a Resend.
- DKIM del proveedor del buzon y de Resend.
- DMARC, primero en `p=none` para observar y despues endurecer.

### Efecto sobre las convenciones del proyecto

`docs/conventions.md` declara hoy que "el contacto oficial actual es WhatsApp:
+56 9 9289 1678". Al existir un buzon en el dominio, esa regla queda
desactualizada y hay que actualizarla en la misma feature, para que el correo
corporativo quede documentado como canal oficial junto a WhatsApp.

### Cadena completa para no perder un lead

Formulario, luego almacen durable mas Resend, luego
`contacto@surinnovacion.cl`, luego reenvio al Gmail personal, luego aviso al
telefono. La tabla del almacen queda como respaldo de registro.

---

## 6. Frente 3: contenido y posicionamiento

### 6.1 Keywords elegidas

Criterio: no competir por la generica, ganar la cola larga donde la intencion
y la geografia son especificas y donde Marco tiene un diferenciador real.

**Comerciales principales**

- asesoria en inteligencia artificial para empresas
- implementar IA en mi empresa
- consultoria IA pymes Chile

**Geograficas, baja competencia y alta intencion**

- inteligencia artificial Puerto Montt
- automatizacion de procesos Puerto Montt
- consultoria tecnologica Los Lagos / sur de Chile

**De autoridad y marca**

- Marco Iglesias inteligencia artificial
- divulgador de IA Chile

**De problema, lo que la gente realmente escribe**

- como aplicar IA en una pyme
- por donde empezar con inteligencia artificial
- automatizar atencion al cliente con IA

### 6.2 H1 propuesto

Actual: "El futuro se construye desde el sur.", 36 caracteres, sin keywords.

| # | Propuesta | Largo | Nota |
|---|---|---|---|
| 1 | Implementa inteligencia artificial en tu empresa, desde el sur de Chile. | 72 | Mas keywords, pero largo y puede envolver mal en movil |
| 2 | **Inteligencia artificial aplicada a tu empresa, desde el sur.** | 60 | **Recomendada.** Conserva "desde el sur", parte con la keyword y declara el beneficio |
| 3 | Asesoria en inteligencia artificial para empresas de todo tamano. | 65 | La mas comercial, pierde la identidad del sur |

Se recomienda la 2 para el H1 y llevar "asesoria" al H2 y a la seccion de
oferta, de modo que la pagina cubra ambas sin amontonar keywords.

El parrafo superior del hero se mantiene: "Marco Iglesias - Master y divulgador
de Inteligencia Artificial" ya carga autoridad y keyword.

El parrafo de bajada del hero debe nombrar la oferta. Hoy dice "Creamos
soluciones de IA, automatizacion y productos digitales para convertir ideas en
proyectos reales.", 105 caracteres que no ofrecen nada.

Propuesta, ya con la oferta definida en 30 minutos de llamada:

> Asesoria gratuita de 30 minutos para ver donde la IA conviene en tu empresa,
> y donde no.

Son 92 caracteres, mas corto que el actual, asi que no hay riesgo de que
desarme el layout en movil. Dice el plazo, es verificable y no promete
entregables que no existen. El "y donde no" es deliberado: posiciona a Marco
como alguien que da criterio, no como alguien que vende IA a todo evento, y es
la diferencia que el estudio de SAP senala como el verdadero dolor del cliente.

### 6.3 Plan de H2

| Seccion | Ahora | Propuesto |
|---|---|---|
| Ciudad | Tecnologia que conecta personas, negocios y territorio. | Automatizacion e IA para empresas de Puerto Montt y el sur de Chile. |
| Futuro | Puerto Montt, hacia adelante. | Se mantiene como remate narrativo |
| Proyectos | parrafo "Proyectos" | H2: Proyectos de IA, automatizacion y desarrollo web |
| Asesoria (nueva) | no existe | H2: Asesoria gratuita de 30 minutos para implementar IA en tu empresa |
| Quien (nueva) | no existe | H2: Quien te va a asesorar: Marco Iglesias, Master en IA |
| Blog | Ideas para avanzar con inteligencia. | Divulgacion de IA: que esta cambiando y que te conviene hacer |
| Contacto | Una idea puede empezar hoy. | Agenda tu asesoria gratuita de 30 minutos en IA |

### 6.4 El contenido que falta

170 palabras no rankean. Hacen falta del orden de 700 a 1200 palabras de texto
genuinamente util. Donde ponerlas sin tocar el hero:

- Secciones nuevas despues del scrollytelling. La zona de cierre ya sale de la
  escena fija, asi que admite contenido sin alterar la experiencia.
- `/asesoria-ia`: la oferta, que incluye, que no incluye, como funciona, para
  quien segun tamano de empresa y que pasa despues. Es la pagina que puede
  rankear para la keyword comercial y servir de destino si mas adelante hay
  campanas pagadas.
- `/marco-iglesias`: pagina de autoridad. Formacion, el Master, divulgacion,
  charlas y proyectos. Google pondera la autoridad del autor en consultas de
  consejo profesional.
- Una seccion de preguntas frecuentes con preguntas reales y marcado
  `FAQPage`. Rinde bien en cola larga y en motores de respuesta con IA.

Decidido: se crean las dos paginas internas. La experiencia de una pagina se
mantiene como puerta de entrada visual y de marca. Las paginas nuevas la
apoyan, suman URLs al sitemap y resuelven la feature 10 de forma honesta:
paginas internas reales en lugar de solo enlaces que salen del sitio.

El copy de todas ellas se ajusta a la oferta definida: una llamada de 30
minutos. Ninguna pagina debe prometer informes, auditorias ni documentos.

### 6.5 Medicion

Sin esto nada de lo anterior es verificable:

- Analitica. Vercel Analytics se integra con una linea y sin banner de cookies;
  tambien sirven Plausible o GA4.
- Una ruta de agradecimiento como evento de conversion.
- Google Search Console, verificar el sitemap y enviar las URLs nuevas. Es
  tambien la forma de confirmar la indexacion, que hoy no pude verificar.

---

## 7. Secuencia propuesta

Respetando una feature a la vez, segun `AGENTS.md`.

1. Feature 9, reescrita: correo corporativo y formulario que guarda y notifica.
   Bloquea a todo lo demas.
2. Feature nueva: H1, H2 y textos con keywords. Sin cambio visual.
3. Feature nueva: pagina `/asesoria-ia`, seccion de oferta y marcado FAQ.
4. Feature nueva: pagina `/marco-iglesias` de autoridad.
5. Feature nueva: analitica, Search Console y sitemap con las URLs nuevas.
6. Feature 11: pulido responsive y performance sobre el contenido nuevo.

Higiene recomendada en paralelo: eliminar las 940 lineas de componentes
muertos y los datos muertos de `siteSections`.

---

## 8. Decisiones del owner

Tomadas por Marco Iglesias el 2026-11-02:

1. **Proveedor de correo: Zoho Mail gratis.** Hasta 5 cuentas, 5 GB cada una,
   sin costo. Se acepta la limitacion de no usar Outlook ni Apple Mail de
   escritorio. Si mas adelante hace falta IMAP, Mail Lite cuesta del orden de
   1 USD por usuario al mes.
2. **La asesoria es una llamada de 30 minutos.** Diagnostico conversado por
   videollamada, sin entregable escrito. Esto fija el copy de todo el sitio:
   se promete una conversacion de 30 minutos, nada mas. No se menciona informe,
   ni auditoria, ni documento. Sin cupos limitados por ahora, pero si la demanda
   supera la agenda, la salida es agregar cupos antes que recortar la promesa.
3. **Se agregan paginas internas:** `/asesoria-ia` y `/marco-iglesias`, ademas
   de las secciones nuevas al final de la pagina principal.

## 9. Decisiones tomadas en este documento

Las resolvi yo para no bloquear el plan. Quedan abiertas a correccion:

- Guardar el lead antes de notificar, y no confiar solo en el correo.
- Route Handler de Next.js en vez de un servicio externo de formularios, para
  no depender de terceros en el camino critico.
- Sin CAPTCHA, por conversion y porque el agente no puede resolverlos.
- H1 recomendado el de 60 caracteres, por equilibrio entre keyword e identidad.
- "Puerto Montt, hacia adelante." se queda como remate narrativo, sin keyword.

## 10. Fuentes

Datos de mercado y de proveedores consultados el 2026-11-02. Son blogs y notas
de prensa, no paginas oficiales: los precios y limites deben confirmarse antes
de contratar.

- Adopcion de IA en pymes chilenas: Forbes Chile, SAP News Latinoamerica,
  Entel Empresas.
- Correo corporativo: Mailtrap, Titan Email, Zoho pricing, comparativas de
  hosting de correo 2026.
- Resend: resenas y agregadores 2026. Confirmar en resend.com/pricing.
- Ley 21.719: mencionada en el blog de un proveedor. Confirmar en fuente
  oficial.
