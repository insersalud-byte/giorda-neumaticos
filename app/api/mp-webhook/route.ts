import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Webhook de Mercado Pago.
 * MP envía notificaciones cuando cambia el estado de un pago.
 * Este endpoint debe:
 *   1. Validar la firma (x-signature header) — TODO cuando llegue el access token real.
 *   2. Consultar el detalle del pago en la API de MP.
 *   3. Actualizar el estado de la orden en el sistema interno (api.actualizarOrden).
 *
 * Doc: https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || body.type;
    const id = url.searchParams.get("id") || body.data?.id;

    console.log("[mp-webhook] recibido:", { topic, id, body });

    if (topic === "payment" && id) {
      const accessToken = process.env.MP_ACCESS_TOKEN;
      if (!accessToken) {
        console.warn("[mp-webhook] MP_ACCESS_TOKEN no configurado, skip");
        return NextResponse.json({ ok: true });
      }

      // Consultar pago
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!res.ok) {
        console.error("[mp-webhook] error consultando pago:", res.status);
        return NextResponse.json({ ok: false }, { status: 500 });
      }
      const payment = await res.json();
      const ordenId = payment.external_reference;
      const estadoMP = payment.status; // approved | rejected | in_process | refunded

      // TODO: notificar al sistema interno
      // await fetch(`${process.env.SISTEMA_API_BASE_URL}/ordenes/${ordenId}/pago`, { ... })
      console.log(`[mp-webhook] orden ${ordenId} → ${estadoMP}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[mp-webhook] error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST endpoint for Mercado Pago notifications" });
}
