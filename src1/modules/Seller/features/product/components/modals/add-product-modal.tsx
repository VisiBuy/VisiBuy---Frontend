import { ModalWrapper } from "../../../../../../common/components/modal-wrappper";
import { dashboardConfig } from "../../../../../../lib/config";
import { useMemo, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AddProductForm } from "./components/add-product-form";

export function AddProductModal() {
  const sellerProductRoute = dashboardConfig.getFullPath("seller", "products");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const isOpen = searchParams.get("modal") === "add-product";

  function handleModalOpen(open: boolean) {
    navigate(sellerProductRoute);
  }
  return (
    <ModalWrapper
      open={isOpen}
      setOpen={handleModalOpen}
      title='Product Listing Form'
    >
      <AddProductForm />
    </ModalWrapper>
  );
}
