import { useParams, useNavigate } from "react-router-dom";
import { useNotifications } from "@/context/notifications/NotificationsContext";
import { FaArrowLeft } from "react-icons/fa"; // Import arrow icon

const BuyerNotificationsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const { notifications } = useNotifications();
  const notification = notifications.find((n) => n.id === Number(id));

  if (!notification) {
    return <div className="p-6">Notification not found.</div>;
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 font-semibold mb-4"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-2">{notification.message}</h2>
      <p className="text-sm text-gray-500">{notification.timestamp}</p>
      <p className="mt-4">This is the full notification details page.</p>
    </div>
  );
};

export default BuyerNotificationsDetailsPage;
