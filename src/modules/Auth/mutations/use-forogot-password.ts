import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../lib/service";
import { IForgotPassword, LoginCredentials, Role } from "../models/types";
import { getMeQueryKey } from "../queries/queries";
import { useAppDispatch } from "../../../hooks/app-hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../features/slices";
import { dashboardConfig } from "../../../lib/config";
import { useToast } from "@/ui/use-toast";

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); // ✅ Initialize toast

  return useMutation({
    mutationFn: (payload: IForgotPassword) => AuthService.forgotPassword(payload),
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Password reset",
        description:
          "An Email has been sent to the registered account. Please check your inbox",
        duration: 5000,
      });
      navigate("/reset-password");
    },
    onError: (error: any) => {
      if (!error?.response) {
        // No server response, maybe a network/client error — don't toast
        return;
      }

      console.error(error?.response?.data?.msg);
      dispatch(setError(error?.response?.data?.msg || "Something went wrong."));
      toast({
        variant: "success",
        title: "Password reset",
        description:
          "An Email has been sent to the registered account. Please check your inbox",
        duration: 5000,
      });
    },
  });
}
