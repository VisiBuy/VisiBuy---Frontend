import { QueryResult } from "../../../../models/query-result";
import {
  ISellerOrderQueryParams,
  ISellerOrder,
  TUpdateSellerOrderStaus,
} from "../../models/orders";
import { ISellerOrderRepository } from "../../respository/seller-order-respository";
import { axiosWithAuth } from "../../../../lib/client";

class SellerOrderApiAdapter implements ISellerOrderRepository {
  async updateOrderStatus({ id, status }: TUpdateSellerOrderStaus) {
    const response = await axiosWithAuth.post(`/update/status`, {
      order_id: id,
      status,
    });
    return response.data;
  }
  async getOrder(id: string) {
    const response = await axiosWithAuth.get(`/${id}/status`);
    return response.data;
  }
  async getOrderList(
    queryParams: ISellerOrderQueryParams
  ): Promise<QueryResult<ISellerOrder>> {
    const searchParams = new URLSearchParams();

    // Add all defined query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const response = await axiosWithAuth.get(
      `/order/history?${searchParams.toString()}`
    );
    return {
      totalPages: response.data.pagination.totalPages,
      ...response.data,
    };
  }
}

export default new SellerOrderApiAdapter();
