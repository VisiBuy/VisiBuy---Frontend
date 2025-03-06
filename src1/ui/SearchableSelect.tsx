import React, { SetStateAction, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./Select";
import { FieldPath, FieldValues } from "react-hook-form";
import { FormControl } from "./Form";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../lib/utils";
export interface ISearchableData {
  label: string;
  value: string;
}
export interface SearchableSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data: ISearchableData[];
  placeholder: string;
}
export const SearchableSelect = React.forwardRef<
  HTMLSelectElement,
  SearchableSelectProps
>(({ className, data, ...props }, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);
  const handleValueChange = (value: SetStateAction<string>) => {
    setSelectedValue(value);
  };

  return (
    <div className='relative'>
      <div className='absolute right-6 top-1/2 -translate-y-1/2 text-ring'>
        <ChevronDownIcon />
      </div>
      <select
        className={cn(
          "flex font-OpenSans h-16 w-full appearance-none  rounded-md border border-input bg-background px-3 py-2 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {data.map(({ value, label }) => (
          <option
            value={value}
            className='bg-white cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-lg outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});
