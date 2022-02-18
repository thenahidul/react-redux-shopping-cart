import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import shippingReducer from "./shippingSlice";
import paymentReducer from "./paymentSlice";

export default configureStore({
	reducer: {
		product: productReducer,
		cart: cartReducer,
		shipping: shippingReducer,
		payment: paymentReducer
	}
});
