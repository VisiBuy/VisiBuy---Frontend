import {
  RESPONSE_ERROR_INVALID_DETAILS,
  VALIDATION_MAX_LENGTH,
  VALIDATION_MIN_LENGTH,
  VALIDATION_NOT_MATCH,
  VALIDATION_REQUIRED,
} from "@/lib/systemConfig";
import { ErrorResponse } from "@/types/error";
import { z, ZodType } from "zod";

export interface LoginCredentials {
  email: string;
  pass: string;
  role: Role;
  isRemeberChecked?: boolean;
}

export interface User {
  email: string;
  fullName: string;
  role: Role;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  role:Role| null
}
export interface LoginResponse {
  msg: string;
  token: string;
  role : Role
}
export interface LoginErrorResponse extends ErrorResponse {}
export type Role = "buyer" | "seller" | "admin";

export type RegisterResponse = {
  userId: string;
  token: string;
};

export interface SignupUser extends Omit<User, "role"> {
  address: string;
  email: string;
  pass: string;
  confirmPassword: string;
  phone: string;
  tos: boolean;
}
export const LoginSchema: ZodType<LoginCredentials> = z.object({
  email: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Email"),
    })
    .email({
      message: RESPONSE_ERROR_INVALID_DETAILS.replace("{{FIELD}}", "Email"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Email"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Email"),
    }),
  pass: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Password"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Password"),
    }),
  isRememberChecked: z
    .boolean({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Remember"),
    })
    .optional(),
  role: z.enum(["buyer", "seller"], {
    required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Role"),
  }),
});

export const SignupUserSchema: ZodType<SignupUser> = z
  .object({
    fullName: z
      .string({
        required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Firstname"),
        invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
          "{{FIELD}}",
          "Full Name"
        ),
      })
      .min(2, {
        message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Firstname"),
      })
      .max(100, {
        message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Firstname"),
      }),

    address: z
      .string({
        required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Address"),
        invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
          "{{FIELD}}",
          "Address"
        ),
      })
      .min(8, {
        message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Address"),
      })
      .max(200, {
        message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Address"),
      }),

    phone: z
      .string({
        required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Phone"),
        invalid_type_error: RESPONSE_ERROR_INVALID_DETAILS.replace(
          "{{FIELD}}",
          "Phone"
        ),
      })
      .min(2, {
        message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Phone"),
      })
      .max(100, {
        message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Phone"),
      }),

    email: z
      .string({
        required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Email"),
      })
      .email({
        message: RESPONSE_ERROR_INVALID_DETAILS.replace("{{FIELD}}", "Email"),
      })
      .min(2, {
        message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Email"),
      })
      .max(100, {
        message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Email"),
      }),
    pass: z
      .string({
        required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Password"),
      })
      .min(8, {
        message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Password"),
      }),
    confirmPassword: z
      .string({
        required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Password"),
      })
      .min(8, {
        message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Password"),
      }),
    tos: z.boolean({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Password"),
    }),
  })
  .refine((val) => val.pass === val.confirmPassword, {
    path: ['confirmPassword'],
    message: VALIDATION_NOT_MATCH.replace("{{FIELD}}", "Password"),
  });

export type SignupCredentials = z.infer<typeof SignupUserSchema>;
export type BuyerSchema = z.infer<typeof SignupUserSchema>;
export type SellerSchema = z.infer<typeof SignupUserSchema>;
