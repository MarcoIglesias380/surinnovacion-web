# Sesion actual

- Feature en curso: 9, contacto real sin perder leads
- Estado: `blocked`. Codigo completo y verificado; falta setup de cuentas y DNS
  que solo puede hacer el owner.
- Inicio: 2026-11-02
- Agente: Claude Code

## Plan

- Cerrar la feature 9 una vez que el owner complete `docs/contacto-setup.md`.
- Despues abrir la feature de H1/H2 y textos con keywords, segun
  `docs/estrategia-conversion-seo.md`.

## Bitacora

- 2026-11-02: evaluacion de conversion, leads y SEO en
  `docs/estrategia-conversion-seo.md`. Feature 9 reescrita e implementada.
- 2026-11-02: limpieza de codigo muerto, commit `840592d` y despliegue de las
  features 16 y 17. Ver `progress/history.md`.
- Feature 17 cerrada el 2026-10-14. Ver `progress/history.md`.
- Feature 15 cerrada el 2026-08-11. Ver `progress/history.md`.
- Feature 16 cerrada el 2026-09-23. Ver `progress/history.md`.

## Feature 9: que se implemento

Diagnostico: el formulario anterior no enviaba nada a ninguna parte. Armaba un
texto y llamaba a `window.open` hacia WhatsApp. Sin correo, sin base de datos,
sin registro. Cada lead dependia de que el visitante completara una segunda
accion en otra aplicacion; si la abandonaba, el lead se perdia sin rastro. El
campo "Correo" era decorativo. Ademas el dominio no tenia registros MX, SPF ni
DMARC, asi que no existia ningun buzon donde recibir.

Cambios:

- Nuevo `app/api/contacto/route.ts`, Route Handler POST sin dependencias
  nuevas: usa `fetch` contra las APIs REST de Supabase y Resend.
- Orden deliberado: **guarda primero, notifica despues**. Si el correo falla,
  el lead ya existe. La respuesta indica en `channels` que canales lograron
  capturarlo.
- Degradacion elegante: si no hay ningun canal configurado, responde
  `fallback: "whatsapp"` y el formulario abre WhatsApp igual que antes. Esto
  permite desplegar antes de completar el setup sin empeorar la experiencia.
- El formulario pasa a tener estados reales de carga, exito y error, con
  WhatsApp como salida alternativa en el error.
- Navegacion por `window.location.href` en vez de `window.open`, que evita el
  bloqueador de ventanas emergentes de Safari iOS.
- Anti spam sin CAPTCHA: campo trampa oculto, descarte de envios en menos de
  2 segundos y topes de largo por campo.
- Consentimiento explicito obligatorio y minimizacion de datos: los datos
  personales llegan a los logs solo si ningun canal logro capturar el lead, es
  decir solo cuando el log es el ultimo rastro que queda.
- `docs/conventions.md` actualizado: el correo corporativo queda documentado
  como planificado y no publicable en la UI hasta que exista, y se registra la
  oferta vigente de 30 minutos.
- `.env.example` y `docs/contacto-setup.md` con los pasos de Zoho, Resend,
  Supabase, DNS y la SQL de la tabla `leads`.

## Verificacion

- Feature 9, endpoint probado contra servidor de desarrollo real:
  - 8 casos de validacion: sin nombre `422`, sin consentimiento `422`, sin
    correo ni WhatsApp `422`, correo invalido `422`, JSON roto `400`,
    honeypot lleno `200` sin fallback, envio en 500 ms `200` sin fallback,
    sin canales configurados `200` con `fallback: whatsapp`.
  - Camino de exito contra un servidor de prueba que suplanta el almacen:
    `200` con `channels: ["almacen"]`. El cuerpo recibido coincide con el
    esquema de la tabla: ruta `/rest/v1/leads`, cabecera de autorizacion
    presente y `Prefer: return=minimal`.
  - Minimizacion de datos comprobada: con el lead guardado, el log contiene
    solo nombre y detalle de canales, sin mensaje ni correo.
- `RUN_BUILD=1 ./init.sh`: lint, typecheck y build pasaron. `/api/contacto`
  aparece como ruta dinamica y la portada conserva su prerender estatico.
- `git diff --check`: paso.
- No verificado todavia: el flujo de punta a punta con correo real y el aviso
  llegando al telefono. Depende del setup del owner.

## Riesgos pendientes

- La feature 9 no se puede cerrar hasta que exista el buzon y las variables
  esten en Vercel. Mientras tanto el formulario sigue derivando a WhatsApp.
- El limite por IP no esta implementado: necesita un almacen compartido entre
  invocaciones como Vercel KV. Si aparece spam real, es el siguiente paso.
- Ley 21.719 de proteccion de datos: la fecha de entrada en vigencia que
  encontre viene del blog de un proveedor y hay que confirmarla en fuente
  oficial.
- Las features 10 y 11 siguen `pending` con alcance parcialmente cubierto.
- Mantener una sola feature activa por sesion.

## Proximo paso

El owner completa `docs/contacto-setup.md`. Despues se verifica el flujo real,
se cierra la feature 9 y se abre la feature de H1/H2 con keywords.
