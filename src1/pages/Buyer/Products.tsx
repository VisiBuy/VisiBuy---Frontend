import FilterComponent from "../../modules/Buyer/features/filter/Filter";
import { fetchProducts } from "../../modules/Buyer/features/product/productSlice";
import { selectFilteredProducts } from "../../modules/Buyer/selectors";
import { AppDispatch, RootState } from "../../store/store";
import ProductSkeleton from "../../ui/ProductSkeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Product {
  id: string;
  images?: string;
  storeName: string;
  storeAvatar: string;
  productName: string;
  size: number[];
  color?: string[];
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

  // console.log("Products from Redux:", products);
  const filteredProducts = useSelector(selectFilteredProducts) || [];
  const filters = useSelector((state: any) => state.buyer.filters) || {};
  const [filtersApplied, setFiltersApplied] = useState(false);

  // const filtersApplied =
  //   (filters?.size?.length ?? 0) > 0 ||
  //   (filters?.color?.length ?? 0) > 0 ||
  //   (filters?.priceRange?.[0] ?? 0) !== 0 ||
  //   (filters?.priceRange?.[1] ?? 1000) !== 1000;

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2>Products</h2>
        <FilterComponent
          onApplyFilters={() => setFiltersApplied((prev) => !prev)}
        />
      </div>

      {/* Show filtered products if filters are applied */}
      {filtersApplied ? (
        filteredProducts.length > 0 ? (
          <div>
            {filteredProducts.map((product) => (
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
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
          {products?.map((product: any) => (
            <ProductSkeleton type='prod' key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerProductsPage;
