import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Giorda Neumáticos — Córdoba | Venta, colocación y turnos online",
  description:
    "Neumáticos y servicios mecánicos en Córdoba. Buscá tu medida, comprá online con Mercado Pago y sacá tu turno en minutos. Marcas: Sunny, GT Radial, Giti, Wanli, Champiro, Maxmiler, Xbri y Ovation.",
  keywords: [
    "neumáticos Córdoba",
    "gomería Córdoba",
    "cubiertas Córdoba",
    "alineación y balanceo",
    "tren delantero",
    "Sunny",
    "GT Radial"
  ],
  openGraph: {
    title: "Giorda Neumáticos — Córdoba",
    description: "Neumáticos, servicios y turnos online en Córdoba.",
    locale: "es_AR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
