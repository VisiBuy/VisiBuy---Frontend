import {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { fetchNotifications } from "@/modules/Buyer/lib/track-order/api";

interface Notification {
  _id: string;
  message: string;
  status: string;
  is_read: boolean;
  verification_link: string;
  created_at: string;
  details?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  loading: boolean;
  error: string | null;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to load notifications from localStorage
  const loadNotificationsFromLocalStorage = () => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      return JSON.parse(storedNotifications);
    }
    return [];
  };

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        // Merge the fetched notifications with any persisted ones from localStorage
        const persistedNotifications = loadNotificationsFromLocalStorage();
        const updatedNotifications = data.map((notif: Notification) => {
          const persistedNotif = persistedNotifications.find(
            (n: Notification) => n._id === notif._id
          );
          return persistedNotif
            ? { ...notif, is_read: persistedNotif.is_read }
            : notif;
        });
        setNotifications(updatedNotifications);
      } catch (err: any) {
        setError(err.message || "Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Function to persist notifications to localStorage
  const persistNotifications = (updatedNotifications: Notification[]) => {
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notif) =>
      notif._id === id ? { ...notif, is_read: true } : notif
    );
    setNotifications(updatedNotifications);
    persistNotifications(updatedNotifications); // Persist state to localStorage
  };

  const unreadCount = useMemo(
    () => notifications.filter((notif) => !notif.is_read).length,
    [notifications]
  );

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, loading, error }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};
