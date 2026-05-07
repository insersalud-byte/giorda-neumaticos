import { api } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { CatalogoFiltros } from "./CatalogoFiltros";

export const metadata = {
  title: "Catálogo de neumáticos — Giorda Córdoba",
  description: "Buscá tu medida o tu marca. Sunny, GT Radial, Giti, Wanli, Champiro y más con cuotas sin interés."
};

export default async function CatalogoPage({
  searchParams
}: {
  searchParams: Promise<{ marca?: string; ancho?: string; perfil?: string; rodado?: string }>;
}) {
  const sp = await searchParams;
  const filtros = {
    marca: sp.marca,
    ancho: sp.ancho ? Number(sp.ancho) : undefined,
    perfil: sp.perfil ? Number(sp.perfil) : undefined,
    rodado: sp.rodado ? Number(sp.rodado) : undefined
  };

  const todos = await api.listarNeumaticos();
  const filtrados = await api.listarNeumaticos(filtros);

  const filtroActivo = Boolean(filtros.marca || filtros.ancho || filtros.perfil || filtros.rodado);

  return (
    <div className="container-giorda py-8 md:py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">Catálogo</h1>
        <p className="mt-1 text-gray-600">
          {filtroActivo
            ? `Mostrando ${filtrados.length} de ${todos.length} neumáticos`
            : `${todos.length} neumáticos disponibles`}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <aside>
          <CatalogoFiltros filtrosIniciales={filtros} />
        </aside>

        <section>
          {filtrados.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="text-lg font-semibold text-giorda-blue">No encontramos resultados con esos filtros</p>
              <p className="mt-1 text-sm text-gray-600">Probá ampliar la búsqueda o consultanos por WhatsApp.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtrados.map((n) => <ProductCard key={n.id} n={n} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
