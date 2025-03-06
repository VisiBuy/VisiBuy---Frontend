import React, { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../../ui/Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalWrapperProps extends PropsWithChildren {
  open: boolean;
  imgUrl?: string;
  setOpen: (open: boolean) => void;
  title: string;
  subTitle?: string | null;
}

export const ModalWrapper = (props: ModalWrapperProps) => {
  const { open, imgUrl, setOpen, title, subTitle, children } = props;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className='w-[94%] rounded-lg '
        style={{
          zIndex: 10000,
        }}
      >
        <DialogHeader className=' pt-6 pl-6 '>
          <div className='flex gap-2 items-center'>
            {/* <Image src={imgUrl} alt="mail open" width={24} height={24} /> */}

            <DialogTitle className='text-4xl font-Montserrat font-semibold text-secondary-foreground'>
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className=' text-lg'>
          {subTitle ? <p>{subTitle}</p> : null}

          <div className='mt-2 mb-6 px-6'>{children}</div>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
