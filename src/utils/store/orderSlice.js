import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	list: [],
	newOrder: {},
	error: ""
};

const API = `${process.env.REACT_APP_BACKEND_URI}/orders`;

export const getOrders = createAsyncThunk("order/getOrders", async () => {
	const data = await fetch(API);
	return await data.json();
});

export const createOrder = createAsyncThunk(
	"order/createOrder",
	async (order) => {
		// console.log("slice", order);
		const data = await fetch(API, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify(order)
		});
		return await data.json();
	}
);

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducer: {
		getOrders(order, action) {
			return order.list;
		}
	},
	extraReducers: {
		[getOrders.pending]: (order) => {
			order.loading = true;
		},
		[getOrders.fulfilled]: (order, { payload }) => {
			order.loading = false;
			order.list = payload;
		},
		[getOrders.rejected]: (order, { payload }) => {
			order.loading = false;
			order.error = payload;
		},

		[createOrder.pending]: (order) => {
			order.loading = true;
		},
		[createOrder.fulfilled]: (order, { payload }) => {
			order.loading = false;
			order.newOrder.success = true;
			order.newOrder.data = payload;
		},
		[createOrder.rejected]: (order, { payload }) => {
			order.loading = false;
			order.newOrder.success = false;
			order.error = payload;
		}
	}
});

// export const {  } = orderSlice.actions;

export default orderSlice.reducer;

export const getOrderTotalPrice = (state) => {
	return state.order.newOrder.data.total;
};

export const getOrderSubTotalPrice = (state) => {
	return state.order.newOrder.data.items.reduce((total, curr) => {
		return total + curr.price;
	}, 0);
};
