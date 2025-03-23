import { fetchProducts } from "@/modules/Buyer/features/product/productSlice";
import { selectFilteredProducts } from "@/modules/Buyer/selectors";
import { AppDispatch, RootState } from "@/store/store";
import ProductSkeleton from "@/ui/ProductSkeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Product {
  _id: string;
  model: string;
  images?: string[];
  storeName: string;
  storeAvatar: string;
  brand: string;
  size: number[];
  color: string[];
  price: number;
}

const BuyerProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.buyer.product.products
  );
  const filteredProducts = useSelector(selectFilteredProducts) || [];
  const filters = useSelector((state: any) => state.buyer.filters) || {};
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Determine the products to display (filtered or all)
  const displayedProducts = filtersApplied ? filteredProducts : products;

  return (
    <div>
      {/* Header with Filter Component */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold font-montserrat'>Products</h2>
        {/* <FilterComponent onApplyFilters={() => setFiltersApplied((prev) => !prev)} /> */}
      </div>

      {/* Product Grid using Tailwind CSS Masonry */}
      {displayedProducts.length > 0 ? (
        <div
          className='grid grid-rows-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-[240px] md:flex gap-6 p-6'
          style={{ flexWrap: "wrap" }}
        >
          {displayedProducts.map((product) => (
            <div
              key={product._id}
              className={`
                ${product.size.length > 2 ? "row-span-2" : ""}
                ${product.price > 500 ? "col-span-2" : ""}
              `}
            >
              <ProductSkeleton
                type='prod'
                product={product}
                key={product._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>No products available.</p>
      )}
    </div>
  );
};

export default BuyerProductsPage;
