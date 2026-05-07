"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatARS } from "@/lib/utils";

export default function CarritoPage() {
  const { items, total, actualizarCantidad, quitar, vaciar } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-giorda py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-giorda-blue-200" />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-giorda-blue">Tu carrito está vacío</h1>
        <p className="mt-2 text-gray-600">Buscá tu medida y empezá a llenarlo.</p>
        <Link href="/catalogo" className="mt-6 inline-flex btn-primary">Ver catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container-giorda py-8 md:py-12">
      <h1 className="font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">Tu carrito</h1>
      <p className="mt-1 text-gray-600">{items.length} {items.length === 1 ? "producto" : "productos"}</p>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="card flex items-center gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-giorda-blue-50">
                <svg viewBox="0 0 60 60" className="h-14 w-14"><circle cx="30" cy="30" r="26" fill="#0B3D91" /><circle cx="30" cy="30" r="18" fill="#1a1a1a" /><circle cx="30" cy="30" r="9" fill="#666" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-giorda-yellow-500">{it.marca}</p>
                <Link href={`/producto/${it.id}`} className="font-display font-bold text-giorda-blue hover:text-giorda-blue-600">{it.modelo}</Link>
                <p className="text-sm text-gray-600">{it.medidaTexto}</p>
                <p className="mt-1 font-display font-extrabold text-giorda-blue">{formatARS(it.precioUnitario)}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="inline-flex items-center rounded-lg border border-giorda-blue">
                  <button onClick={() => actualizarCantidad(it.id, it.cantidad - 1)} className="grid h-8 w-8 place-items-center text-giorda-blue hover:bg-giorda-blue-50" aria-label="Restar"><Minus className="h-3 w-3" /></button>
                  <span className="grid h-8 w-8 place-items-center text-sm font-bold text-giorda-blue">{it.cantidad}</span>
                  <button onClick={() => actualizarCantidad(it.id, it.cantidad + 1)} className="grid h-8 w-8 place-items-center text-giorda-blue hover:bg-giorda-blue-50" aria-label="Sumar"><Plus className="h-3 w-3" /></button>
                </div>
                <button onClick={() => quitar(it.id)} className="text-xs text-gray-500 hover:text-red-600 inline-flex items-center gap-1"><Trash2 className="h-3 w-3" /> Quitar</button>
              </div>
            </li>
          ))}

          <li>
            <button onClick={vaciar} className="text-sm font-semibold text-gray-500 hover:text-red-600">Vaciar carrito</button>
          </li>
        </ul>

        <aside className="self-start sticky top-20">
          <div className="card bg-giorda-blue-50/50">
            <h2 className="font-display text-lg font-bold text-giorda-blue">Resumen</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{formatARS(total())}</dd></div>
              <div className="flex justify-between text-gray-600"><dt>Envío</dt><dd>A coordinar</dd></div>
              <div className="border-t border-giorda-blue-200 pt-2 flex justify-between"><dt className="font-bold text-giorda-blue">Total contado</dt><dd className="font-display text-xl font-extrabold text-giorda-blue">{formatARS(total())}</dd></div>
            </dl>
            <Link href="/checkout" className="btn-primary mt-5 w-full">Finalizar compra <ArrowRight className="h-4 w-4" /></Link>
            <p className="mt-2 text-center text-xs text-gray-500">Pago seguro con Mercado Pago</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
