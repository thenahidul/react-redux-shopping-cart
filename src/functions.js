export function formatCurrency(num) {
	return "$" + Number(num.toFixed(2)).toLocaleString() + " ";
}

export function setCartLocalStorage(value) {
	localStorage.setItem("cart", JSON.stringify(value));
}

export function getCartLocalStorage() {
	return JSON.parse(localStorage.getItem("cart"));
}

export function clearCartLocalStorage() {
	localStorage.clear("cart");
}
