import { AuthScreen } from "./AuthScreen";
import { PasswordResetForm } from "./features/components/password-reset-form";

export function PasswordResetScreen() {
  return (
    <AuthScreen
      title="Password Reset"
      formComponent={<PasswordResetForm />}
    />
  );
}
