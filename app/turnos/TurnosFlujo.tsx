"use client";

import { useState, useMemo } from "react";
import { Check, ChevronRight, Calendar, User, Car, MessageCircle, Loader2 } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";
import type { Servicio, ServicioId } from "@/lib/types";

type Paso = 1 | 2 | 3 | 4;

export function TurnosFlujo({ servicios, servicioInicial }: { servicios: Servicio[]; servicioInicial?: string }) {
  const turneables = servicios.filter((s) => s.permiteTurnoOnline);
  const [paso, setPaso] = useState<Paso>(1);
  const [servicioId, setServicioId] = useState<ServicioId | "">(
    (turneables.find((s) => s.id === servicioInicial)?.id) ?? ""
  );
  const [fechaHora, setFechaHora] = useState<string>("");
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    email: "",
    patente: "",
    marcaAuto: "",
    modeloAuto: "",
    notas: ""
  });
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; mensaje: string; turnoId?: string } | null>(null);

  const servicio = turneables.find((s) => s.id === servicioId);

  const irPaso2 = () => servicioId && setPaso(2);
  const irPaso3 = () => fechaHora && setPaso(3);

  const enviar = async () => {
    if (!servicio || !fechaHora) return;
    setEnviando(true);
    try {
      const res = await fetch("/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicioId: servicio.id,
          fechaHora,
          cliente: { nombre: datos.nombre, telefono: datos.telefono, email: datos.email },
          vehiculo: { patente: datos.patente, marca: datos.marcaAuto, modelo: datos.modeloAuto },
          notas: datos.notas
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error al crear el turno");
      setResultado({ ok: true, mensaje: "¡Turno reservado!", turnoId: data.id });
      setPaso(4);
    } catch (err) {
      setResultado({ ok: false, mensaje: err instanceof Error ? err.message : "Error desconocido" });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <Stepper paso={paso} />

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_320px]">
        <div>
          {paso === 1 && (
            <Paso1 servicios={turneables} seleccionado={servicioId} onSelect={(id) => setServicioId(id)} onSiguiente={irPaso2} />
          )}
          {paso === 2 && servicio && (
            <Paso2 servicio={servicio} fechaHora={fechaHora} setFechaHora={setFechaHora} onAtras={() => setPaso(1)} onSiguiente={irPaso3} />
          )}
          {paso === 3 && servicio && (
            <Paso3 datos={datos} setDatos={setDatos} enviando={enviando} onAtras={() => setPaso(2)} onConfirmar={enviar} />
          )}
          {paso === 4 && (
            <Paso4 ok={resultado?.ok ?? false} mensaje={resultado?.mensaje ?? ""} turnoId={resultado?.turnoId} onReintentar={() => setPaso(3)} />
          )}
        </div>

        {paso < 4 && servicio && (
          <aside className="self-start sticky top-20">
            <ResumenLateral servicio={servicio} fechaHora={fechaHora} cliente={datos.nombre} />
          </aside>
        )}
      </div>
    </div>
  );
}

function Stepper({ paso }: { paso: Paso }) {
  const items = ["Servicio", "Fecha y hora", "Tus datos", "Listo"];
  return (
    <ol className="flex items-center gap-2 overflow-x-auto">
      {items.map((label, i) => {
        const n = (i + 1) as Paso;
        const activo = paso === n;
        const completado = paso > n;
        return (
          <li key={label} className="flex items-center gap-2">
            <div className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold transition",
              completado ? "bg-giorda-yellow text-giorda-blue-900" : activo ? "bg-giorda-blue text-white" : "bg-gray-200 text-gray-500"
            )}>
              {completado ? <Check className="h-4 w-4" /> : n}
            </div>
            <span className={cn("text-sm font-semibold", activo ? "text-giorda-blue" : "text-gray-500")}>{label}</span>
            {i < items.length - 1 && <ChevronRight className="h-4 w-4 text-gray-300" />}
          </li>
        );
      })}
    </ol>
  );
}

function Paso1({ servicios, seleccionado, onSelect, onSiguiente }: { servicios: Servicio[]; seleccionado: string; onSelect: (id: ServicioId) => void; onSiguiente: () => void }) {
  return (
    <div className="card">
      <h2 className="font-display text-xl font-bold text-giorda-blue">¿Qué servicio necesitás?</h2>
      <p className="mt-1 text-sm text-gray-600">Sólo se muestran servicios con turno online. Para el resto, escribinos por WhatsApp.</p>
      <div className="mt-5 grid gap-3">
        {servicios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={cn(
              "rounded-xl border-2 p-4 text-left transition",
              seleccionado === s.id ? "border-giorda-blue bg-giorda-blue-50" : "border-gray-200 hover:border-giorda-blue/50"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-giorda-blue">{s.nombre}</p>
                <p className="mt-1 text-sm text-gray-600">{s.descripcionCorta}</p>
              </div>
              <span className="rounded bg-giorda-yellow/30 px-2 py-1 text-xs font-bold text-giorda-blue-900">~{s.duracionMinutos} min</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button disabled={!seleccionado} onClick={onSiguiente} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          Siguiente <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Paso2({ servicio, fechaHora, setFechaHora, onAtras, onSiguiente }: {
  servicio: Servicio;
  fechaHora: string;
  setFechaHora: (v: string) => void;
  onAtras: () => void;
  onSiguiente: () => void;
}) {
  // Generar próximos 14 días con 7 horarios cada uno (excluye domingos)
  const slots = useMemo(() => {
    const res: { fecha: Date; horarios: Date[] }[] = [];
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    for (let i = 1; i <= 14; i++) {
      const d = new Date(hoy);
      d.setDate(d.getDate() + i);
      if (d.getDay() === 0) continue;
      const horarios = [9, 10, 11, 14, 15, 16, 17].map((h) => {
        const x = new Date(d); x.setHours(h, 0, 0, 0); return x;
      });
      res.push({ fecha: d, horarios });
    }
    return res;
  }, []);

  return (
    <div className="card">
      <h2 className="font-display text-xl font-bold text-giorda-blue">Elegí día y horario</h2>
      <p className="mt-1 text-sm text-gray-600">Servicio: <strong>{servicio.nombre}</strong> · ~{servicio.duracionMinutos} min</p>

      <div className="mt-5 max-h-[420px] space-y-4 overflow-y-auto pr-2">
        {slots.map(({ fecha, horarios }) => (
          <div key={fecha.toISOString()}>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-giorda-blue-700">
              {fecha.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <div className="flex flex-wrap gap-2">
              {horarios.map((h) => {
                const iso = h.toISOString();
                const activo = fechaHora === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setFechaHora(iso)}
                    className={cn(
                      "rounded-lg border-2 px-3 py-2 text-sm font-semibold transition",
                      activo ? "border-giorda-blue bg-giorda-blue text-white" : "border-gray-200 hover:border-giorda-blue/50"
                    )}
                  >
                    {h.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onAtras} className="btn-outline">Atrás</button>
        <button disabled={!fechaHora} onClick={onSiguiente} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          Siguiente <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Paso3({ datos, setDatos, enviando, onAtras, onConfirmar }: {
  datos: { nombre: string; telefono: string; email: string; patente: string; marcaAuto: string; modeloAuto: string; notas: string };
  setDatos: React.Dispatch<React.SetStateAction<typeof datos>>;
  enviando: boolean;
  onAtras: () => void;
  onConfirmar: () => void;
}) {
  const valido = datos.nombre.trim() && datos.telefono.trim() && datos.patente.trim();
  const set = (k: keyof typeof datos) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDatos((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="card">
      <h2 className="font-display text-xl font-bold text-giorda-blue">Tus datos</h2>
      <p className="mt-1 text-sm text-gray-600">Necesitamos esto para confirmarte el turno por WhatsApp.</p>

      <div className="mt-5 grid gap-4">
        <Field label="Nombre y apellido *">
          <input className="input-base" value={datos.nombre} onChange={set("nombre")} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Teléfono / WhatsApp *">
            <input className="input-base" value={datos.telefono} onChange={set("telefono")} placeholder="351 1234567" inputMode="tel" />
          </Field>
          <Field label="Email">
            <input className="input-base" value={datos.email} onChange={set("email")} placeholder="vos@ejemplo.com" inputMode="email" />
          </Field>
        </div>
        <Field label="Patente del auto *">
          <input className="input-base uppercase" value={datos.patente} onChange={set("patente")} placeholder="AA123BB" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Marca">
            <input className="input-base" value={datos.marcaAuto} onChange={set("marcaAuto")} placeholder="Volkswagen" />
          </Field>
          <Field label="Modelo">
            <input className="input-base" value={datos.modeloAuto} onChange={set("modeloAuto")} placeholder="Gol Trend" />
          </Field>
        </div>
        <Field label="Notas (opcional)">
          <textarea className="input-base" rows={3} value={datos.notas} onChange={set("notas")} placeholder="Algún detalle que quieras contarnos" />
        </Field>
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={onAtras} className="btn-outline">Atrás</button>
        <button onClick={onConfirmar} disabled={!valido || enviando} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          {enviando ? <><Loader2 className="h-4 w-4 animate-spin" /> Confirmando...</> : <>Confirmar turno <Check className="h-4 w-4" /></>}
        </button>
      </div>
    </div>
  );
}

function Paso4({ ok, mensaje, turnoId, onReintentar }: { ok: boolean; mensaje: string; turnoId?: string; onReintentar: () => void }) {
  if (!ok) {
    return (
      <div className="card border-red-200 bg-red-50">
        <h2 className="font-display text-xl font-bold text-red-700">No pudimos crear el turno</h2>
        <p className="mt-2 text-sm text-red-600">{mensaje}</p>
        <div className="mt-4 flex gap-3">
          <button onClick={onReintentar} className="btn-secondary">Reintentar</button>
          <a href={whatsappLink("Hola Giorda, tuve un problema al sacar turno online.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-green-200 bg-green-50">
      <div className="flex items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-green-500 text-white"><Check className="h-5 w-5" /></span>
        <h2 className="font-display text-xl font-bold text-green-800">¡Turno reservado!</h2>
      </div>
      <p className="mt-3 text-sm text-green-700">
        Te vamos a confirmar por WhatsApp en breve. {turnoId && <>Tu nº de turno es <strong>{turnoId}</strong>.</>}
      </p>
      <div className="mt-4 flex gap-3">
        <a href={whatsappLink(`Hola Giorda, acabo de sacar turno (Nº ${turnoId ?? "—"}).`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          <MessageCircle className="h-4 w-4" /> Confirmar por WhatsApp
        </a>
        <a href="/" className="btn-outline">Volver al inicio</a>
      </div>
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

function ResumenLateral({ servicio, fechaHora, cliente }: { servicio: Servicio; fechaHora: string; cliente: string }) {
  return (
    <div className="card bg-giorda-blue-50/50">
      <h3 className="font-display text-base font-bold text-giorda-blue">Resumen</h3>
      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-giorda-blue" />
          <div>
            <dt className="text-xs uppercase tracking-wider text-gray-500">Servicio</dt>
            <dd className="font-semibold text-giorda-blue">{servicio.nombre}</dd>
          </div>
        </div>
        {fechaHora && (
          <div className="flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-giorda-blue" />
            <div>
              <dt className="text-xs uppercase tracking-wider text-gray-500">Cuándo</dt>
              <dd className="font-semibold text-giorda-blue">
                {new Date(fechaHora).toLocaleString("es-AR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </dd>
            </div>
          </div>
        )}
        {cliente && (
          <div className="flex items-start gap-2"><User className="h-4 w-4 mt-0.5 text-giorda-blue" />
            <div>
              <dt className="text-xs uppercase tracking-wider text-gray-500">A nombre de</dt>
              <dd className="font-semibold text-giorda-blue">{cliente}</dd>
            </div>
          </div>
        )}
      </dl>
    </div>
  );
}
