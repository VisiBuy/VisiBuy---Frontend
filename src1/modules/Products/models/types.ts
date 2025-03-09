import { BaseQueryParams } from "../../../models/base-query-params";
import { Status } from "../../../types/status";
export type TStockStatus = "Out of stock" | "In stock";
export interface IProduct {
  color: string;
  brand: string;
  model: string;
  size: string;
  price: number;
  description: string;
  stock_status: TStockStatus;
  images: string[];
}
export interface ProductQueryParams extends BaseQueryParams {
  brand?: string;
  color?: string;
  price_range?: string;
  stock_status?: TStockStatus;
}
