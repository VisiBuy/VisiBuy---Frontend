import { QueryResult } from "@/models/query-result";
import {
  ISellerOrder,
  ISellerOrderQueryParams,
  TUpdateSellerOrderStaus,
} from "../models/orders";

export interface ISellerOrderRepository {
  getOrder: (id: string) => Promise<any>;
  getOrderList: (
    queryParams: ISellerOrderQueryParams
  ) => Promise<QueryResult<ISellerOrder>>;
  updateOrderStatus: (
    payload: TUpdateSellerOrderStaus
  ) => Promise<ISellerOrder>;
  uploadSellerVerifcationImages: (
    orderId: string,
    imagesData: FormData
  ) => Promise<any>;
  getSellerVerificationImages: (orderId: string) => Promise<any>;
}
