import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/modules/Buyer/features/cart/cartSlice";
import cartSummaryReducer from "@/modules/Buyer/features/cart/cartSummarySlice";
import productReducer from "@/modules/Buyer/features/product/productSlice";
import filterReducer from "@/modules/Buyer/features/filter/filterSlice";


const buyerReducer = combineReducers({
  cart: cartReducer,
  cartSummary: cartSummaryReducer,
  product: productReducer,
  filters: filterReducer,
});
export default buyerReducer;
