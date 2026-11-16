import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { articles, formatArticleDate } from "@/content/blog";

export const metadata: Metadata = {
  title: "Noticias de IA e innovación para empresas",
  description: "Análisis de modelos de frontera, adopción empresarial e infraestructura de inteligencia artificial, con datos y fuentes originales.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Noticias de IA e innovación para empresas", url: "/blog" }
};

export default function BlogPage() {
  return (
    <main className="site-shell min-h-screen bg-void text-frost">
      <SiteHeader />
      <div className="doc-page">
        <header className="doc-hero">
          <h1>Noticias de IA e innovación para empresas</h1>
          <p className="doc-lede">
            Qué pasó en 2026, qué datos lo respaldan y qué merece seguimiento en 2027.
            Cada análisis enlaza los anuncios o informes originales.
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
