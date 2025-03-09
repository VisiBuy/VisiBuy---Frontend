import FilterComponent from "@/modules/Buyer/features/filter/Filter";
import { fetchProducts } from "@/modules/Buyer/features/product/productSlice";
import { selectFilteredProducts } from "@/modules/Buyer/selectors";
import { AppDispatch, RootState } from "@/store/store";
import ProductSkeleton from "@/ui/ProductSkeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Product {
  _id: string;
  model: string;
  images?: string;
  storeName: string;
  storeAvatar: string;
  productName: string;
  size: number[];
  color: string[];
  price: number;
}

const BuyerProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.buyer.product.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useSelector(selectFilteredProducts) || [];
  const filters = useSelector((state: any) => state.buyer.filters) || {};
  const [filtersApplied, setFiltersApplied] = useState(false);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold font-montserrat'>Products</h2>
        <FilterComponent
          onApplyFilters={() => setFiltersApplied((prev) => !prev)}
        />
      </div>

      {/* Show filtered products if filters are applied */}
      {filtersApplied ? (
        filteredProducts.length > 0 ? (
          <div>
            {filteredProducts.map((product: Product) => (
              <div key={product?._id} className='product-card'>
                <h3>{product?.model}</h3>
                <p>Size: {product.size.join(", ")}</p>
                <p>Color: {product?.color.join(", ")}</p>
                <p>Price: ${product?.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products match the selected filters.</p>
        )
      ) : (
        // Show all products only if no filters are applied
        <div className='flex gap-6 p-6' style={{ flexWrap: "wrap" }}>
          {products?.map((product: any) => (
            <ProductSkeleton type='prod' key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerProductsPage;
