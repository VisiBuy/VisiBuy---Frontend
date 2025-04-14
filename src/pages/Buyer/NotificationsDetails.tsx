import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "@/context/notifications/NotificationsContext";
import { FaArrowLeft } from "react-icons/fa";

interface Notification {
  id: string;
  message: string;
  created_at: string; 
  read: boolean;
  details?: string;
}

const BuyerNotificationsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  const notification = notifications.find((n) => n._id === id); 

  if (!notification) {
    return <div className="p-6">Notification not found.</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold mb-4"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-2">{notification.message}</h2>
      <p className="text-sm text-gray-500">
        {new Date(notification.created_at).toLocaleString()}
      </p>
      <p className="mt-4 font-OpenSans text-lg">{notification.details || notification.message}</p>
    </div>
  );
};

export default BuyerNotificationsDetailsPage;
