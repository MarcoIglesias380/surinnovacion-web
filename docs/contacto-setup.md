# Setup del contacto: correo corporativo, almacen y notificaciones

Fecha: 2026-11-02. Actualizado el 2026-11-17 con el correo ya montado.
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

## Paso 1: correo corporativo en Hostinger - HECHO el 2026-11-17

Se activo el plan **Free Business Email** sobre `surinnovacion.cl`, sin costo:
el cupo gratuito ya estaba disponible en la cuenta.

Estado actual:

- Buzon `contacto@surinnovacion.cl`, activo, 1 GB.
- Reenvio a la cuenta personal de Gmail, activo, con copia guardada en el
  buzon. El plan gratuito admite **una sola** regla de reenvio y ya esta usada.
- Hostinger publico solo los registros DNS, porque la zona de
  `surinnovacion.cl` ya se administra ahi (nameservers `dns-parking.com`).

Verificado contra DNS publico, no contra el panel:

| Registro | Valor |
|---|---|
| MX | `mx1.hostinger.com` (5), `mx2.hostinger.com` (10) |
| SPF | `v=spf1 include:_spf.mail.hostinger.com ~all` |
| DKIM | CNAME en `hostingermail-a/b/c._domainkey`, clave real en el selector `a` |
| DMARC | `v=DMARC1; p=none` |

El registro A del apex sigue en `76.76.21.21`, que es Vercel, y el sitio
responde 200 en apex y en www. Agregar el correo no toco el hosting.

**Aviso:** si Hostinger ofrece "reparar" o "restablecer" la zona DNS completa,
no aceptar. Esas reparaciones devuelven el registro A a los servidores de
Hostinger y tumban el sitio, que vive en Vercel.

Por que Hostinger y no Zoho, que era el plan original de este documento: el DNS
ya estaba ahi, asi que no hubo que pegar un solo registro a mano; el costo es el
mismo, cero; y el plan incluye IMAP, que el plan gratuito de Zoho no da.

### Como se trabaja el buzon desde Gmail

El reenvio deja los leads mezclados con el correo personal, y las respuestas
salen desde la direccion personal. Las dos cosas se arreglan en Gmail, sin
costo y sin tocar Hostinger.

**Filtro con etiqueta.** Gmail, Configuracion, Filtros, Crear filtro:

```
Para: contacto@surinnovacion.cl
-> Aplicar etiqueta "SurInnovacion" + Destacar
```

Funciona porque el reenviador de Hostinger conserva el destinatario original en
la cabecera del mensaje.

**Enviar como.** Gmail, Configuracion, Cuentas e importacion, "Anadir otra
direccion de correo". Sin esto, responder a un lead lo contesta desde el Gmail
personal, que ademas queda expuesto al cliente.

| Campo | Valor |
|---|---|
| Servidor SMTP | `smtp.hostinger.com` |
| Puerto | `465`, SSL |
| Usuario | `contacto@surinnovacion.cl` |
| Contrasena | la del buzon |

Conviene marcar tambien "responder desde la direccion a la que se envio el
mensaje", para que quede automatico.

Resto de los datos del servidor, por si se configura un cliente de escritorio o
la app del telefono:

| Protocolo | Host | Puerto |
|---|---|---|
| IMAP | `imap.hostinger.com` | 993, SSL |
| SMTP | `smtp.hostinger.com` | 465, SSL |
| POP3, no recomendado | `pop.hostinger.com` | 995 |

**Alternativa descartada por ahora:** agregar el buzon como cuenta IMAP aparte
en la app de Gmail. Daria una bandeja separada, pero es otra bandeja que revisar
y las notificaciones de cuentas IMAP llegan por sondeo, mas lentas. Con el
volumen actual el filtro rinde mejor. Si el volumen crece, esta es la salida.

Cuando el formulario este conectado, sus avisos llegan con asunto
`Asesoria IA: <nombre>` y con el correo del interesado en `reply_to`, asi que un
segundo filtro sobre ese asunto separa los leads del formulario del correo
directo, y responder le llega al cliente.

## Paso 2: envio de notificaciones con Resend

Hace falta porque el buzon resuelve **recibir**, no que el sitio avise. El
endpoint no habla SMTP: manda el aviso por HTTP, y por eso no suma dependencias.

1. Crear cuenta en Resend.
2. Agregar el subdominio `send.surinnovacion.cl`, no el apex. El porque esta
   abajo, en la nota de SPF.
3. Publicar en Hostinger los registros que pida Resend para firmar el envio:
   su **DKIM** y el **SPF**, ambos sobre ese subdominio.
4. Generar una API key.

### SPF: no tocar el del apex

El apex ya tiene el SPF de Hostinger y el dominio admite **un solo** registro
SPF. Para no tocarlo, verificar en Resend un subdominio de envio, por ejemplo
`send.surinnovacion.cl`, que es ademas lo que Resend recomienda. Asi el SPF de
Resend vive en el subdominio y el del correo entrante queda intacto.

Si en cambio se verificara el apex, habria que combinar los dos include en una
sola linea, nunca en dos registros separados:

```
v=spf1 include:_spf.mail.hostinger.com include:amazonses.com ~all
```

Publicar dos registros SPF separados rompe la autenticacion de los dos.

### DMARC

Ya publicado por Hostinger en `_dmarc.surinnovacion.cl`:

```
v=DMARC1; p=none
```

Esta en modo observacion, que es lo correcto para empezar. Falta el `rua` si se
quieren recibir los reportes:

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
| `LEAD_NOTIFY_FROM` | `SurInnovacion <web@send.surinnovacion.cl>` | Remitente. Debe ser del dominio o subdominio verificado en Resend |
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

El buzon ya existe y recibe, asi que esto quedo accionable: agregar
`contacto@surinnovacion.cl` visible en el estado de error del formulario, como
segunda salida junto a WhatsApp. No se habia puesto antes a proposito, porque
`docs/conventions.md` exige que un control parezca control solo si hace algo
real, y una direccion que no recibia correo no lo hacia.

## Proteccion anti spam implementada

- Campo trampa oculto: si viene lleno, el endpoint responde exito y descarta.
- Control de tiempo: un envio en menos de 2 segundos se descarta.
- Topes de largo por campo.
- Consentimiento obligatorio.

Falta un limite por IP, que necesita un almacen compartido entre invocaciones
como Vercel KV. No se implemento para no agregar infraestructura en esta
feature. Si aparece spam real, es el siguiente paso.
