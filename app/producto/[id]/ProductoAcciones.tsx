"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import type { Neumatico } from "@/lib/types";
import { useCart } from "@/lib/cart-store";

export function ProductoAcciones({ n }: { n: Neumatico }) {
  const router = useRouter();
  const agregar = useCart((s) => s.agregar);
  const [cantidad, setCantidad] = useState(1);

  const onAgregar = () => {
    agregar(n, cantidad);
    router.push("/carrito");
  };

  if (n.stock <= 0) {
    return (
      <p className="mt-6 rounded-lg bg-gray-100 px-4 py-3 text-center font-semibold text-gray-700">
        Sin stock por el momento. Consultanos por WhatsApp para reservar.
      </p>
    );
  }

  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="inline-flex items-center rounded-lg border-2 border-giorda-blue">
        <button
          type="button"
          onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          className="grid h-12 w-12 place-items-center text-giorda-blue hover:bg-giorda-blue-50"
          aria-label="Restar"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="grid h-12 w-12 place-items-center font-bold text-giorda-blue">{cantidad}</span>
        <button
          type="button"
          onClick={() => setCantidad((c) => Math.min(n.stock, c + 1))}
          className="grid h-12 w-12 place-items-center text-giorda-blue hover:bg-giorda-blue-50"
          aria-label="Sumar"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button onClick={onAgregar} className="btn-primary flex-1 h-12">
        <ShoppingCart className="h-5 w-5" /> Agregar al carrito
      </button>
    </div>
  );
}
