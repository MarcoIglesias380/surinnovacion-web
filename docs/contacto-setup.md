# Setup del contacto: correo corporativo, almacen y notificaciones

Fecha: 2026-11-02
Contexto: `docs/estrategia-conversion-seo.md`, frentes 1 y 2.

El codigo del formulario y del endpoint `POST /api/contacto` ya esta
implementado. Este documento cubre lo que falta y que solo puede hacer el owner,
porque requiere crear cuentas y tocar el DNS.

## Como se comporta hoy, sin configurar nada

El endpoint lee variables de entorno y activa cada canal solo si estan
presentes. Hay tres comportamientos distintos a proposito:

| Situacion | Respuesta | Que ve el visitante |
|---|---|---|
| Ningun canal configurado | `200` con `fallback: "whatsapp"` | Se abre WhatsApp con el mensaje armado, igual que antes del cambio |
| Al menos un canal guarda el lead | `200` con `channels` | Estado de exito en el sitio, sin salir |
| Algun canal configurado pero todos fallan | `502` | Mensaje de error y WhatsApp como salida |

La primera fila es deliberada: permite desplegar este cambio **antes** de
completar el setup sin empeorar la experiencia actual. El sitio se comporta
como siempre y mejora solo, sin tocar codigo, en cuanto se agreguen las
variables.

Mientras no haya canales configurados el formulario no captura nada: el lead
sigue dependiendo de que el visitante termine el envio en WhatsApp. Ese es
justamente el problema que resuelven los pasos de abajo.

## Paso 1: correo corporativo en Zoho Mail

1. Crear cuenta gratuita en Zoho Mail eligiendo "usar un dominio que ya tengo"
   e indicar `surinnovacion.cl`.
2. Crear el buzon `contacto@surinnovacion.cl` y el alias
   `marco@surinnovacion.cl`.
3. Zoho entrega los registros a publicar. En Hostinger, en la zona DNS de
   `surinnovacion.cl`, agregar:
   - Los **MX** que indique Zoho.
   - El **TXT de verificacion** del dominio.
   - El **DKIM** que entrega Zoho.
4. Activar en Zoho el reenvio de `contacto@surinnovacion.cl` al Gmail personal
   de Marco. Esto es lo que hace que la notificacion llegue al telefono.

Limite conocido del plan gratuito: no admite IMAP ni POP, asi que se usa por
webmail y por la app movil de Zoho, no con Outlook ni Apple Mail de escritorio.

## Paso 2: envio de notificaciones con Resend

1. Crear cuenta en Resend y agregar el dominio `surinnovacion.cl`.
2. Publicar en Hostinger los registros que pida Resend para firmar el envio:
   su **DKIM** y el **SPF**.
3. Generar una API key.

### SPF: un solo registro para los dos

El dominio admite **un solo** registro SPF. Si Zoho y Resend piden cada uno el
suyo, hay que combinarlos en una sola linea, no crear dos:

```
v=spf1 include:zoho.com include:amazonses.com ~all
```

Los `include` exactos los indica cada proveedor en su panel. Publicar dos
registros SPF separados rompe la autenticacion de los dos.

### DMARC

Agregar un TXT en `_dmarc.surinnovacion.cl`. Partir en modo observacion:

```
v=DMARC1; p=none; rua=mailto:contacto@surinnovacion.cl
```

Despues de unas semanas sin rechazos legitimos, endurecer a `p=quarantine`.

## Paso 3: almacen de leads en Supabase

Garantiza que el lead exista aunque el correo falle. El endpoint escribe
primero aqui y recien despues notifica.

Crear la tabla en el proyecto de Supabase:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  whatsapp text,
  message text not null,
  source text not null default 'landing-contacto',
  received_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
```

No se crea ninguna policy a proposito: con RLS activo y sin policies, nadie
puede leer ni escribir con la clave publica. El endpoint usa la
`service_role`, que pasa por encima de RLS y corre solo en el servidor.

La `service_role` nunca debe quedar en codigo del cliente ni en una variable
con prefijo `NEXT_PUBLIC_`.

## Paso 4: variables de entorno en Vercel

En el proyecto `surinnovacion-web`, en Settings, Environment Variables, para
Production y Preview:

| Variable | Valor | Para que |
|---|---|---|
| `RESEND_API_KEY` | la API key de Resend | Enviar el aviso |
| `LEAD_NOTIFY_TO` | `contacto@surinnovacion.cl` | Destino del aviso. Admite varios separados por coma |
| `LEAD_NOTIFY_FROM` | `SurInnovacion <web@surinnovacion.cl>` | Remitente. Debe ser del dominio verificado en Resend |
| `SUPABASE_URL` | URL del proyecto Supabase | Almacen |
| `SUPABASE_SERVICE_ROLE_KEY` | clave `service_role` | Almacen |
| `LEADS_TABLE` | opcional, por defecto `leads` | Nombre de la tabla |

Despues de agregarlas hay que redesplegar: Vercel no inyecta variables nuevas
en un build ya hecho.

## Paso 5: comprobar que funciona

Con las variables puestas y el deploy listo:

```bash
curl -i -X POST https://surinnovacion.cl/api/contacto -H 'Content-Type: application/json' -d '{"name":"Prueba","email":"tu@correo.cl","message":"Prueba de formulario","consent":true}'
```

Debe responder `200` con `{"ok":true,"channels":["almacen","correo"]}`. Si un
canal falta, aparece solo el otro en `channels`, y eso indica que ese canal
quedo mal configurado.

Verificar luego:

1. Que llego el correo a `contacto@surinnovacion.cl` y al Gmail personal.
2. Que la fila existe en la tabla `leads` de Supabase.
3. Que el formulario del sitio muestra el estado de exito.

## Pendiente despues del setup

Una vez que el buzon exista, agregar la direccion visible en el estado de error
del formulario, como segunda salida junto a WhatsApp. Hoy no se muestra a
proposito: `docs/conventions.md` exige que un control parezca control solo si
hace algo real, y una direccion que no recibe correo no lo hace.

## Proteccion anti spam implementada

- Campo trampa oculto: si viene lleno, el endpoint responde exito y descarta.
- Control de tiempo: un envio en menos de 2 segundos se descarta.
- Topes de largo por campo.
- Consentimiento obligatorio.

Falta un limite por IP, que necesita un almacen compartido entre invocaciones
como Vercel KV. No se implemento para no agregar infraestructura en esta
feature. Si aparece spam real, es el siguiente paso.
