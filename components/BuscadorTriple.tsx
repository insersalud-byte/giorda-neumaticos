"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Car, Tag, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

const ANCHOS = [155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285];
const PERFILES = [40, 45, 50, 55, 60, 65, 70, 75, 80];
const RODADOS = [13, 14, 15, 16, 17, 18, 19, 20];
const MARCAS_AUTO = ["Volkswagen", "Renault", "Ford", "Chevrolet", "Toyota", "Fiat", "Peugeot", "Citroën", "Nissan", "Honda", "Hyundai", "Jeep"];
const MARCAS_NEUMATICO = ["Sunny", "GT Radial", "Giti", "Wanli", "Champiro", "Maxmiler", "Xbri", "Ovation"];

type Tab = "medida" | "auto" | "marca";

export function BuscadorTriple() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("medida");

  const [ancho, setAncho] = useState("");
  const [perfil, setPerfil] = useState("");
  const [rodado, setRodado] = useState("");

  const [marcaAuto, setMarcaAuto] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");

  const [marcaNeu, setMarcaNeu] = useState("");

  const buscar = () => {
    const params = new URLSearchParams();
    if (tab === "medida") {
      if (ancho) params.set("ancho", ancho);
      if (perfil) params.set("perfil", perfil);
      if (rodado) params.set("rodado", rodado);
    } else if (tab === "auto") {
      if (marcaAuto) params.set("auto", marcaAuto);
      if (modelo) params.set("modelo", modelo);
      if (anio) params.set("anio", anio);
    } else {
      if (marcaNeu) params.set("marca", marcaNeu);
    }
    router.push(`/catalogo?${params.toString()}`);
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
      <div className="grid grid-cols-3 gap-1 bg-giorda-blue-50 p-1">
        <TabBtn active={tab === "medida"} onClick={() => setTab("medida")} icon={<Ruler className="h-4 w-4" />}>Por medida</TabBtn>
        <TabBtn active={tab === "auto"} onClick={() => setTab("auto")} icon={<Car className="h-4 w-4" />}>Por mi auto</TabBtn>
        <TabBtn active={tab === "marca"} onClick={() => setTab("marca")} icon={<Tag className="h-4 w-4" />}>Por marca</TabBtn>
      </div>

      <div className="p-5">
        {tab === "medida" && (
          <div className="grid gap-3 sm:grid-cols-3">
            <Select label="Ancho" value={ancho} onChange={setAncho} options={ANCHOS.map(String)} placeholder="185" />
            <Select label="Perfil" value={perfil} onChange={setPerfil} options={PERFILES.map(String)} placeholder="65" />
            <Select label="Rodado" value={rodado} onChange={setRodado} options={RODADOS.map(String)} placeholder="15" />
          </div>
        )}
        {tab === "auto" && (
          <div className="grid gap-3 sm:grid-cols-3">
            <Select label="Marca" value={marcaAuto} onChange={setMarcaAuto} options={MARCAS_AUTO} placeholder="Volkswagen" />
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-giorda-blue-700">Modelo</label>
              <input className="input-base" value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Gol Trend" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-giorda-blue-700">Año</label>
              <input className="input-base" value={anio} onChange={(e) => setAnio(e.target.value)} placeholder="2018" inputMode="numeric" />
            </div>
          </div>
        )}
        {tab === "marca" && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MARCAS_NEUMATICO.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarcaNeu(m)}
                className={cn(
                  "rounded-lg border-2 px-3 py-3 text-sm font-semibold transition",
                  marcaNeu === m
                    ? "border-giorda-blue bg-giorda-blue text-white"
                    : "border-gray-200 bg-white text-giorda-blue-700 hover:border-giorda-blue/50"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#guia-medidas"
            className="text-sm font-semibold text-giorda-blue-700 underline-offset-4 hover:underline"
          >
            🐶 ¿No sé mi medida? Mostrame
          </a>
          <button onClick={buscar} className="btn-primary">
            <Search className="h-5 w-5" /> Buscar neumáticos
          </button>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition",
        active ? "bg-white text-giorda-blue shadow" : "text-giorda-blue-700 hover:bg-white/60"
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function Select({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-giorda-blue-700">{label}</label>
      <select className="input-base" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder ?? "Seleccionar"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
