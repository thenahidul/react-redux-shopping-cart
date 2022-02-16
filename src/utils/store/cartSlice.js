import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	list: JSON.parse(localStorage.getItem("cart")) || []
	// total: function () {
	// 	return this.list.reduce((a, b) => {
	// 		console.log(a, b);
	// 		return a + b.qty;
	// 	}, 0);
	// }
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
					p.qty += newProduct.qty;
					p.size = newProduct.size;
					p.color = newProduct.color;
					inCart = true;
				}
			});

			if (!inCart) {
				cart.list.push({ ...newProduct });
			}
			localStorage.setItem("cart", JSON.stringify(cart.list));
		},
		removeFromCart(cart, action) {
			const newCart = cart.list.filter(
				(p) => p._id !== action.payload._id
			);
			localStorage.setItem("cart", JSON.stringify(newCart));
			return { ...cart, list: newCart };
		},
		clearCart(cart, action) {
			localStorage.clear("cart");
			return { ...cart, list: [] };
		}
	}
});

export const { getCart, addToCart, removeFromCart, clearCart } =
	cartSlice.actions;

export default cartSlice.reducer;
