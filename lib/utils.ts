import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatARS(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Precio contado = precio base × 1.30 (lógica de Giorda).
 * Recibe el precio base y devuelve el precio contado redondeado.
 */
export function calcularPrecioContado(precioBase: number): number {
  return Math.round(precioBase * 1.30);
}

/**
 * Calcula valor de cuota (sin interés).
 */
export function calcularCuota(precioBase: number, cuotas: number): number {
  return Math.round(precioBase / cuotas);
}

/**
 * Genera link de WhatsApp con mensaje predefinido.
 */
export function whatsappLink(mensaje: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5493512293025";
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
