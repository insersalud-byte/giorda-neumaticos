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
    <div className={cn("relative shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="Giorda Neumáticos"
        width={56}
        height={56}
        className="object-contain"
        priority
      />
    </div>
  );
}
