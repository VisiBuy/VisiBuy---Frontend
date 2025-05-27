import AuthApi from "@/modules/Auth/lib/api";
import {
  SignupCredentials,
  LoginCredentials,
  Role,
  IUpdateUser,
} from "@/modules/Auth/models/types";
import { transformUserData } from "./transofmers";

async function login(credentials: LoginCredentials) {
  if (credentials.role === "buyer") {
    return await AuthApi.loginAsBuyer(credentials);
  }

  return await AuthApi.loginAsSeller(credentials);
}
async function registerBuyer(payload: SignupCredentials) {
  return await AuthApi.registerBuyer(payload);
}
async function registerSeller(payload: SignupCredentials) {
  return await AuthApi.registerSeller(payload);
}
async function getCurrentUser(role: Role) {
  const response = await AuthApi.getCurrentUser(role);
  return await transformUserData(response);
}
async function logout() {
  await AuthApi.logout();
}
async function updateSeller(payload: IUpdateUser) {
  const response = await AuthApi.updateSeller(payload);
  return response;
}

export default {
  login,
  logout,
  registerSeller,
  registerBuyer,
  getCurrentUser,
  updateSeller,
};
