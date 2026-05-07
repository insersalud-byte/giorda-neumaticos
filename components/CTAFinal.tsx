import Link from "next/link";
import { Calendar, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import { DogIcon } from "./Logo";

export function CTAFinal() {
  return (
    <section className="bg-giorda-blue py-16 text-white">
      <div className="container-giorda grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center">
        <DogIcon className="h-20 w-20 mx-auto md:mx-0" />
        <div className="text-center md:text-left">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            ¿Listo para cambiar tus neumáticos?
          </h2>
          <p className="mt-2 text-giorda-blue-100">
            Sacá tu turno en menos de un minuto o hablanos por WhatsApp si necesitás asesoramiento.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <Link href="/turnos" className="btn-primary">
            <Calendar className="h-5 w-5" /> Sacar turno
          </Link>
          <a href={whatsappLink("Hola Giorda, quiero asesoramiento.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
