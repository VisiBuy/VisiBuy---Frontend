import { AuthScreen } from "./AuthScreen";
import { LoginForm } from "./features/components/login-form";

export function LoginScreen() {
  return <AuthScreen title="Login" formComponent={<LoginForm />} />;
}
