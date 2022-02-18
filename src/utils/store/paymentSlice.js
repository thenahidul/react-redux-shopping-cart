import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = {
	list: data.payments || [],
	selected: data.payments[0]
};

const paymentSlice = createSlice({
	name: "payments",
	initialState: initialState,
	reducers: {
		getPayments(payments, action) {
			return payments;
		},
		changePayment(payments, action) {
			const found = payments.list.find((s) => s._id === action.payload);
			// found.selected = true;
			payments.selected = found;
		}
	}
});

export const { getPayments, changePayment } = paymentSlice.actions;

export default paymentSlice.reducer;
