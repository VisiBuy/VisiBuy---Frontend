import Icon from "../../ui/Icon";
import { useCallback, useEffect, useState } from "react";
import { useGetSellerGetNotification } from "../../modules/Seller/queries/notification/queries";
import { NotificationModal } from "./notification-modal";
import { TSellerNotification } from "../../modules/Seller/models/notification";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { set } from "date-fns";

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const path = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<TSellerNotification[]>([]);
  const { data, isPending } = useGetSellerGetNotification();
  const [searchParams] = useSearchParams();
  // Only update notifications when data changes
  useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications);
    }
  }, [data?.notifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;
  const isOpenNotification = searchParams.get("modal") === "notification";
  const toggleModal = () => {
    setIsOpen(false);
    navigate(path.pathname);
  };

  return (
    <div className="relative">
      <button
        className="h-16 w-16 bg-blue-200 rounded-full  items-center justify-center cursor-pointer hidden lg:flex"
        onClick={() => setIsOpen(true)}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
      >
        <Icon name="bell" className="text-blue" size={25} />
        {unreadCount > 0 && (
          <div className="bg-red-600 h-5 w-5 rounded-full absolute -top-1 -right-1 flex items-center justify-center text-white text-xs">
            {unreadCount}
          </div>
        )}
      </button>

      <NotificationModal
        open={isOpen || isOpenNotification}
        setOpen={toggleModal}
        notifications={notifications}
      />
    </div>
  );
}
