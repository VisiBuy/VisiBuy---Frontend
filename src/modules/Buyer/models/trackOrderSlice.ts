import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderHistory } from "../lib/track-order/api";
import { Order } from "@/types/orders";
import { normalizeOrder } from "../lib/track-order/normalizeOrder";

// Async thunk to fetch all order history
export const getOrderHistory = createAsyncThunk(
  "trackOrder/getOrderHistory",
  async () => {
    let allOrders: any[] = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages
    while (currentPage <= totalPages) {
      const response = await fetchOrderHistory(currentPage);
      allOrders = [...allOrders, ...response.orders];
      totalPages = response.pagination.totalPages;
      currentPage++;
    }

    return allOrders;
  }
);

interface TrackOrderState {
  allOrders: Order[];
  orders: Order[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };
}

const initialState: TrackOrderState = {
  allOrders: [],
  orders: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
  },
};

const trackOrderSlice = createSlice({
  name: "trackOrder",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;

      const startIdx =
        (state.pagination.currentPage - 1) * state.pagination.pageSize;
      const endIdx = startIdx + state.pagination.pageSize;

      state.orders = state.allOrders.slice(startIdx, endIdx);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;

        const sortedOrders = action.payload
          .map((order: any) => normalizeOrder(order))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

        state.allOrders = sortedOrders;
        state.pagination.totalItems = sortedOrders.length;
        state.pagination.totalPages = Math.ceil(
          sortedOrders.length / state.pagination.pageSize
        );
        state.pagination.currentPage = 1;

        // Set first page orders
        state.orders = sortedOrders.slice(0, state.pagination.pageSize);
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setPage } = trackOrderSlice.actions;

export default trackOrderSlice.reducer;
