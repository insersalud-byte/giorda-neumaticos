import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-giorda py-20 text-center">
      <Image src="/logo.png" alt="Giorda Neumáticos" width={128} height={128} className="mx-auto object-contain" />
      <h1 className="mt-4 font-display text-4xl font-extrabold text-giorda-blue">¡Ups, me perdí!</h1>
      <p className="mt-2 text-gray-600">No encontré la página que buscás. Volvamos al inicio.</p>
      <Link href="/" className="btn-primary mt-6 inline-flex">Volver al inicio</Link>
    </div>
  );
}
