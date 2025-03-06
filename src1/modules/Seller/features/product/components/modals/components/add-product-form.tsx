import { AddProductSchema } from "../../../../../models/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../../../ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PreviewImagesCard } from "./preview-image-card";
import { Link } from "react-router-dom";
import { Textarea } from "../../../../../../../ui/Texarea";
import Input from "../../../../../../../ui/Input";
import MoneyInput from "../../../../../../../ui/MoneyInput";
import {
  ISearchableData,
  SearchableSelect,
} from "../../../../../../../ui/SearchableSelect";
const colorData: ISearchableData[] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
];
export function AddProductForm() {
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      size: "",
      brand: "",
      images: [],
      model: "",
      price: 0,
      description: "",
      stock_status: "In stock",
      color: "",
    },
  });
  return (
    <div>
      <Form {...form}>
        <form>
          <div className='flex gap-x-16'>
            <div className='flex-1'>
              <h3
                className='text-2xl mb-4 font-medium '
                style={{ color: "rgba(127, 128, 129, 1)" }}
              >
                Product Images Preview
              </h3>

              <PreviewImagesCard
                images={[
                  {
                    id: "1",
                    type: "",
                    size: 0,
                    name: "",
                    url: "/sneaker.png",
                  },
                ]}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-start text-xl mt-4 font-Montserrat'>
                      Description
                      <span className='text-destructive ml-1 '>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the item you're selling and provide complete and accurate details."
                        {...field}
                        className=' text-2xl rounded-xl h-48 resize-none'
                        maxLength={500}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-1'>
              <div className='flex justify-between font-Montserrat'>
                <h3 className='font-medium text-xl'>Images</h3>
                <Link to='/' className='text-blue underline  font-normal'>
                  Tips for taking pro photos{" "}
                </Link>
              </div>
              <p className='font-OpenSans mt-4'>
                Add at least 4 photos (PNG or JPEG, not more than 5MB). You can
                add up to 8 photos. Buyers want to see all details and angles
                (front view, back view, side view, top and button). 
              </p>
              <div className='flex flex-col gap-y-4'>
                <FormField
                  control={form.control}
                  name='model'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex justify-start text-xl font-Montserrat font-medium'>
                        Product Title
                        <span className='text-destructive ml-1'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Product Title'
                          {...field}
                          className=' text-xl'
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex justify-start text-xl'>
                        Brand
                        <span className='text-destructive ml-1'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Product Brand'
                          {...field}
                          className=' text-xl'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex justify-start text-xl'>
                        Price
                        <span className='text-destructive ml-1'>*</span>
                      </FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder='0.00'
                          {...field}
                          className=' text-xl'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='color'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex justify-start text-xl'>
                        Price
                        <span className='text-destructive ml-1'>*</span>
                      </FormLabel>
                      <FormControl className='relative'>
                        <SearchableSelect
                          data={colorData}
                          placeholder='Select '
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
