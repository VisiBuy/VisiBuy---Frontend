import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/modules/Auth/lib/service";
import { IUpdateUser, LoginCredentials } from "@/modules/Auth/models/types";
import { getMeQueryKey } from "@/modules/Auth/queries/queries";
import { useNavigate } from "react-router-dom";
import { dashboardConfig } from "@/lib/config";
export function useUpdateSeller() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload:IUpdateUser) => AuthService.updateSeller(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
      
    },
  });
}
