# Bitacora historica

Append-only. Cada cierre de sesion debe agregar una entrada nueva al final.

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
