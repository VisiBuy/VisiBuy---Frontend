import authReducer from "@/modules/Auth/features/slices";
import toastReducer from "@/ui/toastSlice";
import sellerReducer from "@/store/sellerReducer";
import buyerReducer from "@/store/buyerReducer";
import trackOrderReducer from "@/modules/Buyer/models/trackOrderSlice";
import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialRootState: { error: null | string; isLoading: boolean } = {
  error: null,
  isLoading: false,
};

const rootSlice = createSlice({
  name: "root_",
  initialState: initialRootState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  seller: sellerReducer,
  buyer: buyerReducer,
  trackOrder: trackOrderReducer, // Added track order slice here
  root: rootSlice.reducer,
});

export const { setError, setLoading } = rootSlice.actions;
export default rootReducer;
