import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { DiscountCode } from "../discount/discountCodes";

interface CartItem {
  color?: any;
  size?: any;
  _id: string;
  brand: string;
  price: number;
  quantity: number;
  image?: string[];
  model: any;
  storeName: any;
}

interface CartSummaryState {
  subtotal: number;
  deliveryFee: number;
  vat: number;
  total: number;
  discount?: DiscountCode | null;
  discountAmount?: number;
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
    calculateTotals: (
      state,
      action: PayloadAction<{ item: CartItem; discount: DiscountCode | null }>,
    ) => {
      const { item, discount } = action.payload;

      // state.subtotal = cartItems.reduce(
      //   (acc, item) => acc + item.price * item.quantity,
      //   0
      // );
      const subtotal = item.price * item.quantity;

      // Discount calculation
      let discountAmount = 0;
      if (discount) {
        if (discount.type === "percentage") {
          discountAmount = subtotal * (discount.value / 100);
        } else if (discount.type === "fixed") {
          discountAmount = discount.value;
        }
      }

      // Clamp to avoid negative totals
      const discountedSubtotal = Math.max(0, subtotal - discountAmount);
      console.log(discountAmount, discountedSubtotal);

      // Fees
      const deliveryFee = discountedSubtotal * 0.05;
      const vat = discountedSubtotal * 0.075;

      // Final total
      const total = discountedSubtotal + deliveryFee + vat;
      console.log(total);

      //states
      state.subtotal = subtotal;
      state.discountAmount = discountAmount;
      state.deliveryFee = deliveryFee;
      state.vat = vat;
      state.total = total;
    },
    resetSummary: (state) => {
      state.subtotal = 0;
      state.deliveryFee = 0;
      state.vat = 0;
      state.total = 0;
      state.discountAmount = 0;
    },
  },
});

export const { calculateTotals, resetSummary } = cartSummarySlice.actions;
export const selectCartSummary = (state: RootState) => state.buyer.cartSummary;
export default cartSummarySlice.reducer;
