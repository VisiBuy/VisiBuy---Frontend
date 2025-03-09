import { TSellerNotificationResponse } from "../models/notification";

export interface ISellerNotificationRepository {
  getNotificationList: () => Promise<TSellerNotificationResponse>;
}
