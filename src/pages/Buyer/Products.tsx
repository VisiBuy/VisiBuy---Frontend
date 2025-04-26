import { fetchProducts } from "@/modules/Buyer/features/product/productSlice";
import { selectFilteredProducts } from "@/modules/Buyer/selectors";
import { AppDispatch, RootState } from "@/store/store";
import ProductSkeleton from "@/ui/ProductSkeleton";
import { useEffect, useState, useRef } from "react";
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
  const { products, loading, loadingMore, hasMore } = useSelector(
    (state: RootState) => state.buyer.product
  );
  const filteredProducts = useSelector(selectFilteredProducts) || [];
  const filters = useSelector((state: any) => state.buyer.filters) || {};
  const [filtersApplied, setFiltersApplied] = useState(false);

  const loader = useRef<HTMLDivElement | null>(null);

  // Fetch products whenever the page number changes
  // useEffect(() => {
  //   // Start loading
  //   setLoading(true);  
  //   dispatch(fetchProducts(page)).then((res) => {
  //     if (res.payload.length === 0) {
  //       setHasMore(false);
  //     }
  //   })
  //     // Stop loading when the fetch completes
  //     .finally(() => setLoading(false));  
  // }, [dispatch, page]);

  // Initial fetch (only once on mount)
  useEffect(() => {
    if (products?.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products?.length]);

  // Intersection Observer to trigger fetching more products when scrolling to the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading &&!loadingMore && hasMore) {
          // setPage((prev) => prev + 1); // Increment page to load more products
          dispatch(fetchProducts());
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [dispatch, loading, loadingMore, hasMore]);

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
      {displayedProducts?.length > 0 ? (
        <div
          className='grid grid-rows-[repeat(auto-fit,minmax(200px,1fr))] auto-cols-[251px] justify-center md:flex md:justify-normal gap-6 p-6'
          style={{ flexWrap: "wrap" }}
        >
          {displayedProducts.map((product) => (
            <ProductSkeleton type='prod' product={product} key={product._id} />
          ))}

          {/* Loading More Skeletons */}
          {/* {loadingMore &&
            [...Array(3)].map((_, idx) => (
              <ProductSkeleton key={`skeleton-${idx}`} type="skeleton" />
            ))} */}
            {loading && [...Array(3)].map((_, i) => (
              <ProductSkeleton key={`loading-${i}`} type="skeleton" product={{ _id: "", images: [], storeName: "", model: "", brand: "", price: 0 }} />
            ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>No products available.</p>
      )}

      {/* Loader Ref Target */}
      <div ref={loader} className="flex justify-center items-center h-16">
        {!hasMore && (
          <span className="text-gray-400 text-sm">No more products to load.</span>
        )}
      </div>
    </div>
  );
};

export default BuyerProductsPage;
// {/* Loading Indicator */}
//           <div ref={loader} className="flex justify-center items-center h-16">
//             {loading && <span className="text-gray-500 text-center">Loading...</span>}
//           </div>