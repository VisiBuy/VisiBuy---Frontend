import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderHistory } from "../../lib/track-order/api";
import { Order } from "@/types/orders";

export const getOrderHistory = createAsyncThunk(
  "trackOrder/fetchOrders",
  async () => {
    return await fetchOrderHistory();
  }
);

const trackOrderSlice = createSlice({
  name: "trackOrder",
  initialState: {
    orders: [] as Order[], // ✅ Ensure it's strongly typed
    loading: false,
    error: null as string | null, // ✅ Allow both `string` and `null`
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null; // ✅ Reset error state when loading starts
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders || [];
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong"; // ✅ Ensure error is always a string
      });
  },
});


export default trackOrderSlice.reducer;
