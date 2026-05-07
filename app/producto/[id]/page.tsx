import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, CreditCard, MessageCircle } from "lucide-react";
import { api } from "@/lib/api";
import { formatARS, whatsappLink } from "@/lib/utils";
import { ProductoAcciones } from "./ProductoAcciones";

export default async function ProductoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const n = await api.obtenerNeumatico(id);
  if (!n) notFound();

  const precioFinal = n.oferta?.activa ? n.oferta.precioOferta : n.precioContado;
  const cuota = Math.round(n.precioBase / n.cuotasSinInteres);

  return (
    <div className="container-giorda py-8 md:py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-giorda-blue">Inicio</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/catalogo" className="hover:text-giorda-blue">Catálogo</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/catalogo?marca=${encodeURIComponent(n.marca)}`} className="hover:text-giorda-blue">{n.marca}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-semibold text-giorda-blue">{n.modelo}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-giorda-blue-50 to-white">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full p-12">
            <circle cx="200" cy="200" r="180" fill="#0B3D91" />
            <circle cx="200" cy="200" r="140" fill="#1a1a1a" />
            <circle cx="200" cy="200" r="100" fill="#3a3a3a" />
            <circle cx="200" cy="200" r="60" fill="#5a5a5a" />
            {[...Array(24)].map((_, i) => (
              <rect key={i} x="195" y="40" width="10" height="30" fill="#666" transform={`rotate(${(i * 360) / 24} 200 200)`} />
            ))}
          </svg>
          {n.oferta?.activa && (
            <span className="absolute left-4 top-4 rounded-full bg-giorda-yellow px-4 py-1.5 font-bold text-giorda-blue-900">
              -{n.oferta.porcentajeDescuento}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-giorda-yellow-500">{n.marca}</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-giorda-blue md:text-4xl">{n.modelo}</h1>
          <p className="mt-2 text-lg font-semibold text-gray-700">{n.medidaTexto}</p>

          {n.stock > 0 && n.stock <= 5 && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
              ¡Quedan solo {n.stock} en stock!
            </p>
          )}

          <div className="mt-6 rounded-xl border border-giorda-blue-100 bg-giorda-blue-50/50 p-5">
            {n.oferta?.activa && (
              <p className="text-sm text-gray-500 line-through">{formatARS(n.precioContado)}</p>
            )}
            <p className="font-display text-4xl font-extrabold text-giorda-blue">{formatARS(precioFinal)}</p>
            <p className="mt-1 text-sm text-gray-700">
              <strong>Precio contado</strong> (efectivo o transferencia)
            </p>
            <div className="mt-3 border-t border-giorda-blue-100 pt-3">
              <p className="text-sm text-gray-700">
                o <strong>{n.cuotasSinInteres}x de {formatARS(cuota)}</strong> sin interés con tarjeta de crédito
              </p>
            </div>
          </div>

          <ProductoAcciones n={n} />

          {/* Specs */}
          <dl className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm">
            <Spec label="Medida" value={n.medidaTexto} />
            <Spec label="Marca" value={n.marca} />
            <Spec label="Modelo" value={n.modelo} />
            <Spec label="Tipo de uso" value={n.tipoUso.join(", ")} />
            {n.indiceCarga && <Spec label="Índice de carga" value={n.indiceCarga} />}
            {n.indiceVelocidad && <Spec label="Índice de velocidad" value={n.indiceVelocidad} />}
            <Spec label="SKU" value={n.sku} />
            <Spec label="Stock" value={n.stock > 0 ? `${n.stock} unidades` : "Sin stock"} />
          </dl>

          {/* Beneficios */}
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <Beneficio icon={<ShieldCheck className="h-5 w-5" />} text="Colocación con garantía" />
            <Beneficio icon={<Truck className="h-5 w-5" />} text="Retiro en local o envío" />
            <Beneficio icon={<CreditCard className="h-5 w-5" />} text="Cuotas sin interés" />
          </ul>

          <a
            href={whatsappLink(`Hola Giorda, consulto por ${n.marca} ${n.modelo} ${n.medidaTexto}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:underline"
          >
            <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-gray-500">{label}</dt>
      <dd className="font-semibold text-giorda-blue">{value}</dd>
    </div>
  );
}

function Beneficio({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-giorda-blue-700">
      <span className="text-giorda-blue">{icon}</span>
      <span className="font-medium">{text}</span>
    </li>
  );
}
