import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISellerProduct, SellerProductState } from "../../models/product";
const initialProductState: SellerProductState = {
  products: [],
  selectedProduct: null,
};

const sellerProductSlice = createSlice({
  name: "seller_product",
  initialState: initialProductState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ISellerProduct | null>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setSelectedProduct } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;
