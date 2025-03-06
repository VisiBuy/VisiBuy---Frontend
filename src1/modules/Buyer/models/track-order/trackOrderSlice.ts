// src/modules/Buyer/features/track-order/trackOrderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderHistory } from "../../lib/track-order/api";
interface Order {
  sneaker: {
    brand: string;
    model: string;
    price: string;
  };
  order_status: string;
  buyer: {
    fullName: string;
  };
  orderNumber: string;
  invoiceID: string;
  Size: string;
  Color: string;
  created_at: string;
}

interface TrackOrderState {
  orders: Order[];
  total_order: number;
  loading: boolean;
  error: string | null;
}

const initialState: TrackOrderState = {
  orders: [],
  total_order: 0,
  loading: false,
  error: null,
};

export const getOrderHistory = createAsyncThunk(
  "trackOrder/getOrderHistory",
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await fetchOrderHistory(token);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const trackOrderSlice = createSlice({
  name: "trackOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total_order = Number(action.payload.total_order);
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default trackOrderSlice.reducer;
