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

export function AddProductModal() {
  const sellerProductRoute = dashboardConfig.getFullPath("seller", "products");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const isOpen = searchParams.get("modal") === "add-product";
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  function handleModalOpen(open: boolean) {
    navigate(sellerProductRoute);
  }
  const handlesubmitButtonRef = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };
  return (
    <ModalWrapperDialog
      open={isOpen}
      onOpenChange={handleModalOpen}
      title=" Product Listing Form"
      className="md:max-w-[800px]"
      footer={
        <div className=" flex gap-x-5 pr-4 py-2">
          <Button className="tex-sm lg:tex-xl px-12 bg-transparent border-black text-black font-Montserrat">
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
      <AddProductForm submitButtonRef={submitButtonRef} />
    </ModalWrapperDialog>
  );
}
