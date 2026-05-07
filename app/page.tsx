import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServiciosGrid } from "@/components/ServiciosGrid";
import { MarcasSection } from "@/components/MarcasSection";
import { GuiaMedidas } from "@/components/GuiaMedidas";
import { DestacadosHome } from "@/components/DestacadosHome";
import { CTAFinal } from "@/components/CTAFinal";
import { TrenDelantero } from "@/components/TrenDelantero";
import { api } from "@/lib/api";

export default async function HomePage() {
  const [neumaticos, servicios] = await Promise.all([
    api.listarNeumaticos(),
    api.listarServicios()
  ]);

  return (
    <>
      <Hero />
      <TrustBar />
      <DestacadosHome neumaticos={neumaticos} />
      <TrenDelantero />
      <ServiciosGrid servicios={servicios} />
      <MarcasSection />
      <GuiaMedidas />
      <CTAFinal />
    </>
  );
}
