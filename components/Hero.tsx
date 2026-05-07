import Image from "next/image";
import { BuscadorTriple } from "./BuscadorTriple";
import { ShieldCheck, Calendar, CreditCard } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-giorda-blue text-white">
      {/* Pattern decorativo */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-giorda-yellow/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-giorda-yellow/10 blur-3xl" />

      <div className="container-giorda relative grid gap-10 py-12 md:grid-cols-2 md:py-20">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-giorda-yellow px-3 py-1 text-xs font-bold uppercase tracking-wider text-giorda-blue-900">
            <Image src="/logo.png" alt="" width={20} height={20} className="object-contain" />
            Gomería en Córdoba
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl">
            Neumáticos y servicios <span className="text-giorda-yellow">en minutos.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-giorda-blue-100">
            Comprá online con Mercado Pago, retirá en el local o sacá turno para colocación y mecánica ligera.
            Atendemos en Córdoba Capital.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            <Feature icon={<Calendar className="h-5 w-5" />} text="Turno online en 3 pasos" />
            <Feature icon={<CreditCard className="h-5 w-5" />} text="Hasta 6 cuotas sin interés" />
            <Feature icon={<ShieldCheck className="h-5 w-5" />} text="Colocación con garantía" />
          </ul>
        </div>

        <div className="self-center">
          <BuscadorTriple />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-2 text-sm text-giorda-blue-100">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-giorda-yellow text-giorda-blue-900">{icon}</span>
      <span className="font-semibold leading-tight">{text}</span>
    </li>
  );
}
