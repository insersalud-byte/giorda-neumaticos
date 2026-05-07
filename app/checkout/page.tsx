"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatARS, whatsappLink } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, vaciar } = useCart();
  const [metodo, setMetodo] = useState<"mercadopago" | "transferencia">("mercadopago");
  const [modoEntrega, setModoEntrega] = useState<"retiro" | "envio">("retiro");
  const [datos, setDatos] = useState({
    nombre: "", telefono: "", email: "", dni: "",
    direccion: "", localidad: "", cp: ""
  });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="container-giorda py-16 text-center">
        <p>Tu carrito está vacío.</p>
        <a href="/catalogo" className="btn-primary mt-4 inline-flex">Ver catálogo</a>
      </div>
    );
  }

  const set = (k: keyof typeof datos) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDatos((p) => ({ ...p, [k]: e.target.value }));

  const valido = datos.nombre.trim() && datos.telefono.trim() && datos.email.trim() && (modoEntrega === "retiro" || datos.direccion.trim());

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ neumaticoId: i.id, cantidad: i.cantidad, precioUnitario: i.precioUnitario, titulo: `${i.marca} ${i.modelo} ${i.medidaTexto}` })),
          total: total(),
          cliente: datos,
          envio: { modo: modoEntrega, direccion: datos.direccion, localidad: datos.localidad, cp: datos.cp },
          metodo
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error al procesar la orden");

      if (metodo === "mercadopago" && data.initPoint) {
        // Redirige al checkout de Mercado Pago
        window.location.href = data.initPoint;
      } else {
        // Transferencia: muestra instrucciones (acá se podría redirigir a /gracias)
        vaciar();
        router.push(`/gracias?orden=${encodeURIComponent(data.id)}&metodo=${metodo}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container-giorda py-8 md:py-12">
      <h1 className="font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">Finalizar compra</h1>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Datos */}
          <section className="card">
            <h2 className="font-display text-lg font-bold text-giorda-blue">Tus datos</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo *"><input className="input-base" required value={datos.nombre} onChange={set("nombre")} /></Field>
              <Field label="DNI"><input className="input-base" value={datos.dni} onChange={set("dni")} inputMode="numeric" /></Field>
              <Field label="Teléfono *"><input className="input-base" required value={datos.telefono} onChange={set("telefono")} inputMode="tel" /></Field>
              <Field label="Email *"><input className="input-base" required type="email" value={datos.email} onChange={set("email")} /></Field>
            </div>
          </section>

          {/* Entrega */}
          <section className="card">
            <h2 className="font-display text-lg font-bold text-giorda-blue">Entrega</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <RadioCard active={modoEntrega === "retiro"} onClick={() => setModoEntrega("retiro")} title="Retiro en local" desc="Sin costo · Lun a Sáb 8:30 a 13:00 y 16:00 a 20:00" />
              <RadioCard active={modoEntrega === "envio"} onClick={() => setModoEntrega("envio")} title="Envío a domicilio" desc="Coordinamos costo y plazo por WhatsApp" />
            </div>
            {modoEntrega === "envio" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Dirección *"><input className="input-base" required value={datos.direccion} onChange={set("direccion")} /></Field>
                <Field label="Localidad"><input className="input-base" value={datos.localidad} onChange={set("localidad")} /></Field>
                <Field label="Código postal"><input className="input-base" value={datos.cp} onChange={set("cp")} inputMode="numeric" /></Field>
              </div>
            )}
          </section>

          {/* Pago */}
          <section className="card">
            <h2 className="font-display text-lg font-bold text-giorda-blue">Método de pago</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <RadioCard active={metodo === "mercadopago"} onClick={() => setMetodo("mercadopago")} title="Mercado Pago" desc="Tarjeta crédito/débito, dinero en cuenta o efectivo (Pago Fácil/Rapipago)" badge="Recomendado" />
              <RadioCard active={metodo === "transferencia"} onClick={() => setMetodo("transferencia")} title="Transferencia bancaria" desc="Te enviamos los datos por WhatsApp" />
            </div>
          </section>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
              <a href={whatsappLink("Hola Giorda, tuve un error al pagar.")} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1 font-semibold underline">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          )}
        </div>

        <aside className="self-start sticky top-20">
          <div className="card bg-giorda-blue-50/50">
            <h2 className="font-display text-base font-bold text-giorda-blue">Resumen</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {items.map((it) => (
                <li key={it.id} className="flex justify-between gap-2">
                  <span className="truncate"><strong>{it.cantidad}×</strong> {it.marca} {it.modelo}</span>
                  <span>{formatARS(it.precioUnitario * it.cantidad)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-giorda-blue-200 pt-3 flex justify-between">
              <span className="font-bold text-giorda-blue">Total</span>
              <span className="font-display text-xl font-extrabold text-giorda-blue">{formatARS(total())}</span>
            </div>

            <button type="submit" disabled={!valido || enviando} className="btn-primary mt-5 w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {enviando ? <><Loader2 className="h-4 w-4 animate-spin" /> Procesando...</> : <>Pagar ahora</>}
            </button>
            <p className="mt-3 inline-flex items-center justify-center gap-1 w-full text-center text-xs text-gray-500">
              <ShieldCheck className="h-3 w-3" /> Pago seguro encriptado
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-giorda-blue-700">{label}</span>
      {children}
    </label>
  );
}

function RadioCard({ active, onClick, title, desc, badge }: { active: boolean; onClick: () => void; title: string; desc: string; badge?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border-2 p-4 text-left transition ${active ? "border-giorda-blue bg-giorda-blue-50" : "border-gray-200 hover:border-giorda-blue/50"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-bold text-giorda-blue">{title}</p>
        {badge && <span className="rounded-full bg-giorda-yellow px-2 py-0.5 text-[10px] font-bold text-giorda-blue-900">{badge}</span>}
      </div>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </button>
  );
}
