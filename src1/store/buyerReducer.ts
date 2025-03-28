import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../modules/Buyer/features/cart/cartSlice";
import cartSummaryReducer from "../modules/Buyer/features/cart/cartSummarySlice";
import productReducer from "../modules/Buyer/features/product/productSlice";
import filterReducer from "../modules/Buyer/features/filter/filterSlice";
import trackOrderReducer from "../modules/Buyer/models/track-order/trackOrderSlice";

const buyerReducer = combineReducers({
  cart: cartReducer,
  cartSummary: cartSummaryReducer,
  product: productReducer,
  filters: filterReducer,
  trackOrder: trackOrderReducer,
});
export default buyerReducer;
