import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export const metadata = {
  title: "Contacto — Giorda Neumáticos Córdoba",
  description: "Encontranos en Córdoba Capital. WhatsApp, teléfono, email y horarios."
};

export default function ContactoPage() {
  return (
    <div className="container-giorda py-8 md:py-12">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold text-giorda-blue md:text-5xl">Contacto</h1>
        <p className="mt-2 text-gray-600">Estamos en Córdoba Capital. Te respondemos rápido.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Item icon={<MapPin />} title="Dirección" value="Córdoba Capital, Argentina" />
          <Item icon={<Phone />} title="Teléfono / WhatsApp" value="+54 9 351 229 3025" href="tel:+5493512293025" />
          <Item icon={<Mail />} title="Email" value="contacto@giordaneumaticos.com.ar" href="mailto:contacto@giordaneumaticos.com.ar" />
          <Item icon={<Clock />} title="Horarios" value="Lun a Sáb 8:30 a 13:00 / 16:00 a 20:00" />

          <a href={whatsappLink("Hola Giorda, quiero asesoramiento.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full sm:w-auto">
            <MessageCircle className="h-5 w-5" /> Hablanos por WhatsApp
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 min-h-[300px] flex items-center justify-center">
          <p className="text-sm text-gray-500 px-6 text-center">
            Mapa de Google Maps acá<br />
            <span className="text-xs">(reemplazar con iframe cuando se tenga la dirección exacta)</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Item({ icon, title, value, href }: { icon: React.ReactNode; title: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-giorda-yellow/30 text-giorda-blue">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{title}</p>
        <p className="font-semibold text-giorda-blue">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:shadow-giorda transition rounded-xl">{content}</a> : content;
}
