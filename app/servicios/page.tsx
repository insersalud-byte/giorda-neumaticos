import { api } from "@/lib/api";
import { ServiciosGrid } from "@/components/ServiciosGrid";
import { CTAFinal } from "@/components/CTAFinal";

export const metadata = {
  title: "Servicios — Giorda Neumáticos Córdoba",
  description: "Colocación, balanceo, alineación 3D, tren delantero y revisión de frenos. Sacá tu turno online."
};

export default async function ServiciosPage() {
  const servicios = await api.listarServicios();
  return (
    <>
      <header className="bg-giorda-blue text-white">
        <div className="container-giorda py-12">
          <h1 className="font-display text-4xl font-extrabold md:text-5xl">Nuestros servicios</h1>
          <p className="mt-2 max-w-2xl text-giorda-blue-100">
            Trabajos prolijos, máquinas calibradas y precios claros. Sacá turno online o consultanos por WhatsApp.
          </p>
        </div>
      </header>
      <ServiciosGrid servicios={servicios} />
      <CTAFinal />
    </>
  );
}
