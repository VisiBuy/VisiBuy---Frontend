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
import { Loader2, MoveRight } from "lucide-react";
import { Checkbox } from "../../../../ui/Checkbox";
import { useLogin } from "../../mutations/use-login";
import { Link } from "react-router-dom";
import Icon from "../../../../ui/Icon";

export function PasswordResetForm() {
  const { toast, toasts } = useToast();
  const loginMutation = useLogin();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: "",
      role: "seller",
      isRemeberChecked: false,
    },
  });
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      await loginMutation.mutateAsync(values);
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
      <h2 className="auth-heading mt-10">
        Forgot password?
      </h2>
      <p className="text-secondary-foreground text-lg sm:text-xl font-OpenSans mt-4">
        Enter registered email address of your account and we’ll send you a
        password reset link.
      </p>
      <div className="border-border border p-6 sm:p-8 mt-8 rounded-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start text-xl">
                    Email<span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      icon={<Icon name="mail" className="h-8 w-8" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                disabled={loginMutation.isPending || !form.formState.isValid}
                type="submit"
                className="w-full px-12 h-16 text-xl"
                size="sm"
              >
                Reset Password
                {loginMutation.isPending && (
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
