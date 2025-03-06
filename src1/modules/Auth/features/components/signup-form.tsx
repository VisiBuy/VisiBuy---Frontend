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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import Icon from "../../../../ui/Icon";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "../../../../lib/systemConfig";

export function SignUpForm() {
  const [role, setRole] = useState<Role>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const buyerMutation = useCreateBuyer();
  const sellerMutation = useCreateSeller();
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
    try {
      if (role === "buyer") {
        await buyerMutation.mutateAsync(values);
      } else {
        await sellerMutation.mutateAsync(values);
      }
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
    <div className='w-[60%] py-28'>
      <h2 className='text-secondary-foreground font-bold text-5xl font-Montserrat '>
        Create your account.
      </h2>
      <p className='text-secondary-foreground text-xl font-OpenSans mt-4'>
        Shop with certainty using VisiBuy.
      </p>
      <div className='flex justify-center my-6'>
        <Button
          className={`${cn(
            "rounded-none rounded-l-lg bg-light-background text-secondary-foreground border-none hover:bg-light-gray",
            role === "buyer" ? "bg-light-background" : "bg-light-gray"
          )}`}
          onClick={() => setRole("buyer")}
        >
          Signup as User
        </Button>
        <Button
          className={`${cn(
            "rounded-none rounded-l-lg bg-light-background text-secondary-foreground border-none  hover:bg-light-light-background",
            role === "seller" ? "bg-light-background" : "bg-light-gray"
          )}`}
          onClick={() => setRole("seller")}
        >
          Signup as Vendor
        </Button>
      </div>
      <div className='border-border border p-8 mt-8 rounded-2xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormLabel className='flex justify-start text-xl items-center'>
                    Full Name<span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Full Name' {...field} className='' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex justify-start text-xl'>
                    Email<span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Email'
                      {...field}
                      className=''
                      icon={<Icon name='mail' className='h-8 w-8' />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormLabel className='flex justify-start text-xl items-center'>
                    Phone<span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Phone number'
                      {...field}
                      className=''
                      icon={<Icon name='phone' className='h-8 w-8' />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormLabel className='flex justify-start text-xl items-center'>
                    Address<span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Address' {...field} className='' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pass'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormLabel className='flex justify-start text-xl items-center'>
                    Password<span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Password'
                      {...field}
                      className=''
                      icon={<Icon name='eye' className='h-8 w-8' />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field, fieldState }) => (
                <FormItem className='py-4'>
                  <FormLabel className='flex justify-start text-xl items-center'>
                    Confirm Password
                    <span className='text-destructive ml-1'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='confirm password'
                      {...field}
                      className=''
                      type={showPassword ? "text" : "password"}
                      icon={
                        <Icon
                          name={showPassword ? "eye" : "eye-off"}
                          className='h-8 w-8'
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
              name='tos'
              render={({ field }) => (
                <FormItem className='py-4'>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id='tos'
                      />
                      <FormLabel
                        htmlFor='tos'
                        className='flex justify-start text-xl items-center'
                      >
                        By selecting the box, you agree to the{" "}
                        <Button
                          asChild
                          variant='link'
                          className='px-2 text-blue'
                        >
                          <Link to='/login' className='text-xl '>
                            Terms & Conditions
                          </Link>
                        </Button>{" "}
                        of visibuy
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='pt-4'>
              <Button
                disabled={
                  buyerMutation.isPending ||
                  sellerMutation.isPending ||
                  !form.formState.isValid
                }
                type='submit'
                className='w-full px-12 h-16 text-xl'
                size='sm'
              >
                Sign Up
                {(buyerMutation.isPending || sellerMutation.isPending) && (
                  <Loader2 className='ml-2 animate-spin' />
                )}
              </Button>
            </div>
            <div className='flex justify-center items-center text-xl text-secondary-foreground  font-OpenSans mt-4'>
              <h3>Don't have an account?</h3>
              <Button asChild variant='link' className='px-2 text-blue'>
                <Link to='/login' className='text-xl '>
                  Sign In
                </Link>
              </Button>
            </div>
            <Button asChild variant='link' className='h-2 text-blue'>
              <Link to='/reset-password' className='text-xl   font-OpenSans'>
                Forgot Password
              </Link>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
