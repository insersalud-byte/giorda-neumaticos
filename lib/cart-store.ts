"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Neumatico } from "./types";

export interface CartItem {
  id: string;
  marca: string;
  modelo: string;
  medidaTexto: string;
  precioUnitario: number;
  cantidad: number;
  imagenUrl?: string;
}

interface CartState {
  items: CartItem[];
  agregar: (n: Neumatico, cantidad?: number) => void;
  quitar: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  vaciar: () => void;
  total: () => number;
  cantidadItems: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      agregar: (n, cantidad = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === n.id);
          const precio = n.oferta?.activa ? n.oferta.precioOferta : n.precioContado;
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === n.id ? { ...i, cantidad: i.cantidad + cantidad } : i
              )
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: n.id,
                marca: n.marca,
                modelo: n.modelo,
                medidaTexto: n.medidaTexto,
                precioUnitario: precio,
                cantidad,
                imagenUrl: n.imagenUrl
              }
            ]
          };
        }),
      quitar: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      actualizarCantidad: (id, cantidad) =>
        set((s) => ({
          items:
            cantidad <= 0
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, cantidad } : i))
        })),
      vaciar: () => set({ items: [] }),
      total: () => get().items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0),
      cantidadItems: () => get().items.reduce((acc, i) => acc + i.cantidad, 0)
    }),
    { name: "giorda-cart-v1" }
  )
);
