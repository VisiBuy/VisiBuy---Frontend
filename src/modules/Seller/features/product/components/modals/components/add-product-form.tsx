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
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <div className="flex gap-x-10 mb-8">
            <div className="flex-1">
              <h3
                className="text-2xl mb-4 font-medium "
                style={{ color: "rgba(127, 128, 129, 1)" }}
              >
                Product Images Preview
              </h3>

              <PreviewImagesCard images={[...buildPreviewImages(imagesMap)]} />
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
            </div>
            <div className="flex-1">
              <div className="flex justify-between font-Montserrat">
                <h3 className="font-medium text-xl">Images</h3>
                <ModalWrapperDialog
                  trigger={
                    <div
                      ref={triggerRef}
                      className="text-blue underline text-lg cursor-pointer"
                    >
                      Tips for taking pro photos
                    </div>
                  }
                  hasOverlay={false}
                  title="Photo tips"
                  className="md:max-w-[700px] z-[15000]"
                  footer={
                    <div className="w-full px-12 pt-3">
                      <Button
                        className="w-full bg-primary text-white hover:bg-primary hover:text-white"
                        onClick={() => triggerRef.current!.click()}
                      >
                        Got It
                      </Button>
                    </div>
                  }
                >
                  <div>
                    <p className="text-light-gray-600 text-2xl font-OpenSans ">
                      To ensure precise product verification, please upload 5
                      real-time photos of the sneakers. Real-time images
                      guarantee the sneakers shown are the exact ones you’ll
                      deliver.
                    </p>
                    <div className="grid gap-x-6 gap-y-4 grid-cols-1 md:grid-cols-2 pt-8 ">
                      <div className="h-[300px]">
                        <img
                          src="/correct-sneaker-pic.png"
                          alt="correct-sneaker-picture"
                          className="h-full rounded-3xl"
                        />
                      </div>
                      <div className="h-[300px]">
                        <img
                          src="/bad-sneaker-pic.png"
                          alt="bad-sneaker-picture"
                          className="h-full rounded-3xl"
                        />
                      </div>
                    </div>
                    <h2 className="text-xl md:text-3xl font-semibold font-Montserrat mt-6 mb-8">
                      {" "}
                      Photo Requirements:
                    </h2>
                    <ol className="font-OpenSans font-normal text-lg md:text-2xl text-black   py-3 list-none counter-reset-step">
                      <li className=" pb-3 flex">
                        <span className=" ">1</span>
                        <span className="ml-4">
                          Full Profile: Capture a side view of both sneakers
                          together, highlighting the design, shape, and
                          alignment.
                        </span>
                      </li>
                      <li className="pb-3 flex">
                        <span className=" ">2</span>
                        <span className="ml-4">
                          Sole Details: Close-up of both soles to showcase tread
                          patterns and any branding.
                        </span>
                      </li>
                      <li className="pb-3 flex">
                        <span className=" ">3</span>
                        <span className="ml-4">
                          Top View & Lacing: Take a top-down photo of both
                          sneakers, emphasizing the lacing and upper profile.
                        </span>
                      </li>
                      <li className="pb-3 flex">
                        <span className=" ">4</span>
                        <span className="ml-4">
                          Logo & Size Label: Photograph brand logos and the size
                          label inside the sneaker, showing size, brand, and
                          serial numbers clearly.
                        </span>
                      </li>
                      <li className="pb-3 flex">
                        <span className=" ">5</span>
                        <span className="ml-4">
                          Material & Stitching Quality: Focus on close-ups of
                          material, stitching, and color to verify quality.
                        </span>
                      </li>
                    </ol>
                    <div className="grid gap-x-6 gap-y-4 grid-cols-1 md:grid-cols-2 pt-8 ">
                      <div className="h-[300px]">
                        <img
                          src="/sneaker-sample-1.png"
                          alt="correct-sneaker-picture"
                          className="h-full rounded-3xl"
                        />
                      </div>
                      <div className="h-[300px]">
                        <img
                          src="/sneaker-sample-2.png"
                          alt="correct-sneaker-picture"
                          className="h-full rounded-3xl"
                        />
                      </div>
                      <div className="h-[300px]">
                        <img
                          src="/sneaker-sample-3.png"
                          alt="correct-sneaker-picture"
                          className="h-full rounded-3xl"
                        />
                      </div>
                      <div className="h-[300px]">
                        <img
                          src="/sneaker-sample-4.png"
                          alt="correct-sneaker-picture"
                          className="h-full rounded-3xl"
                        />
                      </div>
                    </div>
                    <h2 className="text-xl md:text-3xl font-semibold font-Montserrat mt-6 mb-8">
                      Photo Quality Tips:
                    </h2>
                    <p className="text-2xl font-OpenSans">
                      Real-Time Only: Use live photos, not from your gallery, to
                      maintain authenticity.
                    </p>
                    <ul className="list-disc font-OpenSans text-lg md:text-2xl pl-8 mt-4 space-y-3">
                      <li>
                        Natural Lighting: Use well-lit areas for detailed
                        images.
                      </li>
                      <li>
                        White Background: A clean, white background enhances
                        clarity for verification.
                      </li>
                      <li>
                        High-Resolution: Ensure photos are sharp and focused for
                        accurate assessment.
                      </li>
                    </ul>
                  </div>
                </ModalWrapperDialog>
              </div>
              <div className="grid grid-cols-4 gap-x-8  gap-y-2 mt-4">
                {[...Array(8)].map((_, index) => (
                  <ImagePickerFactory
                    key={`${index}-${Id}`}
                    type="file"
                    onChange={handleFileUpload}
                    onRemoveImage={handleImageRemove}
                    className="w-36 h-36"
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
