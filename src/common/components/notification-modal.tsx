import React from "react";
import { format } from "date-fns";
import { ModalWrapperDialog } from "./modal-wrappper";
import { TSellerNotification } from "../../modules/Seller/models/notification";
import { cn } from "../../lib/utils";
import { formatNotiticationDate } from "../../modules/Seller/lib/notification/utils";

interface NotificationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  notifications: TSellerNotification[];
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  open,
  setOpen,
  notifications,
}) => {
  return (
    <ModalWrapperDialog open={open} onOpenChange={setOpen}  title='Notifications' className="md:max-w-[700px]">
      <div className='max-h-[70vh] '>
        {notifications.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>
            No notifications yet
          </div>
        ) : (
          <div className='space-y-4'>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 rounded-lg border transition-colors",
                  notification.is_read
                    ? "bg-white border-gray-200"
                    : "bg-blue-50 border-blue-200"
                )}
              >
                <div className='flex justify-between items-start gap-4'>
                  <div className='flex-1'>
                    <p
                      className={cn(
                        "text-gray-800 mb-2",
                        !notification.is_read && "font-medium"
                      )}
                    >
                      {notification.message}
                    </p>
                    <div className='flex items-center gap-3 text-sm'>
                      <span
                        className={cn("px-2 py-1 rounded-full text-xs", {
                          "bg-green-100 text-green-800":
                            notification.status === "delivered",
                          "bg-yellow-100 text-yellow-800":
                            notification.status === "pending",
                          "bg-red-100 text-red-800":
                            notification.status === "cancelled",
                        })}
                      >
                        {notification.status}
                      </span>
                      <span className='text-gray-500'>
                        {formatNotiticationDate(notification.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalWrapperDialog>
  );
};
