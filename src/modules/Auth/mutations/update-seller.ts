import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService, { UpdatePayload } from "@/modules/Auth/lib/service";
import {
  IUpdateUser,
  LoginCredentials,
  Role,
} from "@/modules/Auth/models/types";
import { getMeQueryKey } from "@/modules/Auth/queries/queries";
import { useNavigate } from "react-router-dom";
import { dashboardConfig } from "@/lib/config";

export function useUpdateSeller() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { role: Role; payload: UpdatePayload }) =>
      AuthService.updateUser(data.role, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
    },
  });
}
