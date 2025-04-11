import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/ui/Dialog";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

interface ModalWrapperDialogProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  hasOverlay?: boolean;
  maxContentHeight?: string;
  open?: boolean;
  overlayClassName?: string;
  overlayOpacity?: number;
  onOpenChange?: (open: boolean) => void;
}

export const ModalWrapperDialog = ({
  trigger,
  title,
  description,
  children,
  footer,
  className,
  maxContentHeight = "60vh",
  open,
  overlayClassName,
  overlayOpacity = 0.75,
  onOpenChange,
  hasOverlay = true,
}: ModalWrapperDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {hasOverlay && (
        <DialogOverlay
          className={cn("fixed inset-0 z-50", overlayClassName)}
          style={{
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          }}
        />
      )}
      <DialogContent
        className={cn(
          "flex flex-col p-0 gap-0 sm:max-w-lg z-[10000]",
          className
        )}
      >
        <DialogHeader className="px-12 py-12 pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl md:text-3xl font-semibold font-Montserrat">
              {title}
            </DialogTitle>
            <DialogTrigger asChild className="bg-transparent">
              <Button
                variant="link"
                className="h-10 w-10 p-1  bg-light-gray rounded-full  opacity-70 border-transparent"
                aria-label="Close"
              >
                <X className="h-10 w-10" style={{ color: "#000" }} />
              </Button>
            </DialogTrigger>
          </div>
          {description && (
            <DialogDescription className="mt-2 text-gray-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div
          className="flex-1 overflow-y-auto px-12 py-3"
          style={{ maxHeight: maxContentHeight }}
        >
          {children}
        </div>

        {footer && (
          <DialogFooter
            className="p-6 pt-3 border-t"
            style={{
              boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)", // Slight shadow
              position: "relative",
              zIndex: 10,
            }}
          >
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
