import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn(
      "font-heading text-xs uppercase tracking-widest text-primary flex items-center gap-3",
      className
    )}>
      <span className="w-12 h-[2px] bg-primary" />
      {children}
    </p>
  )
}
