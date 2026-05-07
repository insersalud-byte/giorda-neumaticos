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
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-12 w-12 shrink-0">
        <Image src="/logo.png" alt="Giorda Neumáticos" fill className="object-contain" priority />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight text-giorda-blue">GIORDA</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-giorda-yellow-500">Neumáticos</span>
      </div>
    </div>
  );
}

export function DogIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Mascota Giorda" role="img">
      <defs>
        <linearGradient id="dogBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFCB05" />
          <stop offset="100%" stopColor="#E0B100" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#0B3D91" />
      <ellipse cx="32" cy="34" rx="16" ry="14" fill="url(#dogBody)" />
      <path d="M16 22 Q14 14 22 16 L24 26 Z" fill="#FFCB05" />
      <path d="M48 22 Q50 14 42 16 L40 26 Z" fill="#FFCB05" />
      <circle cx="26" cy="32" r="2.2" fill="#0B3D91" />
      <circle cx="38" cy="32" r="2.2" fill="#0B3D91" />
      <circle cx="26.7" cy="31.3" r="0.7" fill="white" />
      <circle cx="38.7" cy="31.3" r="0.7" fill="white" />
      <ellipse cx="32" cy="38" rx="2.2" ry="1.6" fill="#0B3D91" />
      <path d="M28 41 Q32 44 36 41" stroke="#0B3D91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M31 43 Q32 45 33 43" stroke="#FF6B6B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
