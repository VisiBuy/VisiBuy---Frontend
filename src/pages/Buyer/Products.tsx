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

  // Initial fetch
  useEffect(() => {
    if (products?.length === 0) {
      dispatch(fetchProducts({ page: 1, query: filters.search || "" }));
    }
  }, [dispatch, products?.length, filters.search]);

  console.log(products)

  // Intersection Observer to fetch more products
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !loadingMore && hasMore) {
          const nextPage = currentPage + 1;
          dispatch(
            fetchProducts({ page: nextPage, query: filters.search || "" })
          );
          setCurrentPage(nextPage);
        }
      },
      { threshold: 1.0 }
    );
    console.log(products)
    console.log(hasMore)
  
    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [dispatch, loading, loadingMore, hasMore, currentPage, filters.search]);

  const displayedProducts = filtersApplied ? filteredProducts : products;

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold font-montserrat'>Products</h2>
      </div>

      {/* Product Grid using Tailwind CSS Masonry */}
      {/* {displayedProducts?.length > 0 ? ( */}

      {/* Products Grid */}
      {loading ? (
        <div className='flex justify-center items-center min-h-[300px]'>
          <LoadingSpinner size='large' isLoading={true} />{" "}
          {/* Spinner for loading */}
        </div>
      ) : displayedProducts?.length > 0 ? (
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
          {/* {loading &&
            [...Array(3)].map((_, i) => (
              <ProductSkeleton
                key={`loading-${i}`}
                type='skeleton'
                product={{
                  _id: "",
                  images: [],
                  storeName: "",
                  model: "",
                  brand: "",
                  price: 0,
                }}
              />
            ))} */}
        </div>
      ) : (
        <p className='text-center text-gray-500'>No products available.</p>
      )}

      {/* Loader Ref */}
      <div ref={loader} className='flex justify-center items-center h-16'>
        {loadingMore && (
          <LoadingSpinner size='small' isLoading={true} /> // Show loading spinner while fetching more products
        )}
        {!loadingMore && !hasMore && (
          <span className='text-gray-400 text-sm'>
            End of this week Beta Drop
          </span>
        )}
      </div>
    </div>
  );
};

export default BuyerProductsPage;
