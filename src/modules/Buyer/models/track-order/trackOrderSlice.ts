import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderHistory } from "../../lib/track-order/api";
import { Order } from "@/types/orders";

export const getOrderHistory = createAsyncThunk(
  "trackOrder/getOrderHistory",
  async ({ page = 1 }: { page?: number }) => {
    const response = await fetchOrderHistory(page); // ✅ Pass page parameter
    return response;
  }
);

const trackOrderSlice = createSlice({
  name: "trackOrder",
  initialState: {
    orders: [] as Order[],
    loading: false,
    error: null as string | null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      totalItems: 0,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders || []; // ✅ Backend should return correct orders
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default trackOrderSlice.reducer;
