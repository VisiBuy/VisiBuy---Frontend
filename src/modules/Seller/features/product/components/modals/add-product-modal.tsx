import { ModalWrapperDialog } from "@/common/components/modal-wrappper";
import { dashboardConfig } from "@/lib/config";
import { useMemo, useRef, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AddProductForm } from "./components/add-product-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import { Button } from "@/ui/Button";
import { useToast } from "@/ui/use-toast";
import { useCreateSellerProduct } from "@/modules/Seller/mutations/product/useCreateSellerProduct";
import { ProductDto } from "@/modules/Seller/models/product";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "@/lib/systemConfig";
import { Loader2 } from "lucide-react";
import { ProductPreview } from "./components/product-preview";
import { Spinner } from "@/common/components/spinner";
import { PreviewProductLoader } from "./components/preview-product-loader";

export function AddProductModal() {
  const sellerProductRoute = dashboardConfig.getFullPath("seller", "products");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<any>();
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const createProductMutation = useCreateSellerProduct();
 
  const isOpen = searchParams.get("modal") === "add-product" && !isPreviewModal;
  function handleModalOpen() {
    setFormData(undefined);
    setIsPreviewModal(false)
    navigate(sellerProductRoute);
  }
  const handlesubmitButtonRef = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  const handleSubmitProduct = async () => {
    if (formData) {
      try {
        const newFormData = new FormData();
        // Append  basic form fields
        newFormData.append("model", formData.model);
        newFormData.append("brand", formData.brand);
        newFormData.append("price", formData.price.toString());
        newFormData.append("description", formData.description);
        newFormData.append("stock_status", formData.stock_status);
        // Append each color value individually
        // When using the same key multiple times, it's treated as an array on the server
        formData?.color.forEach((color: string | Blob) => {
          newFormData.append("color", color);
        });
        // Append each size value individually
        formData?.size.forEach((size: { toString: () => string | Blob }) => {
          newFormData.append("size", size.toString());
        });
        if (formData?.images) {
          formData?.images.forEach((value: { imageFile: string | Blob }) => {
            newFormData.append("images", value.imageFile);
          });
        }
        await createProductMutation.mutateAsync(newFormData);
        toast({
          variant: "success",
          title: "",
          description: SUCCESS_RESPONSE_CREATE_RECORD.replace(
            "{{MODEL}}",
            "Product"
          ),
          duration: 5000,
        });
        handleModalOpen();
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: JSON.stringify(
            error?.response.data.msg?.message || "An error occurred"
          ),
          duration: 5000,
        });
      }
    }
  };
  return (
    <>
      <PreviewProductLoader open={isLoadingModal} setOpen={() => {}}>
        <Spinner></Spinner>
      </PreviewProductLoader>
      {/* Product Preview  */}
      <ModalWrapperDialog
        title="Preview"
        open={isPreviewModal}
        onOpenChange={setIsPreviewModal}
        className="md:max-w-[800px]"
        footer={
          <div className=" flex justify-between gap-x-5 pr-4 py-2">
            <Button
              className="tex-sm lg:tex-xl px-12 bg-transparent border-black text-black font-Montserrat hover:text-black"
              onClick={() => setIsPreviewModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="tex-sm md:text-xl text-white px-12 font-Montserrat"
              onClick={handleSubmitProduct}
              disabled={createProductMutation.isPending}
            >
              Upload
              {createProductMutation.isPending && (
                <Loader2 className="ml-2 animate-spin" />
              )}
            </Button>
          </div>
        }
      >
        {formData && <ProductPreview productFormData={formData} />}
      </ModalWrapperDialog>
      {/* Add new product form */}
      <ModalWrapperDialog
        open={isOpen}
        onOpenChange={handleModalOpen}
        title=" Product Listing Form"
        className="max-w-[34rem] md:max-w-[800px]"
        footer={
          <div className=" flex justify-between gap-x-5 pr-4 py-2">
            <Button
              className="tex-sm lg:tex-xl px-12 bg-transparent border-black text-black font-Montserrat hover:text-black"
              onClick={handleModalOpen}
            >
              Cancel
            </Button>
            <Button
              className="tex-sm md:text-xl text-white px-12 font-Montserrat"
              onClick={handlesubmitButtonRef}
            >
              Preview
            </Button>
          </div>
        }
      >
        <AddProductForm
          submitButtonRef={submitButtonRef}
          setIsLoadingModal={setIsLoadingModal}
          setIsPreviewModal={setIsPreviewModal}
          formData={formData}
          setFormData={setFormData}
        />
      </ModalWrapperDialog>
    </>
  );
}
