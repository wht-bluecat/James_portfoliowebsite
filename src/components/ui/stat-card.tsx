import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  label: string
  className?: string
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("p-8 md:p-12 flex flex-col justify-between", className)}>
      <span className="font-heading text-6xl md:text-7xl font-black text-primary">
        {value}
      </span>
      <p className="font-heading uppercase text-xs tracking-widest font-black mt-4">
        {label}
      </p>
    </div>
  )
}
