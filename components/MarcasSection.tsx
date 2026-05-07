import Link from "next/link";
import { MARCAS_INFO } from "@/lib/mock-data";

export function MarcasSection() {
  return (
    <section className="bg-giorda-blue-50 py-16">
      <div className="container-giorda">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-giorda-yellow-500">Marcas</span>
          <h2 className="mt-1 font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">
            Trabajamos con marcas confiables del mundo
          </h2>
          <p className="mt-2 text-gray-600">
            Elegimos marcas con la mejor relación calidad/precio para que cuides tu auto sin pagar de más.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {MARCAS_INFO.map((m) => (
            <Link
              key={m.nombre}
              href={`/catalogo?marca=${encodeURIComponent(m.nombre)}`}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition hover:border-giorda-blue hover:shadow-giorda"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-extrabold text-giorda-blue">{m.nombre}</h3>
                <span className="ml-auto rounded-full bg-giorda-yellow/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-giorda-blue-900">{m.origen}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">{m.descripcion}</p>
              <p className="mt-3 text-xs font-semibold text-giorda-blue-700 group-hover:text-giorda-blue">
                Ver neumáticos →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
