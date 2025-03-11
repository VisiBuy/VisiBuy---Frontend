import { useGetSellerGetNotification } from "../../queries/notification/queries";

export function SellerNotificationCard(){
    const {data} = useGetSellerGetNotification();
    
}