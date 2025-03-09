import sellerProductReducer from "../modules/Seller/features/product/seller-product-slices";
import { combineReducers } from "@reduxjs/toolkit";
const sellerReducer = combineReducers({
  products: sellerProductReducer,
});
export default sellerReducer;
