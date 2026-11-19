type Source = { label: string; url: string };

type Article = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  date: string;
  sections: { title: string; paragraphs: string[]; sources?: Source[] }[];
};

export const articles: Article[] = [
  {
    slug: "openai-para-chile-acuerdo-empresas-2026",
    title: "OpenAI para Chile: qué se anunció y qué puede preparar una empresa",
    metaTitle: "OpenAI para Chile: alcances del acuerdo y próximos pasos",
    description: "El anuncio del 17 de noviembre contempla capacitación y apoyo a startups. Sus límites y cómo preparar un piloto de IA con resultados medibles.",
    date: "2026-11-19",
    sections: [
      {
        title: "El anuncio y su alcance",
        paragraphs: [
          "El 17 de noviembre de 2026, OpenAI anunció OpenAI para Chile, una colaboración con el Gobierno encabezada por el Ministerio de Ciencia. Según la compañía, busca explorar IA en la gestión administrativa del Ministerio, formar a funcionarios y apoyar aplicaciones desarrolladas por startups locales.",
          "La comunicación contempla orientación técnica y mentoría. Las actividades, los requisitos y el acceso a tecnología se acordarán por separado. El memorándum no establece compromisos de inversión ni de compra."
        ],
        sources: [{ label: "OpenAI · Presentamos OpenAI para Chile, 17 de noviembre de 2026", url: "https://openai.com/es-419/index/introducing-openai-for-chile/" }]
      },
      {
        title: "Qué confirmó la cobertura independiente",
        paragraphs: [
          "BioBioChile publicó el 17 de noviembre una revisión del memorándum, firmada por Megam Ossandón y Constanza Carrillo Silva. El medio informó que el documento no obliga a contratar servicios ni establece exclusividad. También recogió la aclaración del Ministerio de que la firma no entrega acceso a sistemas del Estado o datos personales y que la capacitación utilizará datos abiertos y sintéticos.",
          "Esto describe el marco anunciado. Las condiciones de cada implementación futura requieren acuerdos y evaluación propios."
        ],
        sources: [{ label: "BioBioChile · Revisión del acuerdo y respuesta del Ministerio, 17 de noviembre de 2026", url: "https://www.biobiochile.cl/noticias/nacional/chile/2026/11/17/los-detalles-del-acuerdo-entre-lincolao-y-openai-confidencialidad-reunion-mensual-y-uso-de-datos.shtml" }]
      },
      {
        title: "Análisis de SurInnovacion: preparar un caso de uso",
        paragraphs: [
          "Para una pyme, una preparación útil es describir un problema concreto y cómo comprobar una mejora. Por ejemplo, si una persona copia solicitudes de clientes al CRM, se puede probar un asistente que proponga los campos y deje la aprobación al equipo. Es un ejemplo de evaluación, sin relación comercial con este acuerdo.",
          "Antes del piloto, registra cuánto tarda la tarea y cuántos datos se corrigen. Usa una muestra autorizada, limita los accesos y compara tiempo de revisión, errores y costo por solicitud aceptada. Si la revisión consume lo mismo que el proceso actual, habrá que ajustar la propuesta."
        ]
      },
      {
        title: "Qué seguir antes de planificar una participación",
        paragraphs: [
          "OpenAI indica que un grupo conjunto definirá prioridades e indicadores. Las condiciones específicas siguen pendientes. El anuncio no permite asumir una postulación abierta ni acceso garantizado.",
          "Como escenario futuro, una convocatoria podría resultar útil para un proyecto local. SurInnovacion recomienda evaluar las bases cuando existan y mantener el presupuesto sujeto a esas condiciones."
        ],
        sources: [{ label: "OpenAI · Plan de trabajo y condiciones pendientes, comunicado del 17 de noviembre de 2026", url: "https://openai.com/es-419/index/introducing-openai-for-chile/" }]
      }
    ]
  },
  {
    slug: "modelos-de-frontera-ia-noviembre-2026",
    title: "Modelos de IA en noviembre de 2026: GPT‑6.1, Claude 5.2 y Gemini 4",
    metaTitle: "GPT‑6.1, Claude 5.2 y Gemini 4: los modelos de noviembre",
    description: "Qué anunciaron OpenAI, Anthropic y Google DeepMind, dónde se pueden usar sus modelos y cómo probarlos en procesos de una empresa.",
    date: "2026-11-15",
    sections: [
      {
        title: "OpenAI: GPT‑6.1 Terra y el canal de acceso",
        paragraphs: [
          "El 26 de octubre, OpenAI inició el despliegue de GPT‑6.1 Terra en su API, ChatGPT Work y Codex. La ficha oficial indica capacidades de razonamiento visual, uso de computador y escritura. Dentro de ChatGPT, la disponibilidad anunciada corresponde a Work y Codex, con acceso sujeto al producto y al plan.",
          "Para una empresa, la distinción importa: una prueba manual en una interfaz y una integración a un sistema administrativo requieren accesos, controles y presupuestos distintos."
        ],
        sources: [{ label: "OpenAI · Notas de lanzamientos de modelos, 26 de octubre", url: "https://help.openai.com/en/articles/9624314-model-release-notes" }]
      },
      {
        title: "Anthropic: Fable 5.2 y Mythos 5.2",
        paragraphs: [
          "El 9 de noviembre, Anthropic anunció Fable 5.2 y Mythos 5.2. Comparten el modelo base, con diferencias en salvaguardas y mecanismos de acceso. Anthropic reportó mejoras en programación, razonamiento y visión en sus pruebas. Fable se ofrece en sus plataformas y proveedores asociados. El acceso avanzado a Mythos sigue canales específicos según la aplicación.",
          "Antes de elegir un modelo para procesar documentos internos, conviene revisar qué permisos necesita, dónde opera y qué ocurre si falla durante una tarea larga."
        ],
        sources: [{ label: "Anthropic · Lanzamiento y evaluaciones de Fable y Mythos 5.2, 9 de noviembre", url: "https://www.anthropic.com/claude-fable-and-mythos-5-2" }]
      },
      {
        title: "Google DeepMind: Gemini 4 Carbon e Hydrogen",
        paragraphs: [
          "Google comunicó la disponibilidad de Gemini 4 Carbon el 10 de noviembre y presentó Hydrogen el 12. DeepMind describe Carbon como una opción para tareas largas y complejas y Hydrogen como una opción rápida para flujos de uso frecuente. Sus resultados publicados sirven para elegir candidatos de prueba. El desempeño en un flujo propio depende de los datos, las instrucciones y las herramientas conectadas."
        ],
        sources: [
          { label: "Google DeepMind · Disponibilidad de Gemini 4 Carbon, 10 de noviembre", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/" },
          { label: "Google DeepMind · Presentación de Gemini 4 Hydrogen, 12 de noviembre", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/" }
        ]
      },
      {
        title: "Qué probar antes de incorporar un modelo en 2027",
        paragraphs: [
          "Si el objetivo es pasar órdenes de compra al sistema, prepara una muestra que incluya documentos incompletos, montos dudosos y formatos distintos. Haz que dos modelos procesen la misma muestra. Cuenta cuántos registros quedaron correctos, cuánto demoró la revisión humana y cuánto costó cada registro aceptado. Mantén la aprobación humana antes de escribir en el sistema. Esas mediciones permiten decidir si conviene un modelo avanzado, uno más ligero o reglas fijas para parte del proceso."
        ]
      }
    ]
  },
  {
    slug: "adopcion-ia-empresas-ocde-2026",
    title: "Adopción de IA en empresas: qué dice la OCDE en 2026",
    description: "El informe de noviembre de la OCDE muestra una brecha entre empresas. Cómo interpretar sus cifras y preparar un piloto medible para 2027.",
    date: "2026-11-15",
    sections: [
      {
        title: "El dato y su alcance",
        paragraphs: [
          "El 5 de noviembre de 2026, la OCDE publicó su Digital Economy and Society Outlook. Para 2025 estimó que el 20 % de las empresas con diez o más empleados usaba IA en el conjunto de países de la OCDE. En el grupo de 250 o más empleados la cifra fue del 52 %.",
          "El 20 % incluye empresas de diferentes tamaños. La comparación es con el promedio general, y las cifras corresponden al conjunto de la OCDE. El dato no permite estimar por sí solo la adopción en las pymes chilenas ni el ahorro de una implementación individual."
        ],
        sources: [{ label: "OCDE · Digital Economy and Society Outlook 2026, comunicado del 5 de noviembre", url: "https://www.oecd.org/en/about/news/press-releases/2026/11/oecd-digital-economy-and-society-outlook-2026.html" }]
      },
      {
        title: "Qué explica la diferencia",
        paragraphs: [
          "La OCDE menciona acceso a financiamiento, infraestructura y habilidades especializadas. También advierte que integrar IA con los sistemas existentes puede ser difícil. Ahí aparece una diferencia práctica: responder una pregunta con un asistente es una tarea individual; usarlo para alimentar un sistema de pedidos requiere definir responsables, permisos y excepciones.",
          "En un área administrativa, una integración pequeña puede resolver la doble digitación entre cotizaciones y órdenes de trabajo. En producción, capturar correctamente la causa y duración de las detenciones puede ser el paso previo para analizar fallas recurrentes."
        ],
        sources: [{ label: "OCDE · Informe y metodología del Digital Economy and Society Outlook 2026", url: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/11/oecd-digital-economy-and-society-outlook-2026_457d074d/022ed474-en.pdf" }]
      },
      {
        title: "Una forma de empezar en 2027",
        paragraphs: [
          "Elige una tarea que ya tenga un responsable y revisa una muestra reciente. Anota cuánto demora hoy, dónde se corrige y qué errores llegan al siguiente equipo. Prueba el cambio con un solo grupo de trabajo y usa esos mismos criterios para evaluar el resultado.",
          "Por ejemplo, en una cotización puedes medir el tiempo hasta que queda lista para revisión, los datos faltantes y las devoluciones. Esa comparación ayuda a decidir si conviene integrar sistemas, ajustar el proceso o incorporar IA en una parte específica."
        ]
      }
    ]
  },
  {
    slug: "centros-de-datos-energia-ia-2026",
    title: "IA y centros de datos en 2026: la energía detrás del crecimiento",
    metaTitle: "IA y centros de datos: la energía detrás del crecimiento",
    description: "Qué encontró la Agencia Internacional de Energía y qué puede evaluar una empresa que depende de servicios de IA en la nube.",
    date: "2026-11-15",
    sections: [
      {
        title: "Qué cambió en la demanda eléctrica",
        paragraphs: [
          "La Agencia Internacional de Energía informó que la demanda eléctrica mundial de los centros de datos creció 17 % en 2025, frente a 3 % para la demanda mundial de electricidad en su conjunto. La estadística incluye centros de datos con distintos usos. La Agencia señala que los especializados en IA crecieron todavía más rápido."
        ],
        sources: [{ label: "Agencia Internacional de Energía · Datos de demanda eléctrica de centros de datos", url: "https://www.iea.org/news/data-centre-electricity-use-surged-in-2025-even-with-tightening-bottlenecks-driving-a-scramble-for-solutions" }]
      },
      {
        title: "Qué examina el informe de octubre de 2026",
        paragraphs: [
          "El 14 de octubre, la Agencia publicó Powering Artificial Intelligence, preparado a petición de la presidencia francesa del G7. Analiza políticas, regulación y estrategias empresariales en 34 jurisdicciones que representan el 90 % de la capacidad de centros de datos del mundo. El estudio examina cómo integrar esa infraestructura a las redes eléctricas teniendo en cuenta costos, seguridad de suministro y sostenibilidad."
        ],
        sources: [{ label: "Agencia Internacional de Energía · Powering Artificial Intelligence, 14 de octubre", url: "https://www.iea.org/reports/powering-artificial-intelligence/" }]
      },
      {
        title: "Qué mirar en 2027 si tu operación depende de IA",
        paragraphs: [
          "La evolución de la infraestructura es un tema a seguir. Para una empresa que contrata modelos en la nube, conviene revisar indicadores que sí puede observar en su propio sistema: disponibilidad del proveedor, tiempos de respuesta, límites de uso y posibilidad de cambiar de servicio.",
          "Imagina un sistema que clasifica incidencias de producción. Si el proveedor demora o deja de responder, la incidencia debe seguir registrándose. Una cola para procesar después o una revisión manual pueden mantener el flujo. Medir el costo por incidencia correctamente clasificada ayuda a comparar alternativas. El crecimiento eléctrico observado no permite deducir cuánto costará una API en 2027."
        ]
      }
    ]
  }
];

const dateFormat = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
});

export function formatArticleDate(date: string) {
  return dateFormat.format(new Date(date));
}
