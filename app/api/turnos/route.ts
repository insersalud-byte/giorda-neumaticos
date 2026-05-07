import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { servicioId, fechaHora, cliente, vehiculo, notas } = body ?? {};

    if (!servicioId || !fechaHora || !cliente?.nombre || !cliente?.telefono || !vehiculo?.patente) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const turno = await api.crearTurno({ servicioId, fechaHora, cliente, vehiculo, notas });
    return NextResponse.json(turno, { status: 201 });
  } catch (err) {
    console.error("[/api/turnos] error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error desconocido" }, { status: 500 });
  }
}
