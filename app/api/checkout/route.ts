import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export const runtime = "nodejs";

interface CheckoutBody {
  items: Array<{ neumaticoId: string; cantidad: number; precioUnitario: number; titulo: string }>;
  total: number;
  cliente: { nombre: string; telefono: string; email: string; dni?: string };
  envio: { modo: "retiro" | "envio"; direccion?: string; localidad?: string; cp?: string };
  metodo: "mercadopago" | "transferencia";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutBody;
    if (!body.items?.length) return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    if (!body.cliente?.email || !body.cliente?.telefono || !body.cliente?.nombre) {
      return NextResponse.json({ error: "Datos del cliente incompletos" }, { status: 400 });
    }

    // 1. Crear orden en el sistema interno (siempre, también si es transferencia)
    const orden = await api.crearOrden({
      items: body.items.map((i) => ({ neumaticoId: i.neumaticoId, cantidad: i.cantidad, precioUnitario: i.precioUnitario })),
      total: body.total,
      cliente: body.cliente,
      envio: body.envio,
      pago: { metodo: body.metodo }
    });

    // 2. Si es Mercado Pago, crear preferencia
    if (body.metodo === "mercadopago") {
      const accessToken = process.env.MP_ACCESS_TOKEN;
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
      if (!accessToken) {
        return NextResponse.json({ error: "MP_ACCESS_TOKEN no configurado" }, { status: 500 });
      }

      const { MercadoPagoConfig, Preference } = await import("mercadopago");
      const mp = new MercadoPagoConfig({ accessToken });
      const preference = new Preference(mp);

      const pref = await preference.create({
        body: {
          items: body.items.map((i) => ({
            id: i.neumaticoId,
            title: i.titulo,
            quantity: i.cantidad,
            unit_price: i.precioUnitario,
            currency_id: "ARS"
          })),
          payer: {
            name: body.cliente.nombre,
            email: body.cliente.email,
            phone: { number: body.cliente.telefono },
            identification: body.cliente.dni ? { type: "DNI", number: body.cliente.dni } : undefined
          },
          back_urls: {
            success: `${baseUrl}/gracias?orden=${orden.id}&metodo=mercadopago&status=success`,
            failure: `${baseUrl}/gracias?orden=${orden.id}&metodo=mercadopago&status=failure`,
            pending: `${baseUrl}/gracias?orden=${orden.id}&metodo=mercadopago&status=pending`
          },
          auto_return: "approved",
          external_reference: orden.id,
          notification_url: `${baseUrl}/api/mp-webhook`,
          statement_descriptor: "GIORDA NEUMATICOS"
        }
      });

      return NextResponse.json({
        id: orden.id,
        initPoint: pref.init_point,
        sandboxInitPoint: pref.sandbox_init_point
      });
    }

    // 3. Transferencia: devolver la orden directo, el flujo continúa por WhatsApp
    return NextResponse.json({ id: orden.id });
  } catch (err) {
    console.error("[/api/checkout] error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error desconocido" }, { status: 500 });
  }
}
