import { QueryResult } from "../../../models/query-result";
import {
  ISellerOrder,
  ISellerOrderQueryParams,
  TUpdateSellerOrderStaus,
} from "../models/orders";

export interface ISellerOrderRepository {
  getOrder: (id: string) => void;
  getOrderList: (
    queryParams: ISellerOrderQueryParams
  ) => Promise<QueryResult<ISellerOrder>>;
  updateOrderStatus: (
    payload: TUpdateSellerOrderStaus
  ) => Promise<ISellerOrder>;
}
