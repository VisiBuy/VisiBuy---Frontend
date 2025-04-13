import React, { PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/ui/Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";


interface PreviewProductLoaderProps extends PropsWithChildren {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PreviewProductLoader = (props: PreviewProductLoaderProps) => {
  const { open, setOpen, children } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="md:max-w-[800px] rounded-lg md:left-[60%] md:h-[500px] md:top-[60%]"
        style={{
          zIndex: 10000,
        }}
      >
        <div className="h-full flex flex-col items-center justify-center">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
