# Recomendacion: el posicionamiento de la portada

Fecha: 2026-11-17
Autor: Claude Code, sesion de SEO
Estado: **recomendacion. No se aplico ningun cambio.** La decision es del owner.

Medicion de respaldo en
[`progress/informe-seo-2026-11-17.md`](../progress/informe-seo-2026-11-17.md),
seccion 3.

---

## 1. Que paso

El commit `b64a4be` del 2026-11-15 reposiciono la portada. En un mismo
movimiento cambio tres cosas:

| | Antes | Ahora |
|---|---|---|
| Title | `Asesoria en Inteligencia Artificial para empresas` | `Consultoría en innovación empresarial \| SurInnovacion` |
| H1 | `Inteligencia artificial para tu empresa.` | `Sistemas a medida para tu empresa` |
| Linea de autoridad en el hero | `Marco Iglesias · Master y divulgador de Inteligencia Artificial` | eliminada |

El cambio tiene una logica comercial real y no la discuto: el negocio vende
cinco lineas, no solo IA, y la portada estaba prometiendo una sola. Ese fue un
problema legitimo.

## 2. El costo, medido

Lo que no se vio al hacerlo es que la keyword no se movio de lugar: desaparecio.

Sobre las 273 palabras del texto visible de la portada publicada:

- "inteligencia artificial": **0 veces**
- "innovacion empresarial": **0 veces**
- "automatizacion": **0 veces**

Es decir:

1. **La keyword mas fuerte del negocio no aparece en ninguna parte de la pagina
   principal.** No es que salio del title: salio de la pagina. Quedan dos
   apariciones de la sigla "IA", ambas dentro del bloque del blog.
2. **El title promete una frase que la pagina nunca dice.** Un title de
   "Consultoría en innovación empresarial" sobre un cuerpo que habla de sistemas
   a medida y procesos es una promesa sin respaldo. Google compara title, H1 y
   cuerpo; aqui los tres apuntan a cosas distintas.
3. **El H1 tampoco recogio la keyword.** "Sistemas a medida para tu empresa" es
   una categoria generica y disputada, sin la geografia ni el diferenciador que
   si tiene el negocio.
4. **La portada sigue nombrando a Marco, pero ya no dice que es Master en IA.**
   Medido sobre el HTML publicado, "Marco Iglesias" aparece 4 veces en el texto
   visible. Lo que se perdio con la linea del hero es su formacion: "master" y
   "divulgador" aparecen **0 veces** en toda la portada. Para los buscadores con
   IA eso importa mas de lo que parece: trabajan con entidades explicitas
   (persona, formacion, ciudad, servicio) y no con adjetivos. El nombre sigue
   ahi; la credencial que lo respalda, no.

Contexto que matiza el costo: "inteligencia artificial" si vive en
`/asesoria-ia` y en el blog, y esas paginas estan bien construidas. El dominio
no perdio la keyword; la perdio **su pagina mas fuerte**, que es la que recibe
los enlaces y la que se posiciona por marca.

## 3. Lo que NO recomiendo

**Volver al title anterior tal cual.** "Asesoria en Inteligencia Artificial para
empresas" es hoy, palabra por palabra, la intencion de `/asesoria-ia`. Dos
paginas compitiendo por la misma busqueda no ganan media cada una: se estorban y
Google elige una, normalmente no la que uno queria. Una pagina, una intencion.

Tampoco recomiendo dejarlo como esta, por lo medido en la seccion 2.

## 4. Las tres opciones

### Opcion A. Dejarlo como esta

Sin trabajo. La portada queda como pagina de marca y de categoria amplia, y la
IA se trabaja desde `/asesoria-ia` y el blog.

- A favor: refleja que el negocio es mas que IA. Cero riesgo de romper nada.
- En contra: la pagina mas fuerte del dominio no compite por la keyword
  principal, y el title sigue prometiendo una frase ausente del cuerpo. La
  incoherencia title/H1/cuerpo se mantiene.

### Opcion B. Revertir al posicionamiento de IA

Volver al title y H1 anteriores.

- A favor: recupera la keyword en la pagina mas fuerte.
- En contra: choca de frente con `/asesoria-ia`, y deshace una decision
  comercial del owner que tenia sentido. Vuelve a comunicar una sola linea de
  cinco.

### Opcion C. Que la portada incluya la IA sin robarle la busqueda a `/asesoria-ia` (recomendada)

La portada no deberia competir por "asesoria en inteligencia artificial", que es
transaccional y ya tiene pagina. Deberia competir por la combinacion que
describe al negocio completo y que nombra la entidad.

Title, 60 caracteres, dentro del limite:

> `Inteligencia artificial y mejora de procesos | SurInnovacion`

Alternativa si se prefiere conservar la palabra consultoria, 54 caracteres:

> `Consultoría en IA y mejora de procesos | SurInnovacion`

H1, 59 caracteres, contra los 33 de hoy y los 65 que el hero admite segun lo ya
medido en `docs/estrategia-conversion-seo.md`:

> `Inteligencia artificial y sistemas a medida para tu empresa`

Y dos cosas mas, que valen tanto como el title:

- **Que el cuerpo diga la frase.** Da igual lo que prometa el title si las 273
  palabras de la pagina no mencionan nunca la inteligencia artificial ni la
  automatizacion. Basta con que los parrafos que ya existen nombren lo que el
  negocio hace, con las palabras que la gente escribe.
- **Devolver la linea de Marco al hero.** `Marco Iglesias · Master en
  Inteligencia Artificial` reponde la entidad persona-formacion-negocio en la
  pagina principal y enlaza a `/marco-iglesias`, que ya existe y la respalda. Es
  la senal de fondo que de verdad importa, y es verificable: no se inventa nada.

Costo: tocar el texto del hero. El visual no cambia, pero el H1 pasa de una
linea larga a dos en movil, asi que hay que verificarlo a 375 px antes de
publicar.

## 5. Recomendacion

**Opcion C.** Recupera la keyword en la pagina que mas pesa, no canibaliza
`/asesoria-ia`, respeta la decision comercial de no presentarse solo como IA, y
de paso corrige la incoherencia entre title, H1 y cuerpo, que hoy es el defecto
mas concreto de la portada.

Si hay que elegir una sola cosa de la opcion C, que sea **que el cuerpo de la
portada diga lo que el title promete**. Un title ajustado sobre una pagina que
no lo respalda se corrige solo a medias.

## 6. Advertencia honesta

Esta recomendacion se apoya en coherencia on-page y en el criterio de una
pagina por intencion. **No se apoya en datos de busqueda del sitio**, porque no
existen: no hay acceso a Search Console, ni impresiones, ni posiciones, ni
volumenes verificados para estas keywords. Son hipotesis comerciales, igual que
las de la auditoria del 2026-11-15.

Por eso el orden correcto es: primero conectar Search Console y registrar la
linea base, despues cambiar el posicionamiento, y comparar a 28 dias. Si se
cambia antes, el efecto no sera atribuible a nada.

Y el recordatorio de fondo: los cambios de posicionamiento tardan semanas, y
mientras el formulario no capture leads (sin MX, SPF ni DMARC), todo el trafico
que esto consiga sigue llegando a un embudo incompleto.
