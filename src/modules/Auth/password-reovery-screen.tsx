import { AuthScreen } from "./AuthScreen";
import { PasswordResetForm } from "./features/components/password-recovery-form";

export function PasswordResetScreen() {
  return <AuthScreen title="Password Recovery" formComponent={<PasswordResetForm />} />;
}
