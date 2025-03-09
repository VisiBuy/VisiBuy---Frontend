import SellerNotificationApi from "./api";
async function getSellerNotificationList() {
  const notifications = await SellerNotificationApi.getNotificationList();
  return notifications;
}

export default { getSellerNotificationList };
