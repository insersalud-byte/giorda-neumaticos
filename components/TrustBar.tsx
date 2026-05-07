import { Star, MapPin, Wrench, ThumbsUp } from "lucide-react";

const STATS = [
  { icon: MapPin, value: "Córdoba", label: "Atendiendo desde el corazón de la ciudad" },
  { icon: Star, value: "4,8 / 5", label: "Reseñas de clientes verificados" },
  { icon: Wrench, value: "+10.000", label: "Neumáticos colocados con garantía" },
  { icon: ThumbsUp, value: "Mismo día", label: "Turnos confirmados al instante" }
];

export function TrustBar() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="container-giorda grid gap-6 py-8 sm:grid-cols-2 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-giorda-yellow/20 text-giorda-blue">
              <s.icon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-lg font-extrabold text-giorda-blue">{s.value}</p>
              <p className="text-xs text-gray-600 leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
