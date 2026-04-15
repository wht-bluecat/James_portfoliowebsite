import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  category: string
  year: string
  imageSrc: string
  imageAlt: string
  className?: string
}

export function ProjectCard({
  title,
  category,
  year,
  imageSrc,
  imageAlt,
  className,
}: ProjectCardProps) {
  return (
    <div className={cn("group", className)}>
      <div className="relative aspect-video overflow-hidden border-2 border-foreground">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="py-6 flex justify-between items-start">
        <div>
          <h4 className="font-heading text-2xl font-black uppercase tracking-tighter mb-1">
            {title}
          </h4>
          <p className="font-sans text-xs font-bold text-foreground/60 uppercase tracking-widest">
            {category}
          </p>
        </div>
        <span className="font-heading text-xl font-black text-primary">
          {year}
        </span>
      </div>
    </div>
  )
}
