# Auditoría SEO y GEO de SurInnovacion

## Estado comprobado en producción

- La portada y las rutas `/servicios` y `/asesoria-ia` devuelven HTTP 200. La portada se presenta como asesoría en inteligencia artificial; su H1 no comunica la evaluación de procesos ni la optimización de recursos.
- `robots.txt` devuelve HTTP 200, permite el rastreo público con `User-agent: *` y declara el sitemap. Esto verifica la política publicada, no la actividad efectiva de los crawlers ni su paso por la infraestructura de red.
- El sitemap publicado enumera tres páginas. `/marco-iglesias` devuelve 404 y su implementación ya está en un commit local. La publicación de la siguiente versión puede incorporar esa página y sus enlaces.
- [Is Agentic](https://is-agentic.com/scan/surinnovacion.cl) dio 77/100. La falta de Markdown por negociación explica una parte importante del puntaje. También registró la falta de instrucciones de descubrimiento, `ContactPoint` y páginas institucionales identificables por el escáner. El 404 genérico devuelve el código correcto. El puntaje no mide indexación, rankings ni probabilidad de que un asistente cite el sitio.
- No hay evidencia de impresiones, consultas, posiciones o páginas indexadas en esta auditoría. Una búsqueda pública de dominio no sustituye la inspección de URL en Search Console.

## Posicionamiento y arquitectura

| Intención a validar en Search Console | Página | Qué responde |
| --- | --- | --- |
| Consultoría en innovación empresarial en Puerto Montt | Portada | A quién atiende SurInnovacion, qué evalúa y cómo iniciar una conversación. |
| Mejora de procesos administrativos y automatización de procesos para empresas | Servicios | Qué se revisa, cómo se elige entre opciones y qué tipos de soluciones se implementan. |
| Asesoría en inteligencia artificial para empresas | Asesoría IA | Cuándo conviene incorporar IA y qué incluye la sesión inicial. |
| Quién es Marco Iglesias y qué trabajo puede mostrar | Perfil | Formación y obras públicas verificables. |

Las consultas de la tabla son hipótesis comerciales. El volumen y la competencia todavía no están medidos. Mantener una URL por intención principal evita páginas duplicadas. Si las consultas y los casos reales justifican más profundidad, la primera candidata es una página sobre optimización administrativa con ejemplos y metodología propios.

La portada y Servicios ahora explican el camino de evaluación, asesoría e implementación con ejemplos de cotizaciones y registros duplicados. El contenido aparece en el HTML. Se alinearon títulos, descripción, enlaces y datos estructurados. Servicios usa el WhatsApp oficial para la primera conversación porque la entrega por correo del formulario sigue sin confirmarse en el registro del proyecto.

## Prioridad después de publicar

1. Abrir en producción la portada, Servicios, Asesoría IA y el perfil de Marco. Confirmar HTTP 200, canonicals, contenido en HTML y sitemap. Comprobar la entrega del formulario antes de usarlo como canal principal de captación.
2. En la propiedad de dominio de Google Search Console, enviar el sitemap e inspeccionar esas cuatro URLs. Registrar indexación, canonical elegido por Google y errores de rastreo. Comparar impresiones y clics por página y consulta cada 28 días. Separar consultas con el nombre de la marca de las consultas de servicio. Medir aperturas de WhatsApp y distinguirlas de conversaciones efectivas.
3. Preparar casos verificables con permiso del cliente. Para cada caso, describir el proceso anterior, la decisión tomada, su implementación y cómo se midió el resultado. Los sitios web públicos ayudan a demostrar desarrollo web. Una mejora administrativa requiere evidencia de ese tipo de trabajo, con datos anonimizados cuando corresponda.
4. Comprobar la consistencia del nombre, teléfono y zona atendida en los perfiles públicos que la empresa ya utiliza. Repetir una muestra fija de consultas no marcarias en ChatGPT, Claude y Gemini con búsqueda web. Anotar fecha, consulta, enlaces citados y página de destino. Tratar ese muestreo como observación, no como ranking estable.

## Referencias técnicas

- [Google Search Central sobre AI Overviews y AI Mode](https://developers.google.com/search/docs/appearance/ai-features). La elegibilidad depende de la indexación y de poder mostrar un fragmento. Google no exige archivos nuevos ni un marcado especial para sus funciones de IA en Search.
- [Rastreadores de OpenAI](https://developers.openai.com/api/docs/bots) y [rastreadores de Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler). ChatGPT y Claude documentan agentes para búsqueda y controles independientes de los de entrenamiento.
- [Rastreadores y controles de Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers). Google-Extended también se relaciona con usos de Gemini; Google Search tiene controles separados. Se mantuvo la política de rastreo existente.
- Se agregó `llms.txt` como índice opcional hacia páginas públicas. Se prioriza HTML, enlaces y pruebas de trabajo sobre la negociación Markdown y el formato de la respuesta 404, que pertenecen a la metodología del escáner y no son requisitos documentados de Google.
