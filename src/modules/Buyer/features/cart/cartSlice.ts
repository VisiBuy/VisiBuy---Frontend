import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  brand: string;
  model: string;
  price: number;
  quantity: number;
  images: string[];
  storeName: any;
  color?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      console.log("Updating quantity for ID:", action.payload.id);
      console.log("New quantity:", action.payload.quantity);
      const { id, quantity } = action.payload;

      // Find the item in the cart
      const item = state.items.find((item) => item._id === id);

      // If item exists, update its quantity (ensure it's at least 1)
      if (item) {
        item.quantity = Math.max(1, quantity); // Prevent setting 0 or negative quantity
      }
    },

    // updateQuantity: (
    //   state,
    //   action: PayloadAction<{ id: string; quantity: number }>
    // ) => {
    //   const item = state.items.find((item) => item._id === action.payload.id);
    //   if (item) {
    //     item.quantity = action.payload.quantity;
    //   }
    // },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
