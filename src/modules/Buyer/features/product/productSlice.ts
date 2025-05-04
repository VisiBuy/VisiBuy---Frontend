import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setPriceRange } from "../filter/filterSlice";
import { RootState } from "@/store/store";
import { axiosWithAuth } from "@/lib/client";

interface Product {
  size: number[];
  color: string[];
  _id: string;
  brand: string;
  price: number;
  model: string;
  description: string;
  storeName: string;
  storeAvatar: string;
  images: string[];
  quantity: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  loadingMore: boolean;
  page: number;
  hasMore: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  loadingMore: false,
  page: 1,
  hasMore: true,
};

// Fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (page: number, { dispatch }) => {
    try {
      // const response = await axios.get("https://fakestoreapi.com/products");
      // console.log("res:", response);
      const response = await axiosWithAuth.get("list", {
        params: { page, pageSize: 6 },
      });
      const data = response.data.sneakers;
      console.log("Fetched products:", data);

      // Extract min & max prices
      const prices = data.map((p: any) => p.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      // Set price range dynamically
      dispatch(setPriceRange([minPrice, maxPrice]));

      console.log(data);
      // return data.map((product: any) => ({
      //   ...product,
      // }));
      // Return products and pagination info
      return { products: data, hasMore: data.length === 10 };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts(state) {
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      if (action.meta.arg === state.page) {
        state.loading = true;
        if (action.meta.arg > 1) {
          // Only show "loading more" for additional pages
          state.loadingMore = true;  
        }
      }
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      // state.products = action.payload.products;
      state.products = [...state.products, ...action.payload.products];
      state.loading = false;
      state.loadingMore = false;
      state.hasMore = action.payload.hasMore;

      // Increment the page if there are more products
      if (action.payload.hasMore) {
        state.page += 1;
      }
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.loadingMore = false;
    });
  },
  /* extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      if (action.payload.length < 10) {
        state.hasMore = false;
      }
    })
    .addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
    });
  }, */
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
