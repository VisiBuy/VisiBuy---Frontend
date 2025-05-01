import { AddProductSchema } from "@/modules/Seller/models/product";
import { ModalWrapperDialog } from "@/common/components/modal-wrappper";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PreviewImagesCard } from "./preview-image-card";
import { Link } from "react-router-dom";
import { Textarea } from "@/ui/Texarea";
import Input from "@/ui/Input";
import MoneyInput from "@/ui/MoneyInput";
import { ISearchableData } from "@/ui/SearchableSelect";
import { Button } from "@/ui/Button";

import { Combobox } from "@/ui/combobox";
import ImagePickerFactory from "@/common/components/image-picker-factory";
import { useCreateSellerProduct } from "@/modules/Seller/mutations/product/useCreateSellerProduct";
import { useToast } from "@/ui/use-toast";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "@/lib/systemConfig";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const colors: ISearchableData[] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
];
const sizes: ISearchableData[] = [
  { value: "2", label: "2" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3" },
  { value: "3.5", label: "3.5" },
];
interface AddProductFormProps {
  submitButtonRef: React.RefObject<HTMLButtonElement>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setIsLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AddProductForm({
  submitButtonRef,
  setIsLoadingModal,
  setIsPreviewModal,
  formData,
  setFormData,
}: Readonly<AddProductFormProps>) {
  const Id = useId();
  const { toast } = useToast();
  const isLargeScreen = useMediaQuery(1024);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [imagesMap, setImagesMap] = useState(new Map());
  const [imageFiles, setImageFiles] = useState<any>();
  const createProductMutation = useCreateSellerProduct();
  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      size: formData?.size || [],
      brand: formData?.brand || "",
      //images: [],
      model: formData?.model || "",
      price: formData?.price || "",
      description: formData?.description || "",
      stock_status: formData?.stock_status || "in_stock",
      color: formData?.color || [],
    },
  });

  const handleImageRemove = (id: string | undefined) => {
    if (id) {
      setImagesMap((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.delete(id);
        return newMap;
      });
    }
  };
  const handleFileUpload = (
    id: string,
    imageLink: string | undefined,
    imageFile: File | undefined
  ) => {
    setImagesMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (imageLink && imageFile) {
        newMap.set(id, { imageLink, imageFile, id });
      } else {
        newMap.delete(id);
      }
      return newMap;
    });
  };

  useEffect(() => {
    /**
     * Initializes and renders images from formData when available.
     * Triggers during initial page load and after form preview cancellation.
     * This ensures image data persistence back to the form state.
     */
    const imagesMap = new Map();
    if (!formData) return;
    formData.images.forEach(
      (value: { id: any; imageLink: string; imageFile: File }, index: any) =>
        imagesMap.set(value.id, value)
    );
    setImagesMap(imagesMap);
  }, []);

  const onSubmit = async (data: z.infer<typeof AddProductSchema>) => {
    console.log("Form submitted:", data);
    setIsLoadingModal(true);
    if (imageFiles && imageFiles?.length < 4) {
      setIsLoadingModal(false);
      return;
    } // block submission of form
    const finalFormData = {
      ...data,
      // Add processed images to the form data
      images: imageFiles,
    };
    console.log("Form submitted:", finalFormData);
    // Add your form submission logic here
    setFormData(finalFormData);
    setIsLoadingModal(false);
    setIsPreviewModal(true);
  };

  useEffect(() => {
    const extractedImagesFiles = Array.from(imagesMap.entries()).map(
      ([id, value]) => value
    );
    setImageFiles(extractedImagesFiles);
  }, [imagesMap]);

  const buildPreviewImages = useCallback(
    (imagesMap: Map<any, any>) => {
      return Array.from(imagesMap.entries())
        .slice(0, 4) // pick first 4 images
        .map(([id, value]) => {
          return {
            id: id,
            name: "",
            url: value.imageLink,
          };
        });
    },
    [imagesMap]
  );

  const handleCustomSizeAdded = async (option:any) => {
    // Validate that the custom option is a valid number
    const sizeValue = Number(option.label);
    if (isNaN(sizeValue) || sizeValue <= 0 || sizeValue > 100) {
      // Handle invalid custom size
      form.setError("size", {
        type: "manual",
        message: "Please enter a valid size between 1 and 100",
      });

      // Remove the invalid size from the form values
      const currentSizes = form.getValues("size");
      form.setValue(
        "size",
        currentSizes.filter((size) => size !== option.value),
        { shouldValidate: true }
      );
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <div className="lg:flex gap-x-10 mb-8">
            <div className="flex-1">
              <h3
                className="text-2xl mb-4 font-medium "
                style={{ color: "rgba(127, 128, 129, 1)" }}
              >
                Product Images Preview
              </h3>

              <PreviewImagesCard images={[...buildPreviewImages(imagesMap)]} />
              {isLargeScreen && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl mt-4 font-Montserrat">
                        Description
                        <span className="text-destructive ml-1 ">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the item you're selling and provide complete and accurate details."
                          {...field}
                          className=" text-2xl rounded-xl h-48 resize-none"
                          maxLength={500}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between font-Montserrat mt-4 lg:mt-0">
                <h3 className="font-medium text-xl">Images</h3>
                
              </div>
              <div className="grid grid-cols-3  md:grid-cols-4  gap-x-8  gap-y-4 mt-4">
                {[...Array(8)].map((_, index) => (
                  <ImagePickerFactory
                    key={`${index}-${Id}`}
                    type="file"
                    onChange={handleFileUpload}
                    onRemoveImage={handleImageRemove}
                    className="w-36 h-36 md:w-56 lg:w-36"
                    imageLink={formData?.images[index]?.imageLink ?? ""}
                    imageLinkId={formData?.images[index]?.id ?? ""}
                  />
                ))}
              </div>
              {imageFiles && imageFiles.length < 4 && (
                <p className="text-destructive my-3 text-xl">
                  Upload atleast four images
                </p>
              )}
              <p className="font-OpenSans my-4 text-xl">
                Add at least 4 photos (PNG or JPEG, not more than 5MB). You can
                add up to 8 photos. Buyers want to see all details and angles
                (front view, back view, side view, top and button).
              </p>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl font-Montserrat font-medium ">
                        Product Title
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product Title"
                          {...field}
                          className=" text-xl"
                          name="model"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl">
                        Brand
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Product Brand"
                          {...field}
                          className=" text-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl">
                        Price
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="0.00"
                          {...field}
                          className=" text-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl">
                        Color
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          options={colors}
                          form={form}
                          name="color"
                          placeholder="Select one or more color"
                          multiselect={true}
                          allowCustomOptions
                          customOptionLabel="Add your custom color"
                          searchPlaceholder="Type to search or enter your custom shoe color..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl">
                        Size
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          options={sizes}
                          form={form}
                          name="size"
                          placeholder="Select one or more sizes"
                          multiselect={true}
                          allowCustomOptions
                          customOptionLabel="Add your custom size"
                          onCustomOptionAdded={handleCustomSizeAdded}
                          searchPlaceholder="Type to search or enter your custom shoe size..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-start text-xl">
                        Stock Status
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          options={[
                            { label: "In Stock", value: "in_stock" },
                            { label: "Out of Stock", value: "out_stock" },
                          ]}
                          form={form}
                          name="stock_status"
                          placeholder="Select a stock status"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isLargeScreen && (
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start text-xl mt-4 font-Montserrat">
                          Description
                          <span className="text-destructive ml-1 ">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the item you're selling and provide complete and accurate details."
                            {...field}
                            className=" text-2xl rounded-xl h-48 resize-none"
                            maxLength={500}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          {/* Hidden submit button that will be triggered via ref */}
          <button
            type="submit"
            ref={submitButtonRef}
            style={{ display: "none" }}
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  );
}
