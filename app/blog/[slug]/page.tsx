import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { articles, formatArticleDate } from "@/content/blog";
import { ID_ORGANIZACION, organizationSchema, SITIO } from "@/content/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  const path = `/blog/${slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: article.title,
      description: article.description,
      publishedTime: article.date
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();

  const url = `${SITIO}/blog/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: url,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    inLanguage: "es-CL",
    author: { "@id": ID_ORGANIZACION },
    publisher: { "@id": ID_ORGANIZACION },
    citation: [...new Set(article.sections.flatMap((section) => section.sources?.map((source) => source.url) ?? []))]
  };

  return (
    <main className="site-shell min-h-screen bg-void text-frost">
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, schema]).replace(/</g, "\\u003c")
      }} />
      <SiteHeader />
      <article className="doc-page">
        <header className="doc-hero">
          <p><Link href="/blog">Noticias de IA e innovación</Link></p>
          <h1>{article.title}</h1>
          <p className="doc-lede">{article.description}</p>
          <p>SurInnovacion · <time dateTime={article.date}>{formatArticleDate(article.date)}</time></p>
        </header>
        {article.sections.map((section) => (
          <section className="doc-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.sources && (
              <ul className="doc-list" aria-label="Fuentes de esta sección">
                {section.sources.map((source) => (
                  <li key={source.url}><a href={source.url}>{source.label}</a></li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <footer className="doc-section">
          <Link href="/blog">Ver todos los artículos</Link>
        </footer>
      </article>
      <SiteFooter />
    </main>
  );
}
