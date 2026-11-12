# Datos estructurados (Schema.org)

Le dicen a Google y a las IA que *es* cada cosa de la pagina, en vez de dejar que
lo deduzcan del texto. Habilitan resultados enriquecidos y ayudan a que un modelo
describa bien el negocio.

Usa JSON-LD en un `<script type="application/ld+json">`. Es lo que Google
recomienda y lo mas facil de mantener.

## Que usar segun el caso

| Situacion | Tipo |
|---|---|
| Negocio con local o zona de servicio | `LocalBusiness` o un subtipo mas preciso |
| Servicio profesional | `ProfessionalService` (es subtipo de LocalBusiness) |
| Empresa sin atencion presencial | `Organization` |
| Persona (autor, fundador) | `Person` |
| Un servicio concreto | `Service` con `offers` |
| Preguntas frecuentes visibles | `FAQPage` |
| Articulo o guia | `Article` con `author` y `datePublished` |
| Ruta de navegacion | `BreadcrumbList` |
| Producto con precio | `Product` con `offers` |

## Negocio local

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://ejemplo.cl/#organization",
  "name": "Nombre exacto del negocio",
  "url": "https://ejemplo.cl",
  "telephone": "+56 9 1234 5678",
  "email": "contacto@ejemplo.cl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 123",
    "addressLocality": "Puerto Montt",
    "addressRegion": "Los Lagos",
    "postalCode": "5480000",
    "addressCountry": "CL"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -41.4689, "longitude": -72.9411 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "18:00"
  }],
  "areaServed": { "@type": "Country", "name": "Chile" },
  "sameAs": ["https://www.linkedin.com/company/...", "https://www.instagram.com/..."]
}
```

`sameAs` importa mas de lo que parece: conecta tu web con los perfiles donde el
negocio ya existe y refuerza la entidad. El NAP de aqui debe coincidir **exacto**
con la ficha de Google.

## Servicio con oferta

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Asesoria en inteligencia artificial",
  "provider": { "@id": "https://ejemplo.cl/#organization" },
  "areaServed": { "@type": "Country", "name": "Chile" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CLP" }
}
```

## Preguntas frecuentes

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "La pregunta tal como aparece en la pagina",
    "acceptedAnswer": { "@type": "Answer", "text": "La respuesta completa." }
  }]
}
```

Genera las preguntas del marcado y las visibles **desde la misma fuente de datos**
en el codigo. Si se escriben dos veces, tarde o temprano dejan de coincidir y el
marcado pasa a describir algo que no existe.

## Errores que invalidan el marcado

- Marcar contenido que no esta visible en la pagina. Es motivo de penalizacion
  manual, no solo de que se ignore.
- Precios, horarios o telefonos distintos a los del HTML.
- Referenciar un `@id` que no existe en ninguna pagina del sitio. Si una pagina
  hija apunta a `#organization`, conviene incluir tambien ese nodo ahi: no todos
  los consumidores del marcado resuelven referencias entre paginas.
- JSON mal formado. Rompe el bloque entero en silencio.
- Inventar `aggregateRating` sin resenas reales y verificables.

## Como comprobarlo

- Prueba de resultados enriquecidos de Google, para ver que es elegible.
- Validador de Schema.org, para errores de sintaxis.
- En Search Console, el informe de mejoras muestra los errores en el sitio real,
  que es lo que de verdad cuenta.
