import { useQuery } from "@tanstack/react-query";
import AuthService from "../lib/service";
import { Role } from "../models/types";
export function getMeQueryKey() {
  return ["me"];
}
export function useGetMeQuery(role: Role) {
  const query = useQuery({
    queryKey: getMeQueryKey(),
    queryFn: () => AuthService.getCurrentUser(role),
  });
  return {
    isLoading: query.isLoading,
    isError: query.error,
    data: query.data,
  };
}
