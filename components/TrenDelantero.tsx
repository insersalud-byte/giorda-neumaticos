import Link from "next/link";

const items = [
  { icon: "🔩", label: "Alineación y balanceo" },
  { icon: "🛞", label: "Estado de neumáticos" },
  { icon: "⚙️", label: "Rótulas y terminales" },
  { icon: "🔧", label: "Amortiguadores" },
];

export function TrenDelantero() {
  return (
    <section className="relative overflow-hidden bg-giorda-blue-500 py-14 md:py-20">
      {/* fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-giorda-yellow-400" />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-giorda-yellow-400" />
      </div>

      <div className="container-giorda relative">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
          {/* texto */}
          <div className="max-w-xl text-center md:text-left">
            <span className="mb-3 inline-block rounded-full bg-giorda-yellow-400 px-4 py-1 text-sm font-bold uppercase tracking-wide text-giorda-blue-500">
              Tren delantero
            </span>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Viajá seguro.
              <br />
              <span className="text-giorda-yellow-400">Cuidá tus neumáticos.</span>
            </h2>
            <p className="mb-6 text-lg text-blue-100">
              Una revisión completa del tren delantero puede duplicar la vida útil de tus cubiertas
              y evitarte gastos inesperados. En Giorda la hacemos{" "}
              <strong className="text-giorda-yellow-400">sin cargo</strong> cuando venís a comprar o
              colocar neumáticos.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/turnos"
                className="inline-flex items-center justify-center rounded-xl bg-giorda-yellow-400 px-8 py-3 text-base font-bold text-giorda-blue-500 transition hover:bg-yellow-300"
              >
                Sacar turno gratis →
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-8 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>

          {/* tarjeta destacada */}
          <div className="w-full max-w-xs shrink-0">
            <div className="rounded-2xl bg-white p-8 text-center shadow-2xl">
              <div className="mb-2 text-6xl">🛞</div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-400">
                Revisión
              </p>
              <p className="mb-4 text-2xl font-extrabold text-giorda-blue-500">Tren delantero</p>
              <div className="mb-4 rounded-xl bg-green-50 py-3">
                <p className="text-3xl font-black text-green-600">SIN CARGO</p>
                <p className="text-xs text-green-700">con compra o colocación de neumáticos</p>
              </div>
              <p className="text-xs text-gray-400">
                Incluye diagnóstico y presupuesto sin compromiso
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
