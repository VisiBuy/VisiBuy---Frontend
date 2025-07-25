import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../lib/service";

import { useAppDispatch } from "../../../hooks/app-hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../features/slices";
import { dashboardConfig } from "../../../lib/config";
import { useToast } from "@/ui/use-toast";
import { IResetPassword } from "../models/types";

export function useResetPassword() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); // ✅ Initialize toast

  return useMutation({
    mutationFn: (payload: IResetPassword) => AuthService.resetPassword(payload),
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Password Update",
        description: "Password changed successfully",
        duration: 5000,
      });
      navigate("/login");
    },
    onError: (error: any) => {
      if (!error?.response) {
        // No server response, maybe a network/client error — don't toast
        return;
      }

      console.error(error?.response?.data?.msg);
      dispatch(setError(error?.response?.data?.msg || "Something went wrong."));
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error?.response?.data?.msg || "Invalid credentials or server error.",
        duration: 5000,
      });
    },
  });
}
