import { createSlice } from "@reduxjs/toolkit";
import {
	clearCartLocalStorage,
	getCartLocalStorage,
	setCartLocalStorage
} from "../functions";

const initialState = {
	list: getCartLocalStorage() || [],
	added: false
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getCart(cart, action) {
			return cart;
		},
		addToCart(cart, action) {
			const newProduct = action.payload;
			let inCart = false;

			cart.list.forEach((p) => {
				if (p._id === newProduct._id) {
					p.qty += newProduct.qty;
					p.size = newProduct.size;
					p.color = newProduct.color;
					inCart = true;
				}
			});

			if (!inCart) {
				cart.list.push({ ...newProduct });
			}
			setCartLocalStorage(cart.list);
		},
		removeFromCart(cart, action) {
			const newCart = cart.list.filter(
				(p) => p._id !== action.payload._id
			);
			setCartLocalStorage(newCart);
			return { ...cart, list: newCart };
		},
		clearCart(cart, action) {
			clearCartLocalStorage();
			return { ...cart, list: [] };
		},
		adjustQty(cart, action) {
			const { _id, value } = action.payload;
			cart.list.forEach((p) => {
				if (p._id === _id) {
					p.qty = value;
				}
			});
			setCartLocalStorage(cart.list);
		}
	}
});

export const { getCart, addToCart, removeFromCart, clearCart, adjustQty } =
	cartSlice.actions;

export default cartSlice.reducer;

// selector
export const getCartTotalItem = (cart) => {
	return cart.list.length;
};

export const getCartTotalPrice = (state) => {
	const shipping = +state.shipping.selected.rate;

	return (
		state.cart.list.reduce((total, curr) => {
			return total + curr.price * curr.qty;
		}, 0) + shipping
	);
};

export const getCartSubTotalPrice = (state) => {
	return state.cart.list.reduce((total, curr) => {
		return total + curr.price * curr.qty;
	}, 0);
};
