# Sesion actual

- Feature en curso: ninguna
- Inicio: 2026-11-02
- Agente: Claude Code

## Plan

- Revisar `feature_list.json` y elegir solo una feature `pending`.
- Ejecutar `./init.sh` antes de implementar.
- Registrar aqui el alcance y la bitacora de la proxima feature.

## Bitacora

- 2026-11-02: limpieza de codigo y assets muertos de la feature 17 (ver
  "Limpieza 2026-11-02" mas abajo). No se abrio ninguna feature nueva.
- Feature 17 cerrada el 2026-10-14. Ver `progress/history.md`.
- Feature 15 cerrada el 2026-08-11. Ver `progress/history.md`.
- Feature 16 cerrada el 2026-09-23. Ver `progress/history.md`.

## Limpieza 2026-11-02

Cierre del pendiente que dejo la feature 17 (`CHECKPOINTS.md` C4: no dejar
codigo muerto ni assets pesados sin razon).

- Se elimino `components/sections/scrollytelling-landing.tsx`, la
  implementacion anterior que ya no importaba ningun modulo; `app/page.tsx`
  usa solo `scrollytelling-landing-v2.tsx`.
- Se elimino `public/hero/frames/` con sus 360 JPG (30 MB). La secuencia
  activa usa los perfiles WebP de `public/hero/sequence-v2/`.
- `public/hero/` bajo de 39 MB a 9,7 MB.
- Los fotogramas se pueden regenerar desde
  `assets/source/hero-puerto-montt.mov`, que sigue local y fuera de Git.
- Verificacion: `RUN_BUILD=1 ./init.sh` paso con lint, typecheck y build en
  verde el 2026-11-02.

## Verificacion

- Limpieza 2026-11-02: `RUN_BUILD=1 ./init.sh` paso (lint, typecheck y build).
- Feature 17: `RUN_BUILD=1 ./init.sh`, prueba automatizada de scroll/rotacion y revision visual 390 px pasaron el 2026-10-14.
- Feature 16: `./init.sh`, `npm run lint`, `npm run typecheck`, `npm run build` y revision visual desktop/movil pasaron el 2026-09-23.

## Riesgos pendientes

- El trabajo de las features 13 a 17 sigue sin confirmar en Git. Son 10
  archivos modificados mas `scrollytelling-landing-v2.tsx` y
  `public/hero/sequence-v2/`.
- La feature 17 esta `done` en `feature_list.json` pero no desplegada:
  produccion sigue con la implementacion anterior.
- Las features 9 y 10 siguen `pending` aunque las features 13 y 15 cubrieron
  parte de su alcance. Hay que decidir si se cierran o se reducen.
- Mantener una sola feature activa por sesion.
- Validar la mejora tambien en un dispositivo movil real despues del despliegue.

## Proximo paso

Confirmar en Git el trabajo de las features 13 a 17 y desplegar la 17 antes de
abrir una feature nueva.
