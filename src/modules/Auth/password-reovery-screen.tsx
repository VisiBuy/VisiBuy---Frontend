import { AuthScreen } from "./AuthScreen";
import { PasswordForgotForm } from "./features/components/password-recovery-form";

export function PasswordForgotScreen() {
  return (
    <AuthScreen
      title="Password Recovery"
      formComponent={<PasswordForgotForm />}
    />
  );
}
