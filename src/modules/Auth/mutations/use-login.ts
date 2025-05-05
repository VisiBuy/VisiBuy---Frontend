import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../lib/service";
import { LoginCredentials, Role } from "../models/types";
import { getMeQueryKey } from "../queries/queries";
import { useAppDispatch } from "../../../hooks/app-hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../features/slices";
import { dashboardConfig } from "../../../lib/config";
import { useToast } from "@/ui/use-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast(); // ✅ Initialize toast

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      AuthService.login(credentials),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
      dispatch(setCredentials(data));
      dispatch(setError(null));

      let redirectPath = localStorage.getItem("redirectPath");

      if (redirectPath) {
        if (!redirectPath.startsWith("#")) {
          redirectPath = "/";
        }
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      } else {
        const role = data.role.toLowerCase();
        if (role === "seller") {
          navigate(dashboardConfig.getFullPath(role as Role, "products"));
        } else {
          navigate(dashboardConfig.getConfig(role as Role).basePath);
        }
      }
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
