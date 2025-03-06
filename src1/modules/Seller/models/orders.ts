import { BaseQueryParams } from "../../../models/base-query-params";
import { IOrder } from "../../Orders/models/types";
import { TOrderStatus } from "../../../types/status";

export interface ISellerOrder extends IOrder {}
export interface ISellerOrderQueryParams extends BaseQueryParams {
  status: TOrderStatus | "all_orders";
}
export type TUpdateSellerOrderStaus = Pick<IOrder, "id" | "status">;
