import Image from "next/image";

const PARTES = [
  { etiqueta: "185", titulo: "Ancho (mm)", desc: "Distancia entre los flancos del neumático medida en milímetros." },
  { etiqueta: "65", titulo: "Perfil (%)", desc: "Altura del flanco como porcentaje del ancho." },
  { etiqueta: "R15", titulo: "Rodado (\")", desc: "Diámetro de la llanta donde calza el neumático, en pulgadas." },
  { etiqueta: "88H", titulo: "Carga y velocidad", desc: "Índices de carga máxima (88 = 560 kg) y velocidad máxima (H = 210 km/h)." }
];

export function GuiaMedidas() {
  return (
    <section id="guia-medidas" className="py-16">
      <div className="container-giorda">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="Giorda Neumáticos" width={40} height={40} className="object-contain" />
              <span className="text-xs font-bold uppercase tracking-wider text-giorda-yellow-500">¿No sé mi medida?</span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-giorda-blue md:text-4xl">
              Te enseño a leer el costado de tu neumático
            </h2>
            <p className="mt-3 text-gray-600">
              Mirá el flanco del neumático actual de tu auto. Vas a ver una secuencia como
              {" "}<strong className="text-giorda-blue">185/65 R15 88H</strong>. Cada número significa algo:
            </p>

            <ul className="mt-6 space-y-3">
              {PARTES.map((p) => (
                <li key={p.etiqueta} className="flex items-start gap-3">
                  <span className="grid h-10 min-w-12 place-items-center rounded-md bg-giorda-blue px-2 font-display text-sm font-extrabold text-white">
                    {p.etiqueta}
                  </span>
                  <div>
                    <p className="font-bold text-giorda-blue">{p.titulo}</p>
                    <p className="text-sm text-gray-600">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-giorda-yellow/30 blur-3xl" />
            <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl bg-gradient-to-br from-giorda-blue-50 to-giorda-yellow/30 p-6">
              {/* Ilustración SVG del costado de un neumático */}
              <svg viewBox="0 0 400 400" className="h-full w-full">
                <circle cx="200" cy="200" r="180" fill="#0B3D91" />
                <circle cx="200" cy="200" r="140" fill="#0a0a0a" />
                <circle cx="200" cy="200" r="100" fill="#222" />
                <circle cx="200" cy="200" r="70" fill="#888" />
                <circle cx="200" cy="200" r="40" fill="#444" />
                {/* Labels */}
                <g fontFamily="Inter, sans-serif" fontWeight="800" fontSize="16" fill="#FFCB05">
                  <text x="200" y="35" textAnchor="middle">185 / 65 R15 88H</text>
                </g>
                <g fontFamily="Inter, sans-serif" fontSize="11" fill="white">
                  <text x="200" y="60" textAnchor="middle" fill="#FFCB05" fontWeight="600">↑ medida en el flanco</text>
                </g>
                {/* Tread pattern */}
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <rect
                      key={i}
                      x="195"
                      y="60"
                      width="10"
                      height="30"
                      fill="#555"
                      transform={`rotate(${angle} 200 200)`}
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
