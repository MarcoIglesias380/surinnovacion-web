# CHECKPOINTS - SurInnovacion Web

El estado final se aprueba por evidencia, no por intuicion. Una feature no se
marca `done` si quedan checks relevantes abiertos.

## C1 - Arnes operativo

- [ ] Existe `AGENTS.md`.
- [ ] Existe `feature_list.json`.
- [ ] Existe `progress/current.md`.
- [ ] Existe `progress/history.md`.
- [ ] Existen `docs/architecture.md`, `docs/conventions.md` y
  `docs/verification.md`.
- [ ] `./init.sh` termina con exit code 0.

## C2 - Estado coherente

- [ ] Hay como maximo una feature en `in_progress`.
- [ ] La feature activa esta reflejada en `progress/current.md`.
- [ ] Toda feature `done` tiene evidencia de verificacion.

## C3 - Calidad del sitio

- [ ] No se agregaron claims comerciales inventados.
- [ ] La navegacion principal sigue apuntando a secciones existentes.
- [ ] Los controles visibles funcionan o estan claramente tratados como
  pendientes.
- [ ] Los cambios respetan la direccion visual premium de SurInnovacion.

## C4 - Performance y mantenibilidad

- [ ] No se incluyen `node_modules`, `.next`, `.DS_Store`, `__MACOSX` ni caches
  como parte del entregable fuente.
- [ ] No se agregan assets pesados sin razon.
- [ ] Las dependencias nuevas estan justificadas.
- [ ] No se deja codigo muerto evidente.

## C5 - Verificacion real

- [ ] `npm run lint` pasa.
- [ ] `npm run typecheck` pasa.
- [ ] `npm run build` pasa o queda documentado por que requiere permisos fuera
  del sandbox.
- [ ] Si hay UI nueva, se revisa responsive y estados interactivos relevantes.

## Bugs resueltos

Registrar aqui soluciones generales que eviten repetir errores.
