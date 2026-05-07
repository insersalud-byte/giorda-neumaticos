import { api } from "@/lib/api";
import { TurnosFlujo } from "./TurnosFlujo";

export const metadata = {
  title: "Sacar turno online — Giorda Neumáticos Córdoba",
  description: "Reservá tu turno para colocación de neumáticos o revisión de tren delantero. Confirmación inmediata por WhatsApp."
};

export default async function TurnosPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const sp = await searchParams;
  const servicios = await api.listarServicios();
  const servicioInicial = sp.servicio;
  return (
    <div className="container-giorda py-8 md:py-12">
      <header className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">Sacar turno online</h1>
        <p className="mt-2 text-gray-600">
          Tres pasos cortos. Te confirmamos por WhatsApp en el momento.
        </p>
      </header>

      <TurnosFlujo servicios={servicios} servicioInicial={servicioInicial} />
    </div>
  );
}
