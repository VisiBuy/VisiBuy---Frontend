import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  LoginErrorResponse,
  LoginSchema,
  ResetPasswordSchema,
} from "../../models/types";
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
import { Loader2, MoveRight } from "lucide-react";
import { Checkbox } from "../../../../ui/Checkbox";
import { useLogin } from "../../mutations/use-login";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../../../../ui/Icon";
import { useResetPassword } from "../../mutations/use-reset-password";
import { useEffect, useState } from "react";

export function PasswordResetForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast, toasts } = useToast();
  const resetPasswordMutation = useResetPassword();
  const [params, setParmas] = useSearchParams();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      pass: "",
      confirmPass: "",
      resetToken: "",
    },
  });
  useEffect(() => {
    form.setValue("resetToken", params.get("code") ?? "");
  }, [form]);
  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    try {
      //const resetToken = params.get("code") ?? "";
     
      await resetPasswordMutation.mutateAsync(values);
    } catch (error: any) {
      console.log(error?.response.data.msg);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response.data.msg,
        duration: 5000,
      });
    }
  };
  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="auth-heading mt-10">Reset Password?</h2>
      <p className="text-secondary-foreground text-lg sm:text-xl font-OpenSans mt-4">
        Enter your new password and the reset code sent to your email .
      </p>
      <div className="border-border border p-6 sm:p-8 mt-8 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Password */}
            <FormField
              control={form.control}
              name="pass"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel className="text-xl !text-left block">
                    Password<span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel className="text-xl !text-left block">
                    Confirm Password
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      icon={
                        <Icon
                          name={showConfirmPassword ? "eye-off" : "eye"}
                          className="h-6 w-6 cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                disabled={
                  resetPasswordMutation.isPending || !form.formState.isValid
                }
                type="submit"
                className="w-full px-12 h-16 text-xl"
                size="sm"
              >
                Reset Password
                {resetPasswordMutation.isPending && (
                  <Loader2 className="ml-2 animate-spin" />
                )}
              </Button>
            </div>
            <div className="flex justify-center items-center text-xl text-secondary-foreground font-OpenSans mt-4">
              <h3>Back to</h3>
              <Button asChild variant="link" className="px-2 text-blue">
                <Link to="/login" className="text-xl">
                  Sign In
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
