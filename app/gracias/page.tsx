import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";

export default async function GraciasPage({ searchParams }: { searchParams: Promise<{ orden?: string; metodo?: string; status?: string }> }) {
  const sp = await searchParams;
  const fallido = sp.status === "failure";

  return (
    <div className="container-giorda py-16">
      <div className="mx-auto max-w-xl text-center">
        {fallido ? (
          <>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-100 text-red-600 text-3xl">!</div>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-red-700">El pago no pudo completarse</h1>
            <p className="mt-2 text-gray-600">No te preocupes, tu carrito sigue intacto. Probá de nuevo o coordiná por WhatsApp.</p>
            <Link href="/checkout" className="btn-primary mt-6 inline-flex">Reintentar pago</Link>
          </>
        ) : (
          <>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-500 text-white">
              <Check className="h-8 w-8" />
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-giorda-blue">¡Gracias por tu compra!</h1>
            <p className="mt-2 text-gray-600">
              {sp.orden && <>Tu nº de orden es <strong>{sp.orden}</strong>.</>}
              {sp.metodo === "transferencia" && " Te enviamos los datos para la transferencia por WhatsApp."}
            </p>
            <p className="mt-2 text-gray-600">Te confirmamos por WhatsApp en cuanto preparemos tu pedido.</p>
            <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <a href={`https://wa.me/5493512293025?text=${encodeURIComponent(`Hola Giorda, acabo de hacer una compra (Nº ${sp.orden ?? "—"}).`)}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="h-4 w-4" /> Confirmar por WhatsApp
              </a>
              <Link href="/" className="btn-outline">Volver al inicio</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
