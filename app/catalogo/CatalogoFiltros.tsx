"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";

const ANCHOS = [155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265];
const PERFILES = [40, 45, 50, 55, 60, 65, 70, 75, 80];
const RODADOS = [13, 14, 15, 16, 17, 18, 19];
const MARCAS = ["Sunny", "GT Radial", "Giti", "Wanli", "Champiro", "Maxmiler", "Xbri", "Ovation"];

interface Filtros {
  marca?: string;
  ancho?: number;
  perfil?: number;
  rodado?: number;
}

export function CatalogoFiltros({ filtrosIniciales }: { filtrosIniciales: Filtros }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);

  const [marca, setMarca] = useState(filtrosIniciales.marca ?? "");
  const [ancho, setAncho] = useState(filtrosIniciales.ancho ? String(filtrosIniciales.ancho) : "");
  const [perfil, setPerfil] = useState(filtrosIniciales.perfil ? String(filtrosIniciales.perfil) : "");
  const [rodado, setRodado] = useState(filtrosIniciales.rodado ? String(filtrosIniciales.rodado) : "");

  useEffect(() => {
    setMarca(sp.get("marca") ?? "");
    setAncho(sp.get("ancho") ?? "");
    setPerfil(sp.get("perfil") ?? "");
    setRodado(sp.get("rodado") ?? "");
  }, [sp]);

  const aplicar = () => {
    const params = new URLSearchParams();
    if (marca) params.set("marca", marca);
    if (ancho) params.set("ancho", ancho);
    if (perfil) params.set("perfil", perfil);
    if (rodado) params.set("rodado", rodado);
    router.push(`/catalogo?${params.toString()}`);
    setOpen(false);
  };

  const limpiar = () => {
    setMarca(""); setAncho(""); setPerfil(""); setRodado("");
    router.push("/catalogo");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex w-full items-center justify-center gap-2 rounded-lg border-2 border-giorda-blue px-4 py-2 font-semibold text-giorda-blue"
      >
        <Filter className="h-4 w-4" /> Filtros
      </button>

      <div className={`fixed inset-0 z-40 bg-black/50 md:hidden ${open ? "block" : "hidden"}`} onClick={() => setOpen(false)} />

      <div className={`fixed inset-y-0 right-0 z-50 w-80 max-w-full overflow-y-auto bg-white p-6 shadow-2xl transition md:static md:z-auto md:block md:w-full md:p-0 md:shadow-none ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between md:hidden">
          <h2 className="font-display text-lg font-bold text-giorda-blue">Filtros</h2>
          <button onClick={() => setOpen(false)} className="text-gray-500"><X /></button>
        </div>

        <div className="card mt-4 md:mt-0 space-y-5">
          <FiltroBloque label="Marca">
            <select className="input-base" value={marca} onChange={(e) => setMarca(e.target.value)}>
              <option value="">Todas</option>
              {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </FiltroBloque>

          <FiltroBloque label="Ancho">
            <select className="input-base" value={ancho} onChange={(e) => setAncho(e.target.value)}>
              <option value="">Todos</option>
              {ANCHOS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </FiltroBloque>

          <FiltroBloque label="Perfil">
            <select className="input-base" value={perfil} onChange={(e) => setPerfil(e.target.value)}>
              <option value="">Todos</option>
              {PERFILES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </FiltroBloque>

          <FiltroBloque label="Rodado">
            <select className="input-base" value={rodado} onChange={(e) => setRodado(e.target.value)}>
              <option value="">Todos</option>
              {RODADOS.map((m) => <option key={m} value={m}>R{m}</option>)}
            </select>
          </FiltroBloque>

          <div className="flex flex-col gap-2 pt-2">
            <button onClick={aplicar} className="btn-secondary w-full">Aplicar filtros</button>
            <button onClick={limpiar} className="text-sm font-semibold text-gray-600 hover:text-giorda-blue">Limpiar todo</button>
          </div>
        </div>
      </div>
    </>
  );
}

function FiltroBloque({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-giorda-blue-700">{label}</label>
      {children}
    </div>
  );
}
