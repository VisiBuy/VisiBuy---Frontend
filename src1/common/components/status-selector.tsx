import { capitalize, cn } from "../../lib/utils";
import { TOrderStatus } from "../../types/status";
import * as SelectPrimitive from "@radix-ui/react-select";
import Icon from "../../ui/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectScrollDownButton,
  SelectValue,
} from "../../ui/Select";
import { SelectTrigger } from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import React, { useCallback, useState, useRef } from "react";
import { useUpdateSellerOrderStatus } from "../../modules/Seller/mutations/order/useUpdateOrderStatus";
import { useAppDispatch } from "../../hooks/app-hooks";
import { setLoading } from "../../store/rootReducer";
import { useToast } from "../../ui/use-toast";
import { SUCCESS_RESPONSE_UPDATE_RECORD } from "../../lib/systemConfig";
const orderStatusVariants = cva(
  "text-lg w-[100px] h-10 focus:border-none outline-none bg-opacity-15",
  {
    variants: {
      status: {
        default: "text-[#28A745] bg-[#28A745] bg-blue h-11 ",
        pending: "text-[#007AFF] bg-[#007AFF] ",
        delivered: "text-primary bg-primary-150   ",
        dispatched: "text-[#FF6200] bg-[#FF6200]",
        accepted: "text-[#FFA600] bg-[#FFA600]    ",
        cancelled: "text-[#F41414] bg-[#F41414] ",
      },
    },
  }
);

function OrderSelectStatus({
  status,
  id,
}: Readonly<{ status: TOrderStatus; id: string }>) {
  const prevStatus = useRef(status);
  const { toast, toasts } = useToast();
  const dispatch = useAppDispatch();
  const updateSellerOrderStatusMutation = useUpdateSellerOrderStatus();
  const [orderStatus, setOrderStatus] = useState(status);

  const handleSetOrderStatus = useCallback(
    async (status: TOrderStatus) => {
      prevStatus.current = orderStatus;
      dispatch(setLoading(true));
      try {
        setOrderStatus(status);
        await updateSellerOrderStatusMutation.mutateAsync({ id, status });
        dispatch(setLoading(false));
        toast({
          variant: "success",
          title: "Sucess",
          description: SUCCESS_RESPONSE_UPDATE_RECORD.replace(
            "{{MODEL}}",
            "Order Status"
          ),
          duration: 5000,
        });
      } catch (error: any) {
        dispatch(setLoading(false));
        setOrderStatus(prevStatus.current); // if status update fails revert to old status
        console.log(error?.response.data.msg, prevStatus);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error?.response.data.msg,
          duration: 5000,
        });
      }
    },
    [updateSellerOrderStatusMutation.isPending, orderStatus]
  );
  return (
    <Select onValueChange={handleSetOrderStatus} value={orderStatus}>
      <SelectTrigger
        className={cn(orderStatusVariants({ status: orderStatus }))}
      >
        <SelectValue placeholder={capitalize(orderStatus)} />
      </SelectTrigger>
      <SelectContent className='bg-[#d5d1d1] font-OpenSans '>
        <SelectItem value='cancelled' className='focus:bg-[#C8E2FF]'>
          Cancelled
        </SelectItem>
        <SelectItem value='accepted' className='focus:bg-[#C8E2FF]'>
          Accepted
        </SelectItem>
        <SelectItem value='delivered' className='focus:bg-[#C8E2FF]'>
          Delivered
        </SelectItem>
        <SelectItem value='dispatched' className='focus:bg-[#C8E2FF]'>
          Dispatched
        </SelectItem>
        <SelectItem value='pending' className='focus:bg-[#C8E2FF]'>
          Pending
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
export default React.memo(OrderSelectStatus);
