import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// next/font auto-hospeda la fuente: sin peticion a Google en runtime y sin
// salto de maquetacion al cargar.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins"
});

const siteTitle = "Consultoría en innovación empresarial | SurInnovacion";
const siteDescription =
  "Evaluamos tus procesos y recursos técnicos y administrativos. Asesoría en innovación, automatización y soluciones digitales desde Puerto Montt para Chile.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | SurInnovacion"
  },
  description: siteDescription,
  metadataBase: new URL("https://surinnovacion.cl"),
  applicationName: "SurInnovacion",
  alternates: {
    canonical: "/"
  },
  category: "technology",
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
    title: siteTitle,
    description: siteDescription,
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
    title: siteTitle,
    description: siteDescription,
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
    <html lang="es-CL" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
