import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Role, SignupUserSchema } from "../../models/types";
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
import { useCreateBuyer } from "../../mutations/use-register-buyer";
import { useCreateSeller } from "../../mutations/use-register-seller";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import Icon from "../../../../ui/Icon";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "../../../../lib/systemConfig";
import { UserActivityTracker } from "@/lib/activity-tracker/user-activity-tracker";
import { facebookTracker } from "@/lib/activity-tracker/facebook-tracker";
import { setCredentials } from "../slices";
import { useAppDispatch } from "@/hooks/app-hooks";
import { dashboardConfig } from "@/lib/config";

export function SignUpForm() {
  const [role, setRole] = useState<Role>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const buyerMutation = useCreateBuyer();
  const sellerMutation = useCreateSeller();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (sellerMutation.isSuccess || buyerMutation.isSuccess) {
      toast({
        variant: "success",
        title: "",
        description: SUCCESS_RESPONSE_CREATE_RECORD.replace(
          "{{MODEL}}",
          "Account"
        ),
        duration: 5000,
      });
    }
    if (sellerMutation.data?.token || buyerMutation.data?.token) {
      const token =
        role === "buyer"
          ? buyerMutation.data?.token
          : sellerMutation.data?.token;
      dispatch(setCredentials({ token, role }));
      if (role === "seller") {
        navigate(dashboardConfig.getFullPath(role as Role, "products"));
      } else {
        navigate(dashboardConfig.getConfig(role as Role).basePath);
      }
    }
  }, [sellerMutation.isSuccess, buyerMutation.isSuccess]);

  const form = useForm<z.infer<typeof SignupUserSchema>>({
    mode: "onTouched",
    resolver: zodResolver(SignupUserSchema),
    defaultValues: {
      pass: "",
      email: "",
      fullName: "",
      phone: "",
      address: "",
      confirmPassword: "",
      tos: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupUserSchema>) => {
    const userActivityTracker = new UserActivityTracker([facebookTracker]); // array of trackers to send data
    try {
      if (role === "buyer") {
        await buyerMutation.mutateAsync(values);
        userActivityTracker.trackActivity("track", "CompleteRegistration", {
          content_name: "Signup",
          user_type: "buyer",
          email: values.email,
          name: values.fullName,
        });
      } else {
        await sellerMutation.mutateAsync(values);
        userActivityTracker.trackActivity("track", "CompleteRegistration", {
          content_name: "Signup",
          user_type: "seller",
          email: values.email,
          name: values.fullName,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response?.data?.msg || "Something went wrong",
        duration: 5000,
      });
    }
  };

  return (
    <div className='w-full flex justify-center items-center px-4 py-16'>
      <div className='w-full max-w-2xl'>
        <h2 className='auth-heading'>Create your account.</h2>
        <p className='text-secondary-foreground text-lg md:text-xl font-OpenSans mt-2 text-center'>
          Shop with certainty using VisiBuy.
        </p>

        <div className='flex justify-center mt-6'>
          <Button
            className={cn(
              "rounded-none border border-blue rounded-l-lg",
              role === "buyer" ? "btn-role-active" : "btn-role-inactive"
            )}
            onClick={() => setRole("buyer")}
          >
            Signup as Buyer
          </Button>
          <Button
            className={cn(
              "rounded-none border border-blue rounded-r-lg",
              role === "seller" ? "btn-role-active" : "btn-role-inactive"
            )}
            onClick={() => setRole("seller")}
          >
            Signup as Seller
          </Button>
        </div>

        <div className='border border-border p-6 md:p-8 mt-8 rounded-2xl bg-white'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Full Name */}
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormLabel className='text-xl !text-left block'>
                      Full Name<span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Full Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormLabel className='text-xl !text-left block'>
                      Email<span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Email'
                        {...field}
                        icon={<Icon name='mail' className='h-6 w-6' />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormLabel className='text-xl !text-left block'>
                      Phone<span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Phone number'
                        {...field}
                        icon={<Icon name='phone' className='h-6 w-6' />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormLabel className='text-xl !text-left block'>
                      Address<span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='Address' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name='pass'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormLabel className='text-xl !text-left block'>
                      Password<span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Password'
                        type={showPassword ? "text" : "password"}
                        {...field}
                        icon={
                          <Icon
                            name={showPassword ? "eye-off" : "eye"}
                            className='h-6 w-6 cursor-pointer'
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
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormLabel className='text-xl !text-left block'>
                      Confirm Password
                      <span className='text-destructive ml-1'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirm password'
                        type={showConfirmPassword ? "text" : "password"}
                        {...field}
                        icon={
                          <Icon
                            name={showConfirmPassword ? "eye-off" : "eye"}
                            className='h-6 w-6 cursor-pointer'
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

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name='tos'
                render={({ field }) => (
                  <FormItem className='py-2'>
                    <FormControl>
                      <div className='flex items-start gap-2'>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id='tos'
                          className='mt-1'
                        />
                        <label htmlFor='tos' className='text-base text-left'>
                          By selecting the box, you agree to the{" "}
                          <Button
                            asChild
                            variant='link'
                            className='inline px-1 text-blue'
                          >
                            <Link to='/login'>Terms & Conditions</Link>
                          </Button>{" "}
                          of VisiBuy.
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className='pt-6'>
                <Button
                  disabled={
                    buyerMutation.isPending ||
                    sellerMutation.isPending ||
                    !form.formState.isValid
                  }
                  type='submit'
                  className='w-full h-14 text-lg'
                >
                  Sign Up
                  {(buyerMutation.isPending || sellerMutation.isPending) && (
                    <Loader2 className='ml-2 animate-spin' />
                  )}
                </Button>
              </div>

              {/* Login + Forgot Password */}
              <div className='flex flex-col md:flex-row justify-between items-center text-lg text-secondary-foreground mt-6'>
                <div className='flex items-center space-x-1'>
                  <span>Already have an account?</span>
                  <Button asChild variant='link' className='text-blue px-1'>
                    <Link to='/login'>Sign In</Link>
                  </Button>
                </div>
                <Button asChild variant='link' className='text-blue px-1'>
                  <Link to='/reset-password'>Forgot Password?</Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}