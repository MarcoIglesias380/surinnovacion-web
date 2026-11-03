import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Asesoria en Inteligencia Artificial para empresas | SurInnovacion",
    template: "%s | SurInnovacion"
  },
  description:
    "Asesoria gratuita de 30 minutos para implementar inteligencia artificial y automatizacion en tu empresa. Marco Iglesias, Master en IA, desde Puerto Montt, Chile.",
  metadataBase: new URL("https://surinnovacion.cl"),
  applicationName: "SurInnovacion",
  alternates: {
    canonical: "/"
  },
  category: "technology",
  keywords: [
    "SurInnovacion",
    "asesoria en inteligencia artificial para empresas",
    "implementar IA en mi empresa",
    "consultoria IA pymes Chile",
    "inteligencia artificial Puerto Montt",
    "automatizacion de procesos Puerto Montt",
    "Marco Iglesias inteligencia artificial",
    "divulgador de IA Chile",
    "inteligencia artificial Chile",
    "consultoria tecnologica Los Lagos"
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
    title: "Asesoria en Inteligencia Artificial para empresas | SurInnovacion",
    description:
      "Asesoria gratuita de 30 minutos para implementar inteligencia artificial y automatizacion en tu empresa. Marco Iglesias, Master en IA, desde Puerto Montt, Chile.",
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
    title: "Asesoria en Inteligencia Artificial para empresas | SurInnovacion",
    description:
      "Asesoria gratuita de 30 minutos para implementar inteligencia artificial y automatizacion en tu empresa. Marco Iglesias, Master en IA, desde Puerto Montt, Chile.",
    images: ["/brand/isotipo2.png"]
  },
  manifest: "/manifest.webmanifest",
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
