import AuthRepository from "@/modules/Auth/respository/auth-repository";
import {
  User,
  LoginCredentials,
  LoginResponse,
  Role,
  RegisterResponse,
  SignupCredentials,
  IUpdateUser,
} from "@/modules/Auth/models/types";
import { apiClient, axiosWithAuth } from "@/lib/client";
class AuthApiAdapter implements AuthRepository {
  async registerBuyer(payload: SignupCredentials): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register/buyer",
      payload,
    );
    return response.data;
  }
  async registerSeller(data: SignupCredentials): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register/seller",
      data,
    );
    return response.data;
  }
  async loginAsBuyer(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  }

  async loginAsSeller(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  }
  async getUser(role: Role): Promise<User> {
    const response = await axiosWithAuth.get(`/user/${role}`);
    return response.data;
  }
  async getCurrentUser(role: Role): Promise<User> {
    const response = await this.getUser(role);
    return response;
  }
  async updateUser<T>(role: Role, payload: T): Promise<void> {
    await axiosWithAuth.put(`/user/${role}`, payload);
  }
  async logout(): Promise<void> {
   await apiClient.post("/logout");
  }
}
export default new AuthApiAdapter();
