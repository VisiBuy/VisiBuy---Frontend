import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  size: number[];
  color: string[];
  priceRange: [number, number];
}

const initialState: FilterState = {
  size: [],
  color: [],
  priceRange: [0, 1000], // Example price range
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSizeFilter: (state, action: PayloadAction<number[]>) => {
      state.size = action.payload;
    },
    setColorFilter: (state, action: PayloadAction<string[]>) => {
      state.color = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.size = [];
      state.color = [];
      state.priceRange = [0, 1000];
    },
  },
});

export const { setSizeFilter, setColorFilter, setPriceRange, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
