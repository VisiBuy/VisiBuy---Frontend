import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/context/notifications/NotificationsContext";
import { CheckCircle } from "lucide-react";

interface Notification {
  id: string; 
  message: string;
  timestamp: string;
  read: boolean;
  details?: string;
}

const BuyerNotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();

  const handleOpenNotification = (id: string) => {
    markAsRead(id); // Mark notification as read
    navigate(`/dashboard/buyer/notification/${id}`); 
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No new notifications</p>
        ) : (
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li
                key={notification._id} // Use _id here
                className="flex justify-between items-center p-4 transition-all hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOpenNotification(notification._id)} 
              >
                <div className="flex-1">
                  <p
                    className={`text-lg ${
                      notification.is_read
                        ? "text-gray-500"
                        : "font-semibold text-gray-800"
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(notification.created_at).toLocaleString()}
                  </p>
                </div>
                {!notification.is_read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification._id); // Use _id here
                    }}
                    className="ml-4 text-sm px-3 py-1 rounded-lg transition-all duration-300 flex items-center gap-2"
                    style={{ backgroundColor: "#1a73e8", color: "white" }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                    Mark as Read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BuyerNotificationsPage;
