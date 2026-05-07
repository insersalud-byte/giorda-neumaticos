"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Calendar, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/marcas", label: "Marcas" },
  { href: "/servicios", label: "Servicios" },
  { href: "/turnos", label: "Turnos", highlight: true },
  { href: "/contacto", label: "Contacto" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const cantidad = useCart((s) => s.cantidadItems());

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="container-giorda flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Giorda Neumáticos — inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-semibold transition",
                item.highlight
                  ? "bg-giorda-yellow text-giorda-blue-900 hover:bg-giorda-yellow-300"
                  : "text-giorda-blue-700 hover:bg-giorda-blue-50 hover:text-giorda-blue"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/carrito"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-giorda-blue-700 hover:bg-giorda-blue-50"
            aria-label="Carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {cantidad > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-giorda-yellow px-1 text-[11px] font-bold text-giorda-blue-900">
                {cantidad}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-giorda-blue-700 hover:bg-giorda-blue-50"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="container-giorda flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-semibold",
                  item.highlight
                    ? "bg-giorda-yellow text-giorda-blue-900"
                    : "text-giorda-blue-700 hover:bg-giorda-blue-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/turnos"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-giorda-blue px-4 py-3 text-sm font-semibold text-white"
            >
              <Calendar className="h-4 w-4" /> Sacar turno online
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
