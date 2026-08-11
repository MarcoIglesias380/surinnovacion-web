# Arquitectura - SurInnovacion Web

Este documento define como esta armado el sitio y que significa hacer un buen
trabajo tecnico dentro de este repo.

## Stack

- Next.js con App Router.
- React y TypeScript en modo estricto.
- Tailwind CSS para sistema visual y responsive.
- Lucide React para iconografia.
- Framer Motion esta instalado, pero no debe usarse si CSS cubre la necesidad.
- Contenido narrativo centralizado en `content/site-map.ts` cuando aplique.

## Estructura actual

```txt
app/
  layout.tsx       # Metadata y shell HTML
  page.tsx         # Composicion de la landing
  globals.css      # Sistema visual, animaciones y estilos globales
components/
  layout/          # Header, footer, toggles y controles persistentes
  sections/        # Hero y secciones comerciales
content/
  site-map.ts      # Navegacion y secciones base
lib/
  utils.ts         # Utilidades compartidas
public/brand/      # Assets de marca
docs/              # Documentacion operativa del arnes
progress/          # Memoria de trabajo
```

## Rutas y anchors

La version actual es una landing de una pagina:

- `#hero`
- `#confianza`
- `#problema-solucion`
- `#impacto-visual`
- `#marco`
- `#blog`
- `#contacto`

Rutas futuras posibles, solo si hay contenido real:

- `/proyectos`
- `/proyectos/[slug]`
- `/blog`
- `/blog/[slug]`
- `/contacto`

## Decisiones ya tomadas

- La experiencia debe sentirse premium, tecnologica y confiable, no como una
  plantilla generica.
- No se inventan clientes, resultados, alianzas ni testimonios.
- La seccion de contacto prioriza WhatsApp mientras no exista backend real.
- El mapa se carga bajo demanda con `ContactMapToggle`.
- La galeria parallax pesada fue descartada; cualquier imagen nueva debe ser
  liviana y aportar contenido real.

## Riesgos conocidos

- El ZIP original incluyo `node_modules`, `.next`, `.git` y archivos de macOS.
- Las dependencias ya quedaron fijadas segun el lockfile actual; mantenerlas
  asi para que futuras instalaciones sean reproducibles.
- `npm run build` puede requerir permisos fuera del sandbox por Turbopack.
- El formulario y el blog son parcialmente visuales; no deben presentarse como
  funcionalidad final sin resolverlo.
