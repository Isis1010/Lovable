import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-full",
  {
    variants: {
      variant: {
        default:
          "bg-neon-blue text-white neon-glow-blue hover:scale-105",
        destructive:
          "bg-destructive text-white neon-glow-blue hover:scale-105",
        outline:
          "border-2 border-neon-blue bg-background text-neon-blue shadow-[0_0_8px_hsl(var(--neon-blue)/0.4),0_0_16px_hsl(var(--neon-blue)/0.3)] hover:bg-neon-blue hover:text-white hover:scale-105",
        secondary:
          "bg-neon-blue/20 text-neon-blue shadow-[0_0_8px_hsl(var(--neon-blue)/0.4),0_0_16px_hsl(var(--neon-blue)/0.3)] hover:bg-neon-blue hover:text-white hover:scale-105",
        ghost:
          "hover:bg-neon-blue/10 hover:text-neon-blue hover:shadow-[0_0_8px_hsl(var(--neon-blue)/0.4)]",
        link: "text-neon-blue underline-offset-4 hover:underline",
        neonBlue:
          "bg-neon-blue text-white neon-glow-blue hover:scale-105",
        neonDynamic:
          "bg-dynamic-glow text-white neon-glow-dynamic hover:scale-105",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  glowColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, glowColor, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Apply custom glow color if provided
    const customStyle = glowColor 
      ? { 
          ...style,
          boxShadow: `0 0 8px ${glowColor}, 0 0 16px ${glowColor}80, 0 0 32px ${glowColor}60, 0 0 48px ${glowColor}40`,
          backgroundColor: glowColor,
        }
      : style;
    
    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }))} 
        ref={ref} 
        style={customStyle}
        {...props} 
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
