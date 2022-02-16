import { createSlice, current } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = {
	// list: data.products.slice(0, 1).map((p) => ({ ...p, qty: 1 }))
	list: JSON.parse(localStorage.getItem("cart")) || []
	// list: []
};

const cartSlice = createSlice({
	name: "carts",
	initialState: initialState,
	reducers: {
		getCart(cart, action) {
			return cart;
		},
		addToCart(cart, action) {
			const newProduct = action.payload;
			let inCart = false;

			cart.list.forEach((p) => {
				if (p._id === newProduct._id) {
					p.qty++;
					p.size = newProduct.size;
					p.color = newProduct.color;
					inCart = true;
				}
			});

			if (!inCart) {
				cart.list.push({ ...newProduct, qty: 1 });
			}
			localStorage.setItem("cart", JSON.stringify(cart.list));
		},
		removeFromCart(cart, action) {
			const newCart = cart.list.filter(
				(p) => p._id !== action.payload._id
			);
			localStorage.setItem("cart", JSON.stringify(newCart));
			return { ...cart, list: newCart };
		}
	}
});

export const { getCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
