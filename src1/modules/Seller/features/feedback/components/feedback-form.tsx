import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../ui/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FeedbackSchema } from "../../../models/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { on } from "events";
import Input from "../../../../../ui/Input";
import { Textarea } from "../../../../../ui/Texarea";
import { SearchableSelect } from "../../../../../ui/SearchableSelect";
import { useCreateSellerFeedback } from "../../../mutations/feedback/useCreateFeedback";
import { useToast } from "../../../../../ui/use-toast";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "../../../../../lib/systemConfig";
import { Button } from "../../../../../ui/Button";
import { Loader2 } from "lucide-react";

export function FeedBackForm() {
  const { toast, toasts } = useToast();
  const sellerFeedbackMutation = useCreateSellerFeedback();
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    mode: "onTouched",
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      issue: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof FeedbackSchema>) => {
    try {
      await sellerFeedbackMutation.mutateAsync(values);
      form.reset();
      toast({
        variant: "success",
        title: "",
        description: SUCCESS_RESPONSE_CREATE_RECORD.replace(
          "{{MODEL}}",
          "Feedback"
        ),
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.response.data.msg,
        duration: 5000,
      });
    }
  };
  return (
    <div>
      <h3 className='font-Montserrat font-semibold text-secondary-foreground text-3xl'>
        Update visibuy.
      </h3>
      <p className='font-OpenSans font-normal text-3xl mt-6'>
        You can get in touch with us anytime via our mail{" "}
        <a
          href='mailto:support@visibuy.com'
          className='text-blue bg-background underline'
        >
          support@visibuy.com
        </a>{" "}
        or through the form below:
      </p>

      <Form {...form}>
        <form
          className='flex flex-col gap-6 mt-8 max-w-screen-sm'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='joel pillar'
                    {...field}
                    className=' text-xl rounded-xl'
                  />
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
                <FormControl>
                  <Input
                    placeholder='example@gmail.com'
                    {...field}
                    className=' text-xl rounded-xl'
                    //   icon={<Icon name="mail" className="h-8 w-8" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='issue'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Share your thought with us'
                    {...field}
                    className=' text-2xl rounded-xl h-48 resize-none'
                    maxLength={250}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='pt-4 w-full flex justify-end'>
            <Button
              disabled={
                sellerFeedbackMutation.isPending || !form.formState.isValid
              }
              type='submit'
              className='bg-blue border-blue px-12 h-12 text-xl hover:border-blue hover:text-blue'
              size='sm'
            >
              Submit
              {sellerFeedbackMutation.isPending && (
                <Loader2 className='ml-2 animate-spin' />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
