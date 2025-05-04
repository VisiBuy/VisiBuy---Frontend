import { AuthScreen } from "./AuthScreen";
import { SignUpForm } from "./features/components/signup-form";

export function SignUpScreen() {
  return <AuthScreen title="Sign Up" formComponent={<SignUpForm />} />;
}
