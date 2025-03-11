import {
  ISellerOrderQueryParams,
  TUpdateSellerOrderStaus,
} from "../../models/orders";
import SellerOrderApi from "./api";
import { transformASellerOrder, transformSellerOrder } from "./transfomers";

async function updateSellerOrderStatus(payload: TUpdateSellerOrderStaus) {
  const response = await SellerOrderApi.updateOrderStatus(payload);
  return response;
}

async function getOrderById(id: string) {
  const response = await SellerOrderApi.getOrder(id);
  return {
    data: transformASellerOrder(response),
  };
}
async function getOrderList(queryParams: ISellerOrderQueryParams) {
  const response = await SellerOrderApi.getOrderList(queryParams);
  return {
    data: transformSellerOrder(response),
    totalPages: response.totalPages,
  };
}

export default { getOrderList, getOrderById, updateSellerOrderStatus };
