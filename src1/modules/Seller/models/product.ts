import { BaseQueryParams } from "../../../models/base-query-params";
import {
  VALIDATION_INVALID_FIELD,
  VALIDATION_REQUIRED,
} from "../../../lib/systemConfig";
import { ZodType, z } from "zod";

export interface SellerProductState {
  products: ISellerProduct[];
  selectedProduct: ISellerProduct | null;
}

export interface ProductDto {
  id: string;
  color: string;
  brand: string;
  model: string;
  size: string;
  price: number;
  description: string;
  stock_status: "Out of stock" | "In stock";
  images: z.infer<typeof ImageMetadataSchema>[];
}
export type ImageUploadSchema = z.infer<typeof ImageMetadataSchema>;
export interface ISellerProduct extends ProductDto {
  store_name: string;
  seller_img: string;
}
export const ImageMetadataSchema = z.object({
  // Unique identifier for the image
  id: z.string().uuid(),

  // Original filename
  name: z.string().min(1, "Filename is required"),

  // File size validation (in bytes)
  size: z
    .number()
    .min(1, "Image must be at least 1 byte")
    .max(5 * 1024 * 1024, "Image cannot exceed 5MB"),

  // MIME type validation
  type: z
    .string()
    .refine(
      (val) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(val),
      { message: "Unsupported image type" }
    ),

  // Optional URL for preview or existing image
  url: z.string().url().optional(),

  // Dimensions validation
  dimensions: z
    .object({
      width: z.number().min(10, "Image width too small"),
      height: z.number().min(10, "Image height too small"),
    })
    .optional(),
});
export const AddProductSchema: ZodType<Omit<ProductDto, "id">> = z.object({
  color: z.string({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Color"),
  }),
  brand: z.string({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Brand"),
  }),
  model: z.string({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Model"),
  }),
  size: z.string({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Model"),
  }),
  price: z.number({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Price"),
    invalid_type_error: VALIDATION_INVALID_FIELD.replace("{{FIELD}}", "Price"),
  }),
  description: z.string({
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Description"),
  }),
  stock_status: z.enum(["In stock", "Out of stock"]),
  images: z
    .array(ImageMetadataSchema)
    .min(1, "At least one image is required")
    .max(8, "Maximum of 8 images allowed")

    // Optional custom validation to ensure unique images
    .refine(
      (images) => new Set(images.map((img) => img.id)).size === images.length,
      { message: "Duplicate images are not allowed" }
    ),
});

export type TStockStatus = "Out of stock" | "In stock";
export interface ISellerProductQueryParams extends BaseQueryParams {
  brand?: string;
  color?: string;
  price_range?: string;
  stock_status?: TStockStatus;
}
