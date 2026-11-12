# Convenciones - SurInnovacion Web

## Estilo de codigo

- Mantener TypeScript estricto.
- Componentes React en PascalCase.
- Variables y funciones en ingles cuando son tecnicas; copy visible en espanol.
- Preferir componentes existentes antes de crear nuevas abstracciones.
- No agregar comentarios salvo que expliquen una decision no obvia.
- Mantener cambios pequenos y ligados a una sola feature.

## Estilo visual

- Mantener la identidad: azul noche, cian, violeta, blanco cristal y tecnologia
  premium.
- Evitar que la UI se convierta en una paleta de un solo color.
- No agregar decoracion pesada que no aporte al mensaje comercial.
- Revisar que textos, botones y cards no se solapen en mobile.
- Los controles deben parecer controles solo si hacen algo real.

## Reglas de negocio

- No inventar clientes, casos de exito, cifras, alianzas ni certificaciones.
- No publicar promesas tecnicas imposibles de verificar.
- El contacto oficial actual es WhatsApp: `+56 9 9289 1678`.
- El correo corporativo `contacto@surinnovacion.cl` esta planificado pero aun no
  existe. No publicarlo en la UI hasta que el buzon reciba correo. Ver
  `docs/contacto-setup.md`.
- La oferta comercial vigente es una asesoria gratuita de **30 minutos por
  videollamada**. No prometer informes, auditorias ni documentos escritos.
- Lo que vende SurInnovacion hoy: **asesorias, sitios web y plataformas, CRM** y
  trabajos relacionados. La asesoria gratuita es la puerta de entrada, no el
  catalogo completo. Nota: el sitio publicado hoy comunica solo la linea de
  asesoria en IA; ampliar el mensaje a las demas lineas es una decision
  pendiente del owner.
- La vitrina de proyectos muestra solo trabajos con enlace publico vigente. Los
  proyectos se retiran de la lista cuando el owner lo pide, sin dejar fichas
  muertas.
- La ubicacion actual documentada es Valle Volcanes, Puerto Montt.
- Cualquier backend, formulario, CRM o integracion externa debe quedar
  documentada antes de implementarse. El formulario de contacto esta
  documentado en `docs/contacto-setup.md`.
- Los datos personales del formulario se usan solo para responder la consulta.
  No agregar campos que no se necesiten para eso.

## Dependencias

- No agregar dependencias nuevas sin registrar motivo en `progress/current.md`.
- Evitar librerias para cosas que CSS/React resuelven bien.
- Si se fija una version, actualizar tambien `package-lock.json`.

## Que no hacer

- No trabajar varias features en la misma sesion.
- No limpiar masivamente archivos sin verificar que son generados o temporales.
- No tocar `.git` salvo que el owner pida una accion git especifica.
- No ocultar fallos de build o advertencias relevantes.
