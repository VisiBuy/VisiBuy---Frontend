import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "../lib/service";
import { SignupCredentials } from "../models/types";
export function useCreateSeller() {
  return useMutation({
    mutationFn: (input: SignupCredentials) => AuthService.registerSeller(input),
  });
}
