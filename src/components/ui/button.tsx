import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border-2 border-foreground font-heading font-black uppercase text-sm tracking-widest whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:brightness-110",
        outline:
          "bg-background text-foreground hover:bg-foreground hover:text-background",
        ghost:
          "border-transparent hover:bg-muted",
        brutal:
          "bg-primary text-primary-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform",
        "brutal-outline":
          "bg-background text-foreground border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-foreground hover:text-background transition-colors",
      },
      size: {
        default: "px-6 py-2",
        sm: "px-4 py-1.5 text-xs",
        lg: "px-10 py-6 text-xl tracking-tighter",
        xl: "px-14 py-8 text-2xl tracking-widest",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
