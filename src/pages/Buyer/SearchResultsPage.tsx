import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/modules/Buyer/features/product/productSlice";
import ProductSkeleton from "@/ui/ProductSkeleton";
import LoadingSpinner from "@/ui/LoadingSpinner";

const SearchResultsPage = () => {
  const location = useLocation();

  // Get the search query from the URL
  const query = new URLSearchParams(location.search).get("q") || "";

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.buyer.product
  );

  useEffect(() => {
    // Dispatch the action to fetch products based on the search query
    if (query) {
      dispatch(fetchProducts({ page: 1, query }));
    }
  }, [dispatch, query]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search results for "{query}"</h1>
      {loading ? (
        <LoadingSpinner size="large" isLoading />
      ) : products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductSkeleton key={product._id} product={product} type="prod" />
          ))}
        </div>
      ) : (
        <p>No products found for this search.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
