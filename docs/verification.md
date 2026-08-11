# Verificacion - SurInnovacion Web

El agente no dice "funciona": lo demuestra.

## Verificacion base

```bash
npm run lint
npm run typecheck
npm run build
```

Tambien se puede usar:

```bash
./init.sh
```

## Nota sobre `npm run build`

En este entorno, Next.js/Turbopack puede fallar dentro del sandbox porque intenta
crear un proceso o bindear un puerto interno. Si ocurre, repetir el build con
permiso aprobado y registrar la evidencia en `progress/current.md`.

## Verificacion visual

Cuando una feature toque UI:

- Revisar mobile y desktop.
- Confirmar que el header no tapa contenido.
- Confirmar que botones y enlaces hacen lo que prometen.
- Confirmar que assets de marca cargan y no deforman el layout.

## Cierre de feature

Antes de marcar `done`:

1. Ejecutar `./init.sh`.
2. Registrar comandos y resultado en `progress/current.md`.
3. Revisar `CHECKPOINTS.md`.
4. Mover resumen a `progress/history.md`.
