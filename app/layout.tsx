import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SurInnovacion | Inteligencia Artificial, automatizacion e innovacion",
    template: "%s | SurInnovacion"
  },
  description:
    "SurInnovacion crea soluciones con inteligencia artificial, automatizacion, sitios web y asesoria tecnologica para empresas y proyectos desde Puerto Montt, Chile.",
  metadataBase: new URL("https://surinnovacion.cl"),
  alternates: {
    canonical: "/"
  },
  keywords: [
    "SurInnovacion",
    "inteligencia artificial Chile",
    "automatizacion con IA",
    "asesoria inteligencia artificial",
    "Puerto Montt",
    "sitios web con IA",
    "consultoria tecnologica"
  ],
  authors: [{ name: "Marco Iglesias" }],
  creator: "SurInnovacion",
  publisher: "SurInnovacion",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "SurInnovacion | Inteligencia Artificial, automatizacion e innovacion",
    description:
      "Soluciones con inteligencia artificial, automatizacion, sitios web y asesoria tecnologica para empresas y proyectos desde Puerto Montt, Chile.",
    url: "https://surinnovacion.cl",
    siteName: "SurInnovacion",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "/brand/isotipo2.png",
        width: 500,
        height: 500,
        alt: "Isotipo de SurInnovacion"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SurInnovacion | Inteligencia Artificial, automatizacion e innovacion",
    description:
      "Soluciones con inteligencia artificial, automatizacion, sitios web y asesoria tecnologica para empresas y proyectos desde Puerto Montt, Chile.",
    images: ["/brand/isotipo2.png"]
  },
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/favicon.png",
        type: "image/png"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
