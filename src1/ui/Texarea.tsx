import * as React from "react";

import { cn } from "../lib/utils";
interface TextareaWithCountProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength: number;
  placeholder?: string;
  initialValue?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaWithCountProps>(
  ({ className, maxLength, ...props }, ref) => {
    const [text, setText] = React.useState("");

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value.slice(0, maxLength);
      setText(newText);
    };
    return (
      <div className='w-full relative'>
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-gray-400 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-xl font-OpenSans",
            className
          )}
          value={text}
          ref={ref}
          {...props}
          maxLength={maxLength}
          onInput={handleTextChange}
        />
        <div className='absolute bottom-2 right-2 text-xs text-gray-500'>
          <span
            className={`
            ${
              text.length >= maxLength * 0.9
                ? "text-red-500 font-bold"
                : "text-gray-500"
            }
          `}
          >
            {text.length} / {maxLength}
          </span>
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
