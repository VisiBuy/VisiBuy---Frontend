// useToast.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/app-hooks";
import {
  addToast,
  updateToast,
  dismissToast,
  removeToast,
  selectToasts,
  ToastProps,
} from "./toastSlice";

export function useToast() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);

  const toast = useCallback(
    (props: ToastProps) => {
      const id = Date.now().toString();
      dispatch(addToast(props));

      const dismiss = () => dispatch(dismissToast(id));
      const update = (props: Partial<ToastProps>) =>
        dispatch(updateToast({ id, ...props }));

      // Auto-dismiss after duration
      if (props.duration) {
        setTimeout(() => {
          dismiss();
        }, props.duration);
      }

      return {
        id,
        dismiss,
        update,
      };
    },
    [dispatch]
  );

  const dismissAll = useCallback(() => {
    dispatch(dismissToast(undefined));
  }, [dispatch]);

  return {
    toast,
    dismissAll,
    toasts,
  };
}
