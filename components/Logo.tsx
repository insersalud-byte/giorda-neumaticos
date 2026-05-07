import { cn } from "@/lib/utils";

/**
 * Logo Giorda con perro mascota integrado.
 * Usa SVG inline para no depender de un asset externo durante el desarrollo.
 * Reemplazar con el logo real cuando esté disponible.
 */
export function Logo({ className, variant = "horizontal" }: { className?: string; variant?: "horizontal" | "icon" }) {
  if (variant === "icon") {
    return <DogIcon className={className} />;
  }
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <DogIcon className="h-10 w-10 shrink-0" />
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
      {/* Head */}
      <ellipse cx="32" cy="34" rx="16" ry="14" fill="url(#dogBody)" />
      {/* Ears */}
      <path d="M16 22 Q14 14 22 16 L24 26 Z" fill="#FFCB05" />
      <path d="M48 22 Q50 14 42 16 L40 26 Z" fill="#FFCB05" />
      {/* Eyes */}
      <circle cx="26" cy="32" r="2.2" fill="#0B3D91" />
      <circle cx="38" cy="32" r="2.2" fill="#0B3D91" />
      <circle cx="26.7" cy="31.3" r="0.7" fill="white" />
      <circle cx="38.7" cy="31.3" r="0.7" fill="white" />
      {/* Nose */}
      <ellipse cx="32" cy="38" rx="2.2" ry="1.6" fill="#0B3D91" />
      {/* Mouth */}
      <path d="M28 41 Q32 44 36 41" stroke="#0B3D91" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tongue hint */}
      <path d="M31 43 Q32 45 33 43" stroke="#FF6B6B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
