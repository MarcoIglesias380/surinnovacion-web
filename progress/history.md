# Bitacora historica

Append-only. Cada cierre de sesion debe agregar una entrada nueva al final.

---

## 2026-08-11 - Feature 12: Deploy produccion y dominio

- Agente lider: Codex
- Resultado: APPROVED
- Cambios:
  - Se configuro identidad Git local:
    `Marco Iglesias <MarcoIglesias380@users.noreply.github.com>`.
  - Se conecto remoto GitHub:
    `https://github.com/MarcoIglesias380/surinnovacion-web.git`.
  - Se creo commit inicial `963fe74` y se subio `main` a GitHub.
  - Se creo proyecto Vercel `surinnovacion-web` en el equipo
    `Marco Iglesias' projects`.
  - Vercel conecto el repo GitHub al proyecto.
  - Se desplego produccion y quedo alias:
    `https://surinnovacion-web.vercel.app`.
  - Se agregaron dominios:
    `surinnovacion.cl` y `www.surinnovacion.cl`.
  - En Hostinger se reemplazaron registros `connect.hostinger.com` por:
    `A @ 76.76.21.21` y `A www 76.76.21.21`.
  - Se mantuvo `A vps 187.77.255.244`.
  - `.vercel` quedo ignorado en `.gitignore`.
- Verificacion:
  - `npm run typecheck`: paso.
  - `npm run lint`: paso.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Deploy Vercel: `Ready`.
  - `dig +short surinnovacion.cl A`: `76.76.21.21`.
  - `dig +short www.surinnovacion.cl A`: `76.76.21.21`.
  - `curl -I http://surinnovacion.cl`: `HTTP/1.1 200 OK`.
  - `curl -I http://www.surinnovacion.cl`: `HTTP/1.1 200 OK`.
  - `curl -I https://surinnovacion.cl`: `HTTP/2 200`.
  - `curl -I https://www.surinnovacion.cl`: `HTTP/2 200`.

---

## 2026-08-11 - Feature 13: Limpieza visual y blog actual

- Agente lider: Codex
- Inspector UI: subagente Descartes
- Contenido blog: subagente Fermat
- Revisor: subagente Dirac
- Resultado: APPROVED
- Cambios:
  - Header limpio: se elimino `ThemeToggle`, el texto `Oscurecer/Aclarar` y el
    CTA `Diagnostico Gratuito` de desktop y mobile.
  - Se elimino `components/layout/theme-toggle.tsx` porque quedo huerfano.
  - `#confianza` paso de cards con etiquetas/chips/loop tecnologico a una lista
    simple de proyectos con descripcion breve y enlace real.
  - Se eliminaron `techTags`, `category`, `status`, `areas`, `tag-marquee` y CSS
    muerto asociado.
  - `#impacto-visual` quedo como bloque editorial limpio con titulo y subtitulo.
    Se eliminaron `Momento visual`, `zoom-card`, `zoom-core`, `code-rain`,
    `visual-cursor-zone`, `Orbit` y keyframes asociados.
  - El blog ahora muestra tres cards con noticias actuales y enlaces externos
    reales:
    - OpenAI: `https://openai.com/index/how-the-world-is-putting-chatgpt-to-work/`
    - Anthropic: `https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals`
    - Vercel: `https://vercel.com/blog/ai-gateway-production-index-july-2026`
  - `content/site-map.ts` fue actualizado para reflejar la nueva estructura
    limpia y evitar referencias a etiquetas tecnologicas/parallax.
- Verificacion:
  - `./init.sh`: paso antes de implementar.
  - `npm run typecheck`: paso.
  - `npx eslint components/layout/site-header.tsx components/sections/premium-sections.tsx components/sections/business-sections.tsx content/site-map.ts`:
    paso.
  - `npm run lint`: paso.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Revisor independiente ejecuto `npm run typecheck`: paso.
  - Revisor independiente ejecuto `npx eslint components/layout/site-header.tsx components/sections/premium-sections.tsx components/sections/business-sections.tsx content/site-map.ts`:
    paso.
  - Revision visual lider desktop 1440x900 y mobile 390x844: header, confianza,
    impacto visual y blog sin overflow horizontal ni textos eliminados.

---

## 2026-08-11 - Feature 8: Fundador con imagen bahia y texto minimo

- Agente lider: Codex
- Implementador: subagente Socrates
- Revisor: subagente Archimedes
- Resultado: APPROVED
- Cambios:
  - Se integro la imagen aprobada
    `/Users/mattiana/Desktop/surinnovacion-fundador-fondo-bahia-v3.png` en
    `public/sections/fundador-bahia-marco-v3.png`.
  - `#marco` ahora usa la imagen como fondo full-section con `next/image fill`.
  - Se elimino la tarjeta/foto pequena anterior, la biografia larga, el eyebrow
    `El fundador`, el cuadro/placa de texto y el CTA de esta seccion.
  - Quedaron solo las letras solicitadas: `Marco Iglesias` y el subtitulo
    `Master en Inteligencia Artificial, Divulgador de la IA y fundador de SurInnovacion.`
  - Los estilos de fundador quedaron reducidos a encuadre, overlay de seccion y
    sombra de texto para legibilidad, sin fondo, borde, padding ni box-shadow en
    el bloque de texto.
- Verificacion:
  - `npm run typecheck`: paso.
  - `npx eslint components/sections/business-sections.tsx`: paso.
  - `npm run lint`: paso.
  - Revisor independiente ejecuto `npm run typecheck`: paso.
  - Revisor independiente ejecuto `npx eslint components/sections/business-sections.tsx`:
    paso.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Revision visual lider en `http://localhost:3000/#marco`: desktop 1440x900 y
    mobile 390x844 sin cuadro, sin CTA y sin solapamientos criticos.

---

## 2026-08-11 - Feature 7: CTAs cristal y MarcoIglesias en proyectos

- Agente lider: Codex
- Implementador UI: subagente Gibbs
- Especialista imagen: subagente Nash
- Revisor: subagente Godel
- Resultado: APPROVED
- Cambios:
  - `.liquid-button` en `app/globals.css` paso a ser el CTA cristal global:
    transparente, con borde visible, blur, brillo y variantes.
  - Se agregaron `liquid-button--compact` y `glass-secondary-button`.
  - El CTA del header, hero, fundador, contacto y vitrina usan lenguaje visual
    cristal consistente.
  - El boton `Preparar solicitud` se mantiene como `type="button"` y no promete
    envio real.
  - Se agrego `https://marcoiglesias.cl/` a la vitrina de proyectos como
    `Marco Iglesias`, sin metricas ni claims inventados.
  - Todos los enlaces externos de vitrina mantienen `target="_blank"` y
    `rel="noreferrer"`.
  - Se genero imagen preview v1 para fundador en:
    `/Users/mattiana/Desktop/surinnovacion-fundador-fondo-futurista-v1.png`.
  - Se genero imagen preview v2 preferida por owner, bahia de Puerto Montt de
    dia con oficina moderna, ventanal completo y figura de espalda en:
    `/Users/mattiana/Desktop/surinnovacion-fundador-fondo-bahia-v2.png`.
  - Ninguna imagen fue integrada aun al proyecto; quedan para revision previa.
- Verificacion:
  - `./init.sh`: paso con lint y typecheck.
  - `npm run typecheck`: paso.
  - `npx eslint components/sections/premium-sections.tsx components/sections/business-sections.tsx components/sections/hero-section.tsx components/layout/site-header.tsx`:
    paso.
  - `npm run lint`: paso.
  - Revisor ejecuto `npm run typecheck`: paso.
  - Revisor ejecuto `npx eslint components/sections/premium-sections.tsx components/sections/business-sections.tsx components/sections/hero-section.tsx components/layout/site-header.tsx`:
    paso.
  - Revisor verifico existencia de la imagen v2 en Escritorio.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Revision visual lider desktop 1440x900 y mobile 390x844: sin overflow
    horizontal, CTAs visibles y vitrina con `marcoiglesias.cl`.

---

## 2026-08-11 - Feature 6: ShaderBackground full-width en contacto

- Agente lider: Codex
- Implementador: subagente Boyle
- Revisor final: subagente Halley
- Resultado: APPROVED
- Cambios:
  - Se creo `components/ui/shader-background.tsx`, componente client-side WebGL
    reutilizable, compatible con TypeScript/Tailwind y ruta tipo shadcn.
  - No se ejecuto `shadcn init` ni se agregaron dependencias nuevas, porque el
    componente no requiere Radix ni paquetes externos.
  - El shader acepta `className`, respeta `prefers-reduced-motion`, maneja
    fallback visual si WebGL/shaders fallan, limpia `resize` y cancela
    `requestAnimationFrame`.
  - A solicitud del owner, `#contacto` ahora usa el shader como fondo de ancho
    completo de toda la seccion.
  - Se elimino el lado izquierdo de contacto: `CTA final`, titulo/copy,
    telefono, direccion, texto de contacto directo y mapa/ver ubicacion.
  - El formulario `Solicitar diagnostico gratuito` queda centrado, transparente
    y visible sobre el efecto.
  - El hero quedo limpio con `ReactiveDotGrid`; no usa `ShaderBackground`.
  - Se agrego `contact-form-panel--transparent` en `app/globals.css`.
- Verificacion:
  - `./init.sh`: paso antes del cambio.
  - `npm run typecheck`: paso.
  - `npx eslint components/ui/shader-background.tsx components/sections/business-sections.tsx components/sections/hero-section.tsx`:
    paso.
  - `npm run lint`: paso.
  - Revisor ejecuto `npm run typecheck`: paso.
  - Revisor ejecuto `npx eslint components/ui/shader-background.tsx components/sections/business-sections.tsx components/sections/hero-section.tsx`:
    paso.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Revision visual lider en `http://localhost:3000/#contacto`: desktop 1440x900
    y mobile 390x844 sin overflow horizontal, formulario legible, efecto de
    fondo full-width y bloque izquierdo removido.

---

## 2026-08-11 - Feature 5: Enlaces reales en vitrina de proyectos

- Agente lider: Codex
- Implementador: subagente Bohr
- Revisor: subagente Anscombe
- Resultado: APPROVED
- Cambios:
  - Se actualizo `showcaseProjects` en
    `components/sections/premium-sections.tsx`.
  - La vitrina ahora muestra estos proyectos revisables:
    - Eventos IA:
      `https://eventos-ia-surinnovacion.vercel.app/admin`
    - Columba Boutique:
      `https://www.columbaboutique.com/`
    - Marca Visible:
      `https://marca-visible.vercel.app/`
    - Catalogo Distribuidora Oriente:
      `https://catalogo-distribuidora-oriente.vercel.app/`
  - Los enlaces externos abren en pestana nueva con `target="_blank"` y
    `rel="noreferrer"`.
  - Se reemplazaron estados pendientes por estado `Revisable` y CTAs sobrios.
  - No se agregaron metricas, resultados, testimonios ni claims inventados.
- Verificacion:
  - `./init.sh`: paso con lint y typecheck antes y despues del cambio.
  - `npm run typecheck`: paso.
  - `npx eslint components/sections/premium-sections.tsx`: paso.
  - `npm run lint`: paso.
  - Revisor ejecuto `npm run typecheck`: paso.
  - Revisor ejecuto `npx eslint components/sections/premium-sections.tsx`:
    paso.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Revision visual lider en `http://localhost:3000/#confianza`: desktop y
    mobile sin overflow horizontal, con 4 cards alineadas.

---

## 2026-08-11 - Feature 4: Vitrina de proyectos en confianza tecnologica

- Agente lider: Codex
- Implementador: subagente Cicero
- Revisor: subagente Confucius
- Resultado: APPROVED
- Cambios:
  - Se redisenio `#confianza` en
    `components/sections/premium-sections.tsx` como vitrina de proyectos.
  - Se agregaron 4 proyectos iniciales:
    - SurInnovacion Web
    - Boutique Columba
    - Bingo / Eventos IA
    - Landings especializadas
  - Se mantuvo el copy honesto: no se inventaron metricas, testimonios,
    resultados ni URLs publicas.
  - Solo `SurInnovacion Web` incluye CTA real hacia `#hero`.
  - Los proyectos sin URL publica muestran estado transparente y texto
    `URL publica pendiente`, sin botones falsos.
  - Se conservo el carrusel de tecnologias integrado al final de la seccion.
- Verificacion:
  - `./init.sh`: paso con lint y typecheck.
  - `npm run typecheck`: paso.
  - `npx eslint components/sections/premium-sections.tsx`: paso.
  - Revisor ejecuto `npm run typecheck`: paso.
  - Revisor ejecuto `npx eslint components/sections/premium-sections.tsx`:
    paso.
  - `npm run build`: fallo dentro del sandbox por restriccion conocida de
    Turbopack al crear proceso/bind interno.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - Revision visual lider en `http://localhost:3000/#confianza`: desktop y
    mobile sin overflow horizontal ni solapamientos criticos.

---

## 2026-08-07 - Feature 3: Estrategia comercial con imagen full-section

- Agente lider: Codex
- Implementador: subagente Ramanujan
- Revisor: subagente Dalton
- Resultado: APPROVED
- Cambios:
  - Se copio la imagen de referencia a
    `public/sections/innovation-hub-strategy.png`.
  - Se rediseño `#problema-solucion` en
    `components/sections/premium-sections.tsx`.
  - La seccion ahora usa `next/image` con `fill`, `object-cover` y la imagen
    cubriendo toda la seccion.
  - Se eliminaron los cuadros "El problema" y "La solucion".
  - Se mantuvo el copy solicitado:
    - "La innovacion ya no es opcional"
    - "Mientras muchas empresas siguen operando con procesos manuales,
      respuestas lentas y sistemas desconectados, la inteligencia artificial
      ya esta cambiando la forma de vender, atender, automatizar y crecer."
  - Se ubico el texto en un panel cristalino, evitando tapar el rostro en
    desktop y ajustando mobile para que rostro y texto completo queden visibles.
- Verificacion:
  - `npm run typecheck`: paso.
  - `npx eslint components/sections/premium-sections.tsx`: paso.
  - Revisor ejecuto `npm run lint`: paso.
  - `npm run build`: paso.
  - Revision visual lider desktop/mobile en `http://localhost:3001`: aprobada.

---

## 2026-08-11 - Feature 14: Pulir detalle de plataformas y proyectos

- Agente lider: Codex
- Revisor UX/copy: subagente Popper
- Resultado: APPROVED
- Cambios:
  - `#confianza` cambio a una vitrina mas premium y escaneable.
  - El titulo ahora es "Plataformas y sitios que puedes revisar".
  - La bajada explica que son ejemplos publicos de sitios, landings y
    plataformas desarrolladas o impulsadas por SurInnovacion.
  - Se unificaron los CTAs como "Abrir proyecto".
  - Cada proyecto muestra URL visible, numero de orden, descripcion mas clara y
    boton cristal con icono externo.
  - Se mantuvieron solo enlaces reales entregados por el owner.
  - `content/site-map.ts` quedo alineado con el nuevo copy de la seccion.
- Verificacion:
  - `./init.sh`: paso al inicio con lint y typecheck.
  - `npm run lint`: paso.
  - `npm run typecheck`: paso.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - `git diff --check`: paso.
  - Servidor local existente en `http://localhost:3000`: `HTTP/1.1 200 OK`.
  - HTML local contiene el nuevo titulo, los 5 proyectos y CTAs "Abrir
    proyecto" con `target="_blank"` y `rel="noreferrer"`.
- Nota:
  - La automatizacion visual con Playwright no estuvo disponible en el runtime
    local por error de empaquetado del modulo, asi que se complemento con
    build, revision HTML y apertura local en el panel de Codex.

---

## 2026-08-11 - Feature 15: Mejorar lectura de fuentes y contacto real

- Agente lider: Codex
- Revisor UX/accesibilidad: subagente Goodall
- Resultado: APPROVED
- Cambios:
  - `BlogSection` ahora abre un panel interno al presionar `Leer fuente`.
  - El panel muestra fuente, fecha, categoria, visual editorial con isotipo,
    resumen propio y bloque "Por que importa para tu empresa".
  - El panel incluye nota honesta: es resumen editorial basado en fuente externa
    y el articulo completo pertenece a la fuente original.
  - Se agrego cierre con boton visible, click fuera, tecla `Escape`, scroll
    interno y retorno de foco al boton que abrio el panel.
  - `ContactSection` elimino el boton muerto `Preparar solicitud`.
  - El formulario ahora tiene un unico CTA real: `Enviar solicitud por
    WhatsApp`.
  - El envio valida nombre y mensaje breve, y abre WhatsApp con texto
    prellenado usando los campos del formulario.
  - El titulo del formulario cambio a `Solicitar asesoria gratis`, alineado con
    el CTA del hero.
- Verificacion:
  - `./init.sh`: paso al inicio con lint y typecheck.
  - `npm run lint`: paso.
  - `npm run typecheck`: paso.
  - `npm run build` con permiso aprobado fuera del sandbox: paso.
  - `git diff --check`: paso.
  - HTML local en `http://localhost:3000/` contiene `Leer fuente`, `Solicitar
    asesoria gratis` y `Enviar solicitud por WhatsApp`, y ya no contiene
    `Preparar solicitud`.
- Nota:
  - No se copiaron articulos completos; el panel usa resumen editorial y enlace
    externo a la fuente original.

---

## 2026-08-06 - Feature 2: Redisenar hero con grilla reactiva de puntos

- Agente lider: Codex
- Implementador: subagente Peirce
- Revisor: subagente Russell
- Resultado: APPROVED
- Cambios:
  - Se elimino del hero el chip superior, subtitulos secundarios, cards de
    senales y el isotipo 3D protagonista.
  - Se agrego `components/sections/reactive-dot-grid.tsx`, Canvas 2D sin
    dependencias nuevas, con 5 capas de puntos, profundidad visual y reaccion
    al cursor.
  - Se actualizo el copy del hero:
    - H1: "El futuro lo construimos juntos, con Inteligencia Artificial"
    - Subtitulo: "Creamos soluciones para tus proyectos, asesoramos a tu equipo
      y educamos para que la IA se transforme en una herramienta practica."
    - CTA: "Solicita una asesoria gratis"
  - Se mantuvo el CTA hacia `#contacto` y no se tocaron otras secciones.
- Verificacion:
  - `npm run typecheck` paso.
  - `npx eslint components/sections/hero-section.tsx components/sections/reactive-dot-grid.tsx`
    paso al menos una vez con exit code 0, aunque ESLint mostro latencia
    irregular en otras corridas.
  - `npm run build` paso con servidor dev detenido temporalmente.
  - Revision visual desktop y mobile en `http://localhost:3001`: CTA visible,
    sin solapamientos, particulas mas blancas y con mayor profundidad.
- Nota:
  - Si `next dev` esta corriendo, conviene detenerlo antes de `npm run build`
    para evitar que ambos compitan sobre `.next`.

---

## 2026-08-06 - Feature 1: Limpieza y estabilizacion inicial

- Agente: Codex
- Resultado: APPROVED
- Cambios:
  - Se instalo el arnes personalizado de SurInnovacion: `AGENTS.md`,
    `CHECKPOINTS.md`, `feature_list.json`, `init.sh`, `progress/`, docs y
    roles en `.agents/agents/`.
  - Se fijaron versiones exactas en `package.json` y `package-lock.json`.
  - Se configuro `turbopack.root` en `next.config.ts`; el build ya no muestra
    la advertencia de raiz de workspace por multiples lockfiles.
  - Se eliminaron `.DS_Store` y `tsconfig.tsbuildinfo` de la raiz.
  - Se movio el cache incremental de TypeScript a
    `.next/cache/tsconfig.tsbuildinfo`.
- Verificacion:
  - `./init.sh` paso con lint y typecheck.
  - `RUN_BUILD=1 ./init.sh` paso con permiso aprobado fuera del sandbox:
    lint, typecheck y build en verde.
- Nota:
  - El build falla dentro del sandbox por restriccion de Turbopack al crear
    proceso/bind interno, pero pasa en ejecucion permitida del sistema.

---
# 2026-09-23 - Feature 16: Landing scrollytelling de Puerto Montt futuro

## Ajuste de fluidez

- Se reemplazo la secuencia de 120 cuadros (10 fps) por los 360 cuadros originales del video (30 fps).
- La escena sticky se corrigio al quitar `overflow-hidden` del contenedor principal; el video permanece visible durante todo el scroll.
- Los 360 cuadros se precargan para evitar esperas al avanzar o retroceder.
- Verificacion: `npm run lint`, `npm run typecheck` y `npm run build` pasaron. Produccion verificada en `https://surinnovacion.cl`: la secuencia avanzo hasta el cuadro 117 y permanecio fija en pantalla.
- Deployment de mejora: `https://surinnovacion-j6xufp2zp-marco-iglesias-projects.vercel.app` (Ready).

## Ajuste de jerarquia y cierre

- Se agrandaron isotipo y wordmark en header y footer; la navegacion superior se redujo para que quede en segundo plano.
- El ultimo fotograma ahora forma una escena fija de Blog Tech: aparece el titular editorial grande y luego los paneles avanzan sobre el mismo Puerto Montt futuro.
- El footer incorpora telefono, Valle Volcanes, Puerto Montt, Chile y el credito `Creado por Marco Iglesias & SurInnovacion`.
- Verificacion: `npm run lint`, `npm run typecheck` y `npm run build` pasaron.
- Deployment: `https://surinnovacion-j7d0u7umz-marco-iglesias-projects.vercel.app` (Ready).

## Cierre fijo y legibilidad movil

- El ultimo fotograma de Puerto Montt con el tren se mantiene como la escena fija del cierre mientras se explora su contenido.
- `Ideas para avanzar con inteligencia` y los titulos de Puerto Montt/Tecnologia se redujeron para recuperar jerarquia; el bloque de innovacion ahora se muestra directo, sin desplegable.
- Proyectos, Blog Tech y Contacto pasan a ser tres accesos cuadrados que abren cuadros frontales accesibles, con cierre por boton, fondo o tecla Escape. Los proyectos conservan nombre, descripcion breve y enlaces reales.
- Header y footer duplicaron el tamaño visual de logo/isotipo; el footer conserva ubicacion, telefono y credito de Marco Iglesias & SurInnovacion.
- Revision visual en 1280 px y 390 px: sin cruces entre titular, accesos y formulario. Se verificaron los paneles de proyectos y contacto en movil.
- Verificacion: `./init.sh`, `npm run lint`, `npm run typecheck`, `git diff --check` y `npm run build` pasaron.
- Produccion: `https://surinnovacion.cl` y deployment `https://surinnovacion-kwbukzwyb-marco-iglesias-projects.vercel.app` (Ready).

## Navegacion por estaciones narrativas

- La autoridad `Marco Iglesias · Master y divulgador de Inteligencia Artificial` gana presencia visual y el titular `El futuro se construye desde el sur` se redujo para equilibrar el hero.
- El enlace Proyectos del header navega al momento `Puerto Montt, hacia adelante`, con su cuadro de apertura a la izquierda.
- Blog Tech lleva directamente a `Ideas para avanzar con inteligencia` y a su cuadro lateral; Contacto tiene ahora una escena propia posterior, claramente separada y con su cuadro frontal.
- Revision visual: se verificaron en desktop y movil los destinos de Proyectos, Blog Tech y Contacto. En produccion, Proyectos se estabiliza sin el texto de transicion superpuesto.
- Verificacion: `npm run lint`, `npm run typecheck`, `git diff --check` y `npm run build` pasaron.
- Produccion: `https://surinnovacion.cl` y deployment `https://surinnovacion-1o2vwcqrs-marco-iglesias-projects.vercel.app` (Ready).

## Paneles holograficos y contenido visible

- El panel de Proyectos se retraso hasta que desaparece `Tecnologia que conecta...`, evitando el choque durante el scrollytelling. Sus enlaces quedan visibles en un holograma de cristal con halo cian/violeta junto a `Puerto Montt, hacia adelante`.
- Blog Tech queda desplegado en un panel holografico lateral, con enlaces directos a las fuentes visibles sin un boton intermedio.
- Contacto tiene su formulario desplegado a la derecha del mensaje principal, dentro del mismo lenguaje visual de cristal; en movil los paneles se ordenan verticalmente y conservan espacio de lectura.
- Revision visual local desktop/movil y publicacion: Proyectos, Blog Tech y Contacto se verificaron sin superposiciones relevantes; la llegada directa a Contacto no deja restos del panel de Blog Tech.
- Verificacion: `npm run lint`, `npm run typecheck`, `git diff --check` y `npm run build` pasaron.
- Produccion: `https://surinnovacion.cl` y deployment `https://surinnovacion-b4yk1405a-marco-iglesias-projects.vercel.app` (Ready).

## Pulido movil de navegacion y Blog Tech

- El menu movil ahora usa el mismo cristal holografico de los paneles, con fondo opaco, halo cian/violeta y filas separadas para evitar que los enlaces se mezclen con el hero.
- La estacion Blog Tech salta al inicio exacto de su escena en movil. Su holograma se ajusta al ancho disponible y limita su altura al viewport con scroll interno si hiciera falta.
- Se verificaron en 390 × 844 px los destinos de Blog Tech, Proyectos y Contacto; los paneles quedan dentro del ancho de pantalla.
- Verificacion: `npm run lint`, `npm run typecheck`, `git diff --check` y `npm run build` pasaron.
- Produccion: `https://surinnovacion.cl` y deployment `https://surinnovacion-frih1ipwm-marco-iglesias-projects.vercel.app` (Ready).

- Resultado: APPROVED y publicado en produccion.
- Cambios:
  - Se guardo el video fuente `hero-puerto-montt.mov` en `assets/source/`, excluido de Git y de los assets publicos.
  - Se generaron 120 fotogramas JPEG optimizados a 1280 px en `public/hero/frames/` (9,9 MB en total).
  - La landing ahora recorre por scroll la historia de Marco Iglesias junto a la IA, Puerto Montt conectado y Puerto Montt futuro.
  - Proyectos, la explicacion de innovacion, Blog Tech y contacto se convirtieron en desplegables accesibles; los proyectos ya no usan imagenes y revelan cada enlace real al abrirse.
  - Header y footer se redujeron a la marca, navegacion esencial y WhatsApp.
  - El ultimo fotograma de Puerto Montt futuro sostiene el cierre de los desplegables antes del footer.
- Verificacion:
  - `./init.sh`, `npm run lint` y `npm run typecheck`: pasaron.
  - `npm run build`: paso fuera del sandbox por requisito interno de Turbopack.
  - Revision visual local: hero, secuencia, proyectos, Blog Tech, contacto y footer revisados; no se envio ningun mensaje de WhatsApp.
  - Produccion: `https://surinnovacion.cl` verificada cargando con el nuevo hero y los controles esperados.
  - Deployment Vercel: `https://surinnovacion-6777t5za3-marco-iglesias-projects.vercel.app` (Ready).

---

# 2026-10-14 - Feature 17: Optimizar carga, fluidez y rotacion del scrollytelling

- Resultado: APPROVED localmente; pendiente de despliegue.
- Diagnostico:
  - Produccion precargaba 360 JPG al montar la pagina y transfirio 29,18 MiB en la prueba completa.
  - Una rotacion 390x844 a 844x390 a mitad de la escena cambiaba el progreso de 50% a 100% y saltaba del fotograma 180 al 360.
- Cambios:
  - Se agregaron perfiles WebP versionados: 120 cuadros y 6,2 MB para escritorio; 72 cuadros y 3,4 MB para movil.
  - La secuencia activa usa canvas, mantiene el ultimo cuadro disponible y carga solo una ventana proxima con cuatro solicitudes concurrentes.
  - El cache descarta cuadros fuera de la ventana para limitar memoria y evita precargar la secuencia completa.
  - La distancia narrativa movil quedo estable en 5200 px y la rotacion conserva el progreso normalizado.
  - Los assets `sequence-v2` usan `Cache-Control: public, max-age=31536000, immutable`.
  - Se agrego un estado breve `Preparando experiencia` y se corrigio el ancho del copy en 390 px.
- Evidencia:
  - Carga inicial movil: 9 respuestas de cuadros.
  - Recorrido movil completo: 72 URLs unicas y 3,29 MiB transferidos.
  - Rotacion al 50%: cuadro 36 antes y despues; progreso 0,5 antes y despues.
  - Scroll sintetico: 271 muestras, p95 16,7 ms, ningun intervalo mayor a 32 ms.
  - Consola: sin errores.
  - Revision visual: 390 px sin overflow horizontal (`scrollWidth` y `clientWidth` iguales a 390).
  - `RUN_BUILD=1 ./init.sh`, `npm run lint`, `npm run typecheck`, `npm run build` y `git diff --check`: pasaron.
- Nota:
  - La implementacion anterior y sus 360 JPG se conservaron como respaldo local no activo para evitar eliminar trabajo no confirmado; la pagina importa exclusivamente `scrollytelling-landing-v2.tsx`.
