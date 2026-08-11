import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SurInnovacion | IA, Innovacion y Futuro",
  description:
    "SurInnovacion integra inteligencia artificial, automatizacion y tecnologia aplicada para transformar negocios desde el sur de Chile.",
  metadataBase: new URL("https://surinnovacion.cl")
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
