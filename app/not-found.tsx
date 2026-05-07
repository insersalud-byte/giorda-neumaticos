import Link from "next/link";
import { DogIcon } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="container-giorda py-20 text-center">
      <DogIcon className="mx-auto h-32 w-32" />
      <h1 className="mt-4 font-display text-4xl font-extrabold text-giorda-blue">¡Ups, me perdí!</h1>
      <p className="mt-2 text-gray-600">No encontré la página que buscás. Volvamos al inicio.</p>
      <Link href="/" className="btn-primary mt-6 inline-flex">Volver al inicio</Link>
    </div>
  );
}
