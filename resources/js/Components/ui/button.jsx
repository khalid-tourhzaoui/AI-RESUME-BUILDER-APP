import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Orange gradient (Save/Submit buttons)
        default: "bg-gradient-to-br from-orange-400 to-orange-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] active:translate-x-[3px] active:translate-y-[3px]",

        // Secondary - Blue solid (Add More buttons)
        secondary: "bg-blue-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:bg-blue-600 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",

        // Destructive - Red solid (Delete buttons)
        destructive: "bg-red-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)] hover:bg-red-600 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",

        // AI/Generate - Purple gradient
        generate: "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]",

        // Outline - White with border
        outline: "bg-white text-zinc-800 border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:bg-zinc-50 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px]",

        // Ghost - Minimal style
        ghost: "hover:bg-zinc-100 hover:text-zinc-900 rounded-lg",

        // Link - Text only
        link: "text-zinc-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm",
        sm: "h-8 px-3 py-1.5 text-xs",
        lg: "h-12 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base",
        icon: "h-10 w-10",
        iconSm: "h-7 w-7 sm:h-8 sm:w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
