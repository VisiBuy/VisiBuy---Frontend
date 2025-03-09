import * as React from "react";

import { cn } from "../lib/utils";
import Icon, { IconProps } from "./Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className='relative'>
        {icon && (
          <div className='absolute right-6 top-1/2 -translate-y-1/2 text-ring'>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex font-OpenSans h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export default React.memo(Input);
