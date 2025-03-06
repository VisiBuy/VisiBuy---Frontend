import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../lib/service";
import { LoginCredentials } from "../models/types";
import { getMeQueryKey } from "../queries/queries";
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
    },
  });
}
