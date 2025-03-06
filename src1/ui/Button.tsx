import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground font-OpenSans border border-primary hover:bg-primary/90 hover:text-primary ",

        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary/5 font-sourceSans",

        link: "text-primary underline-offset-4 hover:underline",
      },
      paginationLinks: {
        default:
          "rounded-full h-14 w-14 bg-background border-none text-foreground font-OpenSans font-medium text-3xl",
        active:
          "rounded-full h-14 w-14 bg-blue border-blue font-medium font-OpenSans  text-2xl",
      },
      size: {
        default: "h-14 px-8 rounded-xl text-lg font-regular py-2",
        sm: "h-10 rounded-xl px-8 ",
        lg: "h-16 rounded-xl px-8 text-lg  ",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, paginationLinks, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, paginationLinks, size, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
