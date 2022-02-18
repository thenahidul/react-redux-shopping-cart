import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = {
	list: data.shippings || [],
	selected: data.shippings[0]
};

const shippingSlice = createSlice({
	name: "shippings",
	initialState: initialState,
	reducers: {
		getShippings(shippings, action) {
			return shippings;
		},
		changeShipping(shippings, action) {
			const found = shippings.list.find((s) => s._id === action.payload);
			// found.selected = true;
			shippings.selected = found;
		}
	}
});

export const { getShippings, changeShipping } = shippingSlice.actions;

export default shippingSlice.reducer;
