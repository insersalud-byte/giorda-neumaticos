import Link from "next/link";
import { MARCAS_INFO } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Marcas — Giorda Neumáticos",
  description: "Las marcas con las que trabajamos: Sunny, GT Radial, Giti, Wanli, Champiro, Maxmiler, Xbri y Ovation."
};

export default function MarcasPage() {
  return (
    <div className="container-giorda py-8 md:py-12">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold text-giorda-blue md:text-5xl">Marcas que trabajamos</h1>
        <p className="mt-2 text-gray-600">
          Elegimos marcas con la mejor relación calidad/precio del mercado. Acá te contamos qué esperar de cada una.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {MARCAS_INFO.map((m) => (
          <article key={m.nombre} className="card flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-extrabold text-giorda-blue">{m.nombre}</h2>
              <span className="rounded-full bg-giorda-yellow/30 px-2 py-1 text-xs font-bold text-giorda-blue-900">{m.origen}</span>
            </div>
            <p className="mt-3 text-gray-700">{m.descripcion}</p>
            <Link href={`/catalogo?marca=${encodeURIComponent(m.nombre)}`} className="mt-4 inline-flex items-center gap-1 font-semibold text-giorda-blue hover:text-giorda-blue-600">
              Ver neumáticos {m.nombre} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
