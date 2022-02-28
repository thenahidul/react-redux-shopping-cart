import Joi from "joi";

export function formatCurrency(num) {
	return "$" + Number(num.toFixed(2)).toLocaleString();
}

export function formatPrice(num) {
	return Number(num.toFixed(2));
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

// joi validation
export const schema = Joi.object({
	firstname: Joi.string().required().label("First Name"),
	lastname: Joi.string().required().label("Last Name"),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] }
		})
		.required()
		.label("Email"),
	address: Joi.string().required().label("Address"),
	country: Joi.string().required().label("Country"),
	city: Joi.string().required().label("City"),
	phone: Joi.string().required().label("Phone"),
	zip: Joi.number().integer().min(1000).max(99999).label("Zip")
});
