import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = {
	list: data.products
};

const productSlice = createSlice({
	name: "products",
	initialState: initialState,
	reducers: {
		getProducts(products, action) {
			return products;
		}
	}
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
