import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { articles, formatArticleDate } from "@/content/blog";
import { ID_ORGANIZACION, IMAGEN_SOCIAL, organizationSchema, RUTA_BLOG, SITIO } from "@/content/schema";

const blogTitle = "Inteligencia artificial rumbo a 2027";
const blogDescription =
  "Modelos de lenguaje, aplicaciones reales y preguntas abiertas sobre la inteligencia artificial general (AGI) y la superinteligencia.";
const blogUrl = `${SITIO}/blog`;

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${blogTitle} | SurInnovacion`,
    description: blogDescription,
    url: blogUrl,
    type: "website",
    siteName: "SurInnovacion",
    locale: "es_CL",
    images: [IMAGEN_SOCIAL]
  },
  twitter: {
    card: "summary_large_image",
    title: `${blogTitle} | SurInnovacion`,
    description: blogDescription,
    images: [IMAGEN_SOCIAL.url]
  }
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${blogUrl}#blog`,
  name: blogTitle,
  description: blogDescription,
  url: blogUrl,
  inLanguage: "es-CL",
  publisher: { "@id": ID_ORGANIZACION },
  blogPost: articles.map((article) => ({
    "@type": "BlogPosting",
    "@id": `${SITIO}/blog/${article.slug}#articulo`,
    url: `${SITIO}/blog/${article.slug}`,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: "es-CL",
    author: { "@id": ID_ORGANIZACION },
    publisher: { "@id": ID_ORGANIZACION }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITIO },
    { "@type": "ListItem", position: 2, name: RUTA_BLOG, item: blogUrl }
  ]
};

export default function BlogPage() {
  return (
    <main className="site-shell commercial-page min-h-screen bg-void text-frost">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, blogSchema, breadcrumbSchema]).replace(/</g, "\\u003c")
      }} />
      <SiteHeader />
      <div className="doc-page">
        <header className="doc-hero">
          <nav className="doc-breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{RUTA_BLOG}</span>
          </nav>
          <h1>{blogTitle}</h1>
          <p className="doc-lede">
            Explora cómo evolucionan los modelos de lenguaje y qué usos ya podemos observar. De cara a 2027, seguimos las preguntas abiertas sobre la inteligencia artificial general (AGI) y la superinteligencia con datos y fuentes originales.
          </p>
        </header>
        {articles.map((article) => (
          <article className="doc-section" key={article.slug}>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
      <SiteFooter />
    </main>
  );
}
