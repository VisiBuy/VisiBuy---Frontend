import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginErrorResponse, LoginSchema } from "../../models/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/Form";
import { useToast } from "../../../../ui/use-toast";
import Input from "../../../../ui/Input";
import { Button } from "../../../../ui/Button";
import { Loader2 } from "lucide-react";
import { Checkbox } from "../../../../ui/Checkbox";
import { useLogin } from "../../mutations/use-login";
import { Link } from "react-router-dom";
import Icon from "../../../../ui/Icon";
import { useId } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const navigate = useNavigate();

  const checkboxId = useId(); // Generate a unique ID for the checkbox

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingDone(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    criteriaMode: "all",
    shouldFocusError: true,
    defaultValues: {
      pass: "",
      email: "",
      role: "buyer", // Correct valid role for schema
      isRememberChecked: false, // Correct spelling
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    if (!values.email || !values.pass) {
      return; // Stop here, don't even call login
    }

    await loginMutation.mutateAsync(values);
  };

  const isButtonDisabled = () =>
    loginMutation.isPending ||
    form.formState.isSubmitting ||
    !form.formState.isValid;

  // Redirect based on role after successful login
  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data?.role === "buyer") {
      navigate("/dashboard/buyer");
    }
  }, [loginMutation.isSuccess, loginMutation.data, navigate]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center min-h-screen px-4">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2
          className={`auth-heading mt-12 whitespace-nowrap overflow-hidden ${
            isTypingDone ? "" : "border-r-4 border-black animate-typing"
          }`}
        >
          Welcome back!
        </h2>
        <p className="text-secondary-foreground text-xl font-OpenSans mt-4">
          Please enter your login details.
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full border border-border p-8 rounded-2xl shadow-lg bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start text-xl">
                    Email/Phone Number
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="text-xl"
                      icon={<Icon name="mail" className="h-6 w-6" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem className="py-4">
                  <FormLabel className="flex justify-start text-xl items-center">
                    Password<span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      className="text-base"
                      type={showPassword ? "text" : "password"}
                      icon={
                        <Icon
                          name={showPassword ? "eye-off" : "eye"}
                          className="h-6 w-6 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRememberChecked"
              render={({ field }) => (
                <FormItem className="py-4">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        id={checkboxId} // Use dynamic id here
                      />
                      <FormLabel
                        htmlFor={checkboxId} // Refer to the dynamic id
                        className="flex justify-start text-xl"
                      >
                        Remember me
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                disabled={isButtonDisabled()}
                type="submit"
                className="w-full px-12 h-16 text-xl"
              >
                Sign In
                {loginMutation.isPending && (
                  <Loader2 className="ml-2 animate-spin" />
                )}
              </Button>
            </div>

            <div className="flex justify-center items-center text-xl text-secondary-foreground font-OpenSans mt-4">
              <h3>Don't have an account?</h3>
              <Button asChild variant="link" className="px-2 text-blue">
                <Link to="/signup" className="text-xl">
                  Sign Up
                </Link>
              </Button>
            </div>

            <Button asChild variant="link" className="h-2 text-blue">
              <Link to="/reset-password" className="text-xl font-OpenSans">
                Forgot Password
              </Link>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
