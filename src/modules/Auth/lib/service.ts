import AuthApi from "@/modules/Auth/lib/api";
import {
  SignupCredentials,
  LoginCredentials,
  Role,
  UpdateBuyerPayload,
  UpdateSellerPayload
} from "@/modules/Auth/models/types";
import { transformUserData } from "./transofmers";


type UpdatePayload = UpdateBuyerPayload | UpdateSellerPayload;

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
async function updateUser(role: Role, payload: UpdatePayload) {
  return await AuthApi.updateUser(role as any, payload); 
}
async function logout() {
  await AuthApi.logout();
}

export default { login, logout, registerSeller, registerBuyer, getCurrentUser };
