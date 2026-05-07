import type { Neumatico, Servicio, Turno, Orden } from "./types";
import { MOCK_NEUMATICOS, MOCK_SERVICIOS } from "./mock-data";

const BASE = process.env.SISTEMA_API_BASE_URL;
const KEY = process.env.SISTEMA_API_KEY;
const USE_MOCK = !BASE || !KEY;

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) throw new Error("SISTEMA_API_BASE_URL no configurada");
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
      ...(init?.headers || {})
    },
    cache: "no-store"
  });
  if (!res.ok) {
    throw new Error(`Sistema API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  /** Catálogo completo de neumáticos. */
  async listarNeumaticos(filtros?: { marca?: string; ancho?: number; perfil?: number; rodado?: number }): Promise<Neumatico[]> {
    if (USE_MOCK) {
      let lista = MOCK_NEUMATICOS;
      if (filtros?.marca) lista = lista.filter(n => n.marca === filtros.marca);
      if (filtros?.ancho) lista = lista.filter(n => n.medida.ancho === filtros.ancho);
      if (filtros?.perfil) lista = lista.filter(n => n.medida.perfil === filtros.perfil);
      if (filtros?.rodado) lista = lista.filter(n => n.medida.rodado === filtros.rodado);
      return lista;
    }
    const params = new URLSearchParams();
    if (filtros?.marca) params.set("marca", filtros.marca);
    if (filtros?.ancho) params.set("ancho", String(filtros.ancho));
    if (filtros?.perfil) params.set("perfil", String(filtros.perfil));
    if (filtros?.rodado) params.set("rodado", String(filtros.rodado));
    return call<Neumatico[]>(`/neumaticos?${params}`);
  },

  async obtenerNeumatico(id: string): Promise<Neumatico | null> {
    if (USE_MOCK) return MOCK_NEUMATICOS.find(n => n.id === id) ?? null;
    return call<Neumatico>(`/neumaticos/${id}`);
  },

  async listarServicios(): Promise<Servicio[]> {
    if (USE_MOCK) return MOCK_SERVICIOS;
    return call<Servicio[]>("/servicios");
  },

  async disponibilidadTurnos(servicioId: string, fechaDesde: string, fechaHasta: string): Promise<string[]> {
    if (USE_MOCK) {
      const slots: string[] = [];
      const desde = new Date(fechaDesde);
      const hasta = new Date(fechaHasta);
      for (let d = new Date(desde); d <= hasta; d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 0) continue;
        for (const h of [9, 10, 11, 14, 15, 16, 17]) {
          const s = new Date(d);
          s.setHours(h, 0, 0, 0);
          slots.push(s.toISOString());
        }
      }
      return slots;
    }
    const params = new URLSearchParams({ servicioId, desde: fechaDesde, hasta: fechaHasta });
    return call<string[]>(`/turnos/disponibilidad?${params}`);
  },

  async crearTurno(turno: Omit<Turno, "id" | "estado">): Promise<Turno> {
    if (USE_MOCK) {
      return { ...turno, id: `mock-${Date.now()}`, estado: "pendiente" };
    }
    return call<Turno>("/turnos", { method: "POST", body: JSON.stringify(turno) });
  },

  async crearOrden(orden: Omit<Orden, "id" | "fechaCreacion" | "estado" | "pago"> & { pago: { metodo: Orden["pago"]["metodo"] } }): Promise<Orden> {
    if (USE_MOCK) {
      return {
        ...orden,
        id: `ord-${Date.now()}`,
        fechaCreacion: new Date().toISOString(),
        estado: "pendiente",
        pago: { metodo: orden.pago.metodo, estado: "pendiente" }
      };
    }
    return call<Orden>("/ordenes", { method: "POST", body: JSON.stringify(orden) });
  }
};
