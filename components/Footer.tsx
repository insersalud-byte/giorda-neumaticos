import Link from "next/link";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-giorda-blue-900 text-white">
      <div className="container-giorda grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Logo className="[&_span:first-child]:text-white [&_span:last-child]:text-giorda-yellow" />
          <p className="mt-4 text-sm text-giorda-blue-100">
            Neumáticos y servicios mecánicos en Córdoba. Compra online, retirá en local
            o sacá tu turno en minutos.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-giorda-yellow">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/catalogo" className="hover:text-giorda-yellow">Catálogo</Link></li>
            <li><Link href="/servicios" className="hover:text-giorda-yellow">Servicios</Link></li>
            <li><Link href="/turnos" className="hover:text-giorda-yellow">Turnos</Link></li>
            <li><Link href="/marcas" className="hover:text-giorda-yellow">Marcas</Link></li>
            <li><Link href="/contacto" className="hover:text-giorda-yellow">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-giorda-yellow">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Caraffa 2154, Córdoba Capital</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> +54 9 351 235 0349</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> contacto@giordaneumaticos.com.ar</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" /> Lun a Sáb 8:30 a 13:00 / 16:00 a 20:00</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-giorda-yellow">Pagos</h3>
          <p className="mt-4 text-sm text-giorda-blue-100">
            Aceptamos Mercado Pago, transferencia bancaria, efectivo, débito y crédito en cuotas sin interés.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["MP", "Visa", "Master", "Amex", "Naranja"].map((m) => (
              <span key={m} className="rounded bg-white/10 px-2 py-1 text-xs font-semibold">{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-giorda flex flex-col items-center justify-between gap-2 py-4 text-xs text-giorda-blue-200 md:flex-row">
          <p>© {new Date().getFullYear()} Giorda Neumáticos — Córdoba, Argentina</p>
          <p>Hecho con cariño · 🐶</p>
        </div>
      </div>
    </footer>
  );
}
