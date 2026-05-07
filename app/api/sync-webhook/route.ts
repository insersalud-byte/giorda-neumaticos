import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

/**
 * Webhook entrante desde el sistema interno de Giorda.
 * Cuando el sistema cambia precios, stock u ofertas, debe llamar a este endpoint
 * para forzar la regeneración de las páginas afectadas en la web.
 *
 * Seguridad: token simple en header Authorization. Cambiar por firma HMAC en prod.
 *
 * Body esperado:
 * {
 *   "tipo": "producto" | "servicio" | "todo",
 *   "id": "neumatico-xxx" (opcional)
 * }
 */
export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.SISTEMA_API_KEY || auth !== `Bearer ${process.env.SISTEMA_API_KEY}`) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { tipo, id } = body ?? {};

    if (tipo === "producto" || tipo === "todo") {
      revalidatePath("/");
      revalidatePath("/catalogo");
      if (id) revalidatePath(`/producto/${id}`);
    }
    if (tipo === "servicio" || tipo === "todo") {
      revalidatePath("/");
      revalidatePath("/servicios");
      revalidatePath("/turnos");
    }

    return NextResponse.json({ ok: true, revalidated: tipo, id });
  } catch (err) {
    console.error("[sync-webhook] error:", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
