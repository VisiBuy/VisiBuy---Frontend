// import { ProductFormFieldProps } from "@/modules/Seller/models/product";
// import { Combobox } from "@/ui/combobox";
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/Form";

// const ProductFormField = ({
//   control,
//   name,
//   label,
//   placeholder,
//   component: Component,
//   options,
//   ...props
// }: ProductFormFieldProps) => (
//   <FormField
//     control={control}
//     name={name}
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel className="flex justify-start text-xl font-Montserrat font-medium">
//           {label}
//           <span className="text-destructive ml-1">*</span>
//         </FormLabel>
//         <FormControl>
//           {options ? (
//             <Combobox
//               options={options}
//               form={props.form}
//               name={name}
//               placeholder={placeholder}
//             />
//           ) : (
//             <Component
//               placeholder={placeholder}
//               {...field}
//               className="text-xl"
//               {...props}
//             />
//           )}
//         </FormControl>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
// );
