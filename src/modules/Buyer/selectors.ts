import { RootState } from "@/store/store"; // Import the root state
import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredProducts = createSelector(
  [
    (state: RootState) => state.buyer.product.products,
    (state: RootState) => state.buyer.filters,
  ],
  (products, filters) => {
    return products?.filter((product) => {
      const matchesSize =
        filters?.size.length === 0 ||
        product?.size.some((size) => filters?.size.includes(size));
      const matchesColor =
        filters?.color.length === 0 ||
        product?.color.some((color) => filters?.color.includes(color));
      const matchesPrice =
        product?.price >= filters?.priceRange[0] &&
        product?.price <= filters?.priceRange[1];

      return matchesSize && matchesColor && matchesPrice;
    });
  }
);
