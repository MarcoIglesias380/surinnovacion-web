# AGENTS.md - SurInnovacion Web

Este archivo es el punto de entrada para cualquier agente que trabaje en este
repo. Es el mapa operativo del proyecto: lee solo lo necesario, trabaja una
feature a la vez y demuestra con comandos reales antes de avanzar.

## 0. Que es este proyecto

Landing premium para SurInnovacion, marca de IA, automatizacion y tecnologia
aplicada desde Puerto Montt, Chile.

- Negocio: SurInnovacion
- Producto actual: landing de una pagina con secciones comerciales
- Owner: Marco Iglesias
- Stack: Next.js App Router, TypeScript, Tailwind CSS, React
- Deploy objetivo: web estatica/Next.js, idealmente Vercel o hosting compatible

## 1. Antes de empezar

1. Lee `progress/current.md`.
2. Lee `feature_list.json` y trabaja solo una feature `pending` o
   `in_progress`.
3. Lee los docs necesarios:
   - `docs/architecture.md` antes de tocar estructura o componentes.
   - `docs/conventions.md` antes de escribir contenido, UI o reglas.
   - `docs/verification.md` antes de cerrar una feature.
4. Ejecuta `./init.sh` para conocer el estado base. Si falla, corrige o marca
   bloqueo antes de avanzar.

## 2. Mapa del repositorio

| Ruta | Que contiene | Cuando leer |
|---|---|---|
| `app/` | App Router, layout global, pagina principal y CSS global | Siempre que cambie la experiencia |
| `components/layout/` | Header, footer, toggle de tema, scroll top | Cambios de navegacion o shell |
| `components/sections/` | Secciones de la landing | Cambios visuales o comerciales |
| `content/site-map.ts` | Navegacion y mapa narrativo del sitio | Cambios de copy o estructura |
| `public/brand/` | Logos, isotipos, imagenes de marca | Optimizacion o reemplazo de assets |
| `docs/` | Arquitectura, convenciones y verificacion | Antes de implementar o revisar |
| `progress/` | Estado actual e historial de sesiones | Al inicio y cierre de cada sesion |
| `feature_list.json` | Tablero de features atomicas | Siempre |
| `CHECKPOINTS.md` | Checkpoints de aprobacion | Antes de marcar una feature como done |

## 3. Reglas duras

- Una sola feature a la vez.
- No inventar clientes, metricas, testimonios, certificaciones ni resultados.
- No dejar controles que parezcan funcionales si no lo son, salvo que esten
  claramente definidos como pendiente de implementacion.
- No agregar dependencias nuevas sin justificarlo en `progress/current.md`.
- No tocar assets de marca sin revisar peso, uso y efecto visual.
- No declarar `done` sin ejecutar la verificacion definida.
- Si el build requiere permisos fuera del sandbox, documentar el motivo.

## 4. Flujo de trabajo

1. Lider: entiende la feature, acota alcance y registra plan.
2. Implementador: modifica solo los archivos necesarios para esa feature.
3. Verificacion: corre comandos reales.
4. Revisor: contrasta contra `CHECKPOINTS.md`, docs y evidencia.
5. Cierre: actualiza `feature_list.json`, mueve resumen a `progress/history.md`
   y deja `progress/current.md` listo para la proxima sesion.

## 5. Control de tokens

- No releer `node_modules`, `.next`, `.git` ni archivos generados salvo que la
  feature lo exija.
- Usar `rg` y lecturas acotadas por archivo.
- Preferir docs del arnes antes de redescubrir todo el repo.
- Escribir resultados largos en `progress/` y resumir en chat.
