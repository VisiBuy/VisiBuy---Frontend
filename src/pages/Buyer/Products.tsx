import { fetchProducts } from "@/modules/Buyer/features/product/productSlice";
import { selectFilteredProducts } from "@/modules/Buyer/selectors";
import { AppDispatch, RootState } from "@/store/store";
import ProductSkeleton from "@/ui/ProductSkeleton";
import LoadingSpinner from "@/ui/LoadingSpinner";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const BuyerProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, loadingMore, hasMore } = useSelector(
    (state: RootState) => state.buyer.product
  );
  const filteredProducts = useSelector(selectFilteredProducts) || [];
  const filters = useSelector((state: any) => state.buyer.filters) || {};
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loader = useRef<HTMLDivElement | null>(null);

  // Initial fetch
  useEffect(() => {
    if (products?.length === 0) {
      dispatch(fetchProducts(1)); // Fetch first page
    }
  }, [dispatch, products?.length]);

  // Intersection Observer to fetch more products
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !loadingMore && hasMore) {
          const nextPage = currentPage + 1;
          dispatch(fetchProducts(nextPage));
          setCurrentPage(nextPage);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [dispatch, loading, loadingMore, hasMore, currentPage]);

  const displayedProducts = filtersApplied ? filteredProducts : products;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-montserrat">Products</h2>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <LoadingSpinner size="large" isLoading={true} />{" "}
          {/* Spinner for loading */}
        </div>
      ) : displayedProducts?.length > 0 ? (
        <div
          className="grid grid-rows-[repeat(auto-fit,minmax(200px,1fr))] auto-cols-[251px] justify-center md:flex md:justify-normal gap-6 p-6"
          style={{ flexWrap: "wrap" }}
        >
          {displayedProducts.map((product) => (
            <ProductSkeleton type="prod" product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      {/* Loader Ref */}
      <div ref={loader} className="flex justify-center items-center h-16">
        {loadingMore && (
          <LoadingSpinner size="small" isLoading={true} /> // Show loading spinner while fetching more products
        )}
        {!loadingMore && !hasMore && (
          <span className="text-gray-400 text-sm">
            No more products to load.
          </span>
        )}
      </div>
    </div>
  );
};

export default BuyerProductsPage;
