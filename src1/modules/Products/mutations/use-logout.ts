import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../../Auth/lib/service";
import { LoginCredentials } from "../../Auth/models/types";
import { getMeQueryKey } from "../../Auth/queries/queries";
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getMeQueryKey() });
    },
  });
}
