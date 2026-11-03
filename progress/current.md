# Sesion actual

- Feature en curso: ninguna
- Ultimas trabajadas: 9 (`blocked`) y 18 (`done`)
- Inicio: 2026-11-02
- Agente: Claude Code

## Plan

- Cerrar la feature 9 cuando el owner complete `docs/contacto-setup.md`.
- Abrir despues la feature de pagina `/asesoria-ia` y seccion de oferta, que es
  la que resuelve el problema de contenido delgado.

## Bitacora

- 2026-11-03: feature 18 cerrada. H1, H2 y metadata con keywords.
- 2026-11-02: feature 9 implementada y desplegada, queda `blocked` en el setup
  del owner. Endpoint `POST /api/contacto` en produccion.
- 2026-11-02: evaluacion de conversion, leads y SEO en
  `docs/estrategia-conversion-seo.md`.
- 2026-11-02: limpieza de codigo muerto, commit `840592d` y despliegue de las
  features 16 y 17. Ver `progress/history.md`.

## Feature 18: que se implemento

Diagnostico: el H1 publicado era "El futuro se construye desde el sur.", sin
ninguna keyword de busqueda. La oferta de asesoria no aparecia en ninguna parte
del sitio y varias secciones usaban parrafos como si fueran encabezados.

Cambios, solo de texto y de nivel de encabezado:

| Elemento | Antes | Ahora |
|---|---|---|
| H1 | El futuro se construye desde el sur. | Inteligencia artificial para tu empresa. |
| Bajada hero | Creamos soluciones de IA, automatizacion y productos digitales... | Asesoria gratuita de 30 minutos para ver donde la IA te conviene, y donde no. |
| CTA hero | Conversemos | Asesoria gratuita |
| H2 ciudad | Tecnologia que conecta personas, negocios y territorio. | Automatizacion e IA para empresas del sur de Chile. |
| H2 blog | Ideas para avanzar con inteligencia. | Divulgacion de IA para decidir mejor. |
| H2 contacto | Una idea puede empezar hoy. | Agenda tu asesoria gratuita de 30 minutos. |
| Panel proyectos | parrafo "Proyectos" | H2 "Proyectos de IA y automatizacion" |
| Panel blog | parrafo "Blog Tech" | H3 "Blog Tech" |
| Panel contacto | parrafo "Contacto directo" | H3 "Cuentame de tu empresa" |

Tambien:

- `title` y `description` apuntan a la keyword comercial y nombran la oferta,
  replicados en OpenGraph, Twitter y el `WebPage` del JSON-LD.
- Lista de `keywords` reemplazada por la del documento de estrategia.
- `sitemap.ts` con `lastModified` al dia; estaba fijo en agosto.
- El texto prellenado del CTA de WhatsApp coincide con la oferta de 30 minutos.

Jerarquia final: un H1, cinco H2 y tres H3, sin saltos de nivel.

## Verificacion

- `RUN_BUILD=1 ./init.sh`: lint, typecheck y build pasaron.
- `git diff --check`: paso.
- Revision visual en escritorio y en 375 px con el sitio corriendo.
- Medicion del texto visible renderizado, antes contra ahora:
  - palabras: 170 a 193
  - "asesoria": 0 a 5
  - "gratuita": 0 a 4
  - "empresa": 2 a 7
  - "inteligencia artificial": 2 a 3
  - "sur de Chile": 0 a 1
- Encabezados de los paneles: heredan el estilo del eyebrow sin cambios
  (11,52 px, mayusculas, peso 700, mismo margen). El cambio es semantico.

### Huella del hero en 375 px

El owner pidio conservar las dos lineas del H1, asi que se eligio la version
corta. Medido contra produccion:

| | Antes | Ahora |
|---|---|---|
| H1 | 2 lineas, 68 px, de 240 a 308 | 2 lineas, 68 px, de 240 a 308 |
| Bajada | 4 lineas, 77 px | 3 lineas, 58 px |
| Fin del bloque | 501 px | 481 px |

El H1 ocupa exactamente la misma huella que el original y el bloque completo
queda 20 px mas corto, porque la bajada nueva es mas breve. Sin desborde
horizontal. No se toco ninguna regla CSS del hero.

Una version mas larga, "Inteligencia artificial aplicada a tu empresa, desde
el sur.", se probo y se descarto: ocupaba 3 lineas y estiraba el bloque 14 px.

Comprobado tambien que el corte del icono en los CTA del hero ya existia en
produccion antes de este cambio: no lo introdujo esta feature.

## Riesgos pendientes

- El contenido sigue siendo delgado: 197 palabras no alcanzan para rankear. Lo
  resuelve la feature de `/asesoria-ia`, no esta.
- La feature 9 no se puede cerrar hasta que exista el buzon y las variables
  esten en Vercel.
- El limite por IP del formulario sigue sin implementarse.
- Sin analitica no hay forma de medir si el cambio de copy mejora la conversion.
- Las features 10 y 11 siguen `pending` con alcance parcialmente cubierto.

## Proximo paso

Abrir la feature de pagina `/asesoria-ia` con la seccion de oferta y el marcado
FAQ, que es lo que mas sube el techo de posicionamiento.
