import { TOrderStatus } from "../../../types/status";
export type TSellerNotificationResponse = {
  notifications: TSellerNotification[];
};
export type TSellerNotification = {
  id: string;
  order: string;
  message: string;
  status: TOrderStatus;
  is_read: boolean;
  verification_link: string;
  created_at: number;
};
