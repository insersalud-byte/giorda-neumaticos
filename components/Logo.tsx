import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, variant = "horizontal" }: { className?: string; variant?: "horizontal" | "icon" }) {
  if (variant === "icon") {
    return (
      <div className={cn("relative h-10 w-10 shrink-0", className)}>
        <Image src="/logo.png" alt="Giorda Neumáticos" fill className="object-contain" priority />
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative shrink-0">
        <Image
          src="/logo.png"
          alt="Giorda Neumáticos"
          width={52}
          height={52}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight text-giorda-blue">GIORDA</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-giorda-yellow-500">Neumáticos</span>
      </div>
    </div>
  );
}
