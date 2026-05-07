import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Neumatico } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function DestacadosHome({ neumaticos }: { neumaticos: Neumatico[] }) {
  const destacados = neumaticos.slice(0, 8);
  return (
    <section className="py-16">
      <div className="container-giorda">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-giorda-yellow-500">Destacados</span>
            <h2 className="mt-1 font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">
              Lo más buscado en Córdoba
            </h2>
          </div>
          <Link href="/catalogo" className="hidden sm:inline-flex items-center gap-1 font-semibold text-giorda-blue hover:text-giorda-blue-600">
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destacados.map((n) => <ProductCard key={n.id} n={n} />)}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/catalogo" className="btn-secondary">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
