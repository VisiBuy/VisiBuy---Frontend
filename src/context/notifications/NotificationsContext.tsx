import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>; // ✅ Add this
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Your order #1234 has been shipped!",
      timestamp: "2h ago",
      read: false,
    },
    {
      id: 2,
      message: "New discount available on electronics!",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: 3,
      message: "Order #5678 is out for delivery.",
      timestamp: "3 days ago",
      read: false,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Compute unread notifications count
  const unreadCount = useMemo(
    () => notifications.filter((notif) => !notif.read).length,
    [notifications]
  );

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, markAsRead, setNotifications }}
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
