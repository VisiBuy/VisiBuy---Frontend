import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

interface CartItem {
  color?: any;
  size?: any;
  _id: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string;
  model: any;
  storeName: any;
}

interface CartSummaryState {
  subtotal: number;
  deliveryFee: number;
  vat: number;
  total: number;
}

const initialState: CartSummaryState = {
  subtotal: 0,
  deliveryFee: 0,
  vat: 0,
  total: 0,
};

const cartSummarySlice = createSlice({
  name: "cartSummary",
  initialState,
  reducers: {
    calculateTotals: (state, action: PayloadAction<CartItem>) => {
      const data = action.payload;

      // state.subtotal = cartItems.reduce(
      //   (acc, item) => acc + item.price * item.quantity,
      //   0
      // );
      state.subtotal = data.price * data.quantity;
      state.deliveryFee = state.subtotal * 0.05;
      state.vat = state.subtotal * 0.075;
      state.total = state.subtotal + state.deliveryFee + state.vat;
    },
    resetSummary: (state) => {
      state.subtotal = 0;
      state.deliveryFee = 0;
      state.vat = 0;
      state.total = 0;
    },
  },
});

export const { calculateTotals, resetSummary } = cartSummarySlice.actions;
export const selectCartSummary = (state: RootState) => state.buyer.cartSummary;
export default cartSummarySlice.reducer;
