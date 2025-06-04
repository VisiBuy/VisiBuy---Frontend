import {
  BuyerSchema,
  LoginCredentials,
  RoleUpdatePayloadMap,
  LoginResponse,
  RegisterResponse,
  Role,
  SellerSchema,
  User,
  IResetPassword,
  IForgotPassword,
} from "../models/types";

interface AuthRepository {
  registerBuyer(payload: BuyerSchema): Promise<RegisterResponse>;
  registerSeller(payload: SellerSchema): Promise<RegisterResponse>;
  loginAsBuyer(credentials: LoginCredentials): Promise<LoginResponse>;
  loginAsSeller(credentials: LoginCredentials): Promise<LoginResponse>;
  getUser(token: string, role: Role): Promise<User>;
  getCurrentUser(token: string, role: Role): Promise<User>;
  forgotPassword(payload: IForgotPassword): Promise<void>;
  resetPassword(payload: IResetPassword): Promise<void>;
  logout(): Promise<void>;
  updateUser<K extends keyof RoleUpdatePayloadMap>(
    role: K,
    payload: RoleUpdatePayloadMap[K],
  ): Promise<void>;
}

export default AuthRepository;
