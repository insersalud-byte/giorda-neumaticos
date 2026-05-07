import Link from "next/link";
import { Wrench, Disc, Crosshair, Car, ShieldCheck, ArrowRight } from "lucide-react";
import type { Servicio } from "@/lib/types";
import { formatARS } from "@/lib/utils";

const ICONOS: Record<string, React.ComponentType<{ className?: string }>> = {
  colocacion: Wrench,
  balanceo: Disc,
  alineacion: Crosshair,
  "tren-delantero": Car,
  frenos: ShieldCheck
};

export function ServiciosGrid({ servicios }: { servicios: Servicio[] }) {
  return (
    <section className="py-16">
      <div className="container-giorda">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-giorda-yellow-500">Servicios</span>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">
            Todo lo que tu auto necesita en un solo lugar
          </h2>
          <p className="mt-2 text-gray-600">
            Sacá turno online para los servicios disponibles. Para el resto, consultá disponibilidad por WhatsApp.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s) => {
            const Icono = ICONOS[s.id] ?? Wrench;
            return (
              <article key={s.id} className="card flex flex-col">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-giorda-yellow text-giorda-blue-900">
                    <Icono className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-giorda-blue">{s.nombre}</h3>
                    <p className="mt-1 text-sm text-gray-600">{s.descripcionCorta}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    {s.sinCargo ? (
                      <>
                        <p className="text-xs uppercase tracking-wider text-gray-500">Revisión</p>
                        <p className="font-display text-2xl font-extrabold text-green-600">SIN CARGO</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs uppercase tracking-wider text-gray-500">Desde</p>
                        <p className="font-display text-2xl font-extrabold text-giorda-blue">{formatARS(s.precioDesde)}</p>
                      </>
                    )}
                  </div>
                  {s.permiteTurnoOnline ? (
                    <Link href={`/turnos?servicio=${s.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-giorda-blue hover:text-giorda-blue-600">
                      Sacar turno <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <Link href={`/contacto?servicio=${s.id}`} className="text-sm font-semibold text-giorda-blue-700 hover:text-giorda-blue">
                      Consultar
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
