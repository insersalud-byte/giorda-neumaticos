"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, MessageCircle } from "lucide-react";
import type { Neumatico } from "@/lib/types";
import { formatARS, whatsappLink } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

export function ProductCard({ n }: { n: Neumatico }) {
  const agregar = useCart((s) => s.agregar);
  const precioFinal = n.oferta?.activa ? n.oferta.precioOferta : n.precioContado;
  const cuota = Math.round(n.precioBase / n.cuotasSinInteres);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-giorda">
      <Link href={`/producto/${n.id}`} className="relative block aspect-square bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {n.imagenUrl ? (
          <Image
            src={n.imagenUrl}
            alt={`${n.marca} ${n.modelo} ${n.medidaTexto}`}
            fill
            className="object-contain p-4 transition group-hover:scale-105"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        ) : (
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full p-6">
            <circle cx="100" cy="100" r="90" fill="#0B3D91" />
            <circle cx="100" cy="100" r="70" fill="#1a1a1a" />
            <circle cx="100" cy="100" r="50" fill="#3a3a3a" />
            <circle cx="100" cy="100" r="30" fill="#5a5a5a" />
            {[...Array(16)].map((_, i) => (
              <rect key={i} x="97" y="22" width="6" height="20" fill="#666" transform={`rotate(${(i * 360) / 16} 100 100)`} />
            ))}
          </svg>
        )}
        {n.oferta?.activa && (
          <span className="absolute left-3 top-3 rounded-full bg-giorda-yellow px-3 py-1 text-xs font-bold text-giorda-blue-900">
            -{n.oferta.porcentajeDescuento}%
          </span>
        )}
        {n.stock <= 5 && n.stock > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
            ¡Quedan {n.stock}!
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-giorda-yellow-500">{n.marca}</p>
        <h3 className="mt-0.5 font-display text-base font-bold leading-tight text-giorda-blue">
          <Link href={`/producto/${n.id}`} className="hover:text-giorda-blue-600">
            {n.modelo}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-gray-700">{n.medidaTexto}</p>

        <div className="mt-3">
          {n.oferta?.activa && (
            <p className="text-xs text-gray-400 line-through">{formatARS(n.precioContado)}</p>
          )}
          <p className="font-display text-2xl font-extrabold text-giorda-blue">{formatARS(precioFinal)}</p>
          <p className="text-xs text-gray-600">o {n.cuotasSinInteres}x de <strong>{formatARS(cuota)}</strong> sin interés</p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => agregar(n)}
            disabled={n.stock <= 0}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-giorda-yellow px-3 py-2 text-sm font-semibold text-giorda-blue-900 transition hover:bg-giorda-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" /> Agregar
          </button>
          <a
            href={whatsappLink(`Hola Giorda, consulto por ${n.marca} ${n.modelo} ${n.medidaTexto}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-10 w-10 place-items-center rounded-lg border border-gray-300 text-gray-600 transition hover:border-[#25D366] hover:text-[#25D366]"
            aria-label="Consultar por WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
