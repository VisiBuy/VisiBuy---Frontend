import { Button } from "../../../../ui/Button";
import { ProductGrid } from "./components/product-grid";
import { ISellerProductQueryParams } from "../../models/product";
import { Plus } from "lucide-react";
import { AddProductModal } from "./components/modals/add-product-modal";
import { useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { createQueryString } from "../../../../lib/utils";
import { MainLayout } from "../../../../layouts/main-layout";
import { Spinner } from "../../../../common/components/spinner";
import { Pagination } from "../../../../common/components/pagination";
import { useGetProducts } from "../../queries/product/queries";
import { SellerProductQueryBuilder } from "../../lib/products/product-query-builder";

import { OverlaySpinner } from "../../../../common/components/modal-spinner";

export function ProductScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<ISellerProductQueryParams>({
    page: 1,
    pageSize: 10,
  });
  const handleAddProduct = useCallback(
    function () {
      const queryStrings = createQueryString(
        "modal",
        "add-product",
        searchParams.toString()
      );
      setSearchParams(queryStrings);
    },
    [searchParams]
  );
  const { data, isFetching } = useGetProducts(queryParams);

  // console.log(  data?.totalPages ,"totalpages");
  return (
    <div>
      <MainLayout
        title='Product List'
        className='w-full relative'
        id='product-screen'
      >
        {data?.data && data.data.length > 0 && (
          <ProductGrid products={data.data} />
        )}
        {data?.data && data.data.length == 0 && (
          <div className='flex flex-col min-h-screen justify-center items-center '>
            <img src='/product-inactive.png' alt='No active product' />
            <h2 className='text-4xl font-Montserrat font-medium'>
              There are no active product
            </h2>
            <p className='text-2xl font-OpenSans my-6'>
              Add new products by clicking on the add product button below
            </p>
            <Button
              size='lg'
              onClick={handleAddProduct}
              className='text-secondary-foreground font-regular text-2xl justify-evenly gap-6 bg-light-gray border-none hover:bg-light-gray hover:text-secondary-foreground'
            >
              <Plus></Plus> Add new product
            </Button>
          </div>
        )}
        <AddProductModal />
        <OverlaySpinner open={isFetching} />
      </MainLayout>
      <Pagination<ISellerProductQueryParams>
        totalPages={data?.totalPages ?? 0}
        setQueryParam={setQueryParams}
        queryParams={queryParams}
        queryBuilder={SellerProductQueryBuilder}
        isFetching={isFetching}
      />
    </div>
  );
}
