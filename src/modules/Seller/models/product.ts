import { BaseQueryParams } from "@/models/base-query-params";
import {
  VALIDATION_INVALID_FIELD,
  VALIDATION_MAX_LENGTH,
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRED,
} from "@/lib/systemConfig";
import { ZodType, z } from "zod";
import { Control, UseFormReturn } from "react-hook-form";
import { ISearchableData } from "@/ui/SearchableSelect";

export interface SellerProductState {
  products: ISellerProduct[];
  selectedProduct: ISellerProduct | null;
}

export interface ProductDto {
  id: string;
  color: Array<string>;
  brand: string;
  model: string;
  size: Array<string>;
  price: number;
  description: string;
  stock_status: "in_stock" | "out_stock";
  images?: File[];
}
export type ImageUploadSchema = z.infer<typeof ImageMetadataSchema>;
export interface ISellerProduct extends ProductDto {
  store_name: string;
  seller_img: string;
}
// FileList with file type validation
const ImageFileListSchema = z.custom<File>(
  (val) => {
    if (!(val instanceof File)) {
      return false;
    }

    return true;
  },
  {
    message: "Expected a FileList containing only image files",
  }
);

export const ImageMetadataSchema = z.object({
  // Unique identifier for the image
  id: z.string().uuid(),

  // Original filename
  name: z.string().min(1, "Filename is required").optional(),

  // Optional URL for preview or existing image
  url: z.string().url().optional(),
});

export const AddProductSchema = z.object({
  color: z
    .array(
      z
        .string()
        .min(1, "sneaker color cannot be empty")
        .max(100, " sneaker color is too long")
    )
    .min(1, "Color must contain at least one sneaker color"),
  brand: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Brand"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Brand"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Brand"),
    }),

  model: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Model"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Model"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Model"),
    }),

  size: z
    .array(
      z
        .string({
          required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Size"),
          invalid_type_error: VALIDATION_INVALID_FIELD.replace(
            "{{FIELD}}",
            "Size"
          ),
        })
        .refine((val) => !isNaN(Number(val)), {
          message: VALIDATION_INVALID_FIELD.replace("{{FIELD}}", "Size"),
        })
        .refine((val) => Number(val) > 0, {
          message: "Size must be positive",
        })
        .refine((val) => Number(val) <= 100, {
          message: "Size is too high",
        })
    )
    .min(1, "Size must contain at least one sneaker size"),

  price: z.coerce
    .number({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Price"),
      invalid_type_error: VALIDATION_INVALID_FIELD.replace(
        "{{FIELD}}",
        "Price"
      ),
    })
    .positive("Price must be positive")
    .finite("Price must be a finite number")
    .max(9999999.99, "Price is too high"),
  description: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Description"),
    })
    .min(10, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Description"),
    })
    .max(500, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Description"),
    }),
  stock_status: z.enum(["in_stock", "out_stock"]),
  images: z
    .array(ImageFileListSchema)
    .min(1, "At least one image is required")
    .max(8, "Maximum of 8 images allowed")
    .optional(),
});

export type TStockStatus = "Out of stock" | "In stock";
export interface ISellerProductQueryParams extends BaseQueryParams {
  brand?: string;
  color?: string;
  price_range?: string;
  stock_status?: TStockStatus;
}

export interface ProductFormFieldProps {
  control: Control<z.infer<typeof AddProductSchema>>;
  name: keyof z.infer<typeof AddProductSchema>;
  label: string;
  placeholder: string;
  component: React.ComponentType<any>;
  options?: ISearchableData[];
  form?: UseFormReturn<z.infer<typeof AddProductSchema>>;
  className?: string;
  type?: string;
  maxLength?: number;
}
