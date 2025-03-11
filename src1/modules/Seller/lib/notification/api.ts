import { axiosWithAuth } from "../../../../lib/client";
import { TSellerNotificationResponse } from "../../models/notification";
import { ISellerNotificationRepository } from "../../respository/seller-notification-repository";

class SellerNotificationApiAdpater implements ISellerNotificationRepository {
  async getNotificationList(): Promise<TSellerNotificationResponse> {
    const response = await axiosWithAuth.get("/notification");
    return response.data;
  }
}

export default new SellerNotificationApiAdpater();
