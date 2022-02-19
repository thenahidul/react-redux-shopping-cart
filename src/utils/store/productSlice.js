import { createSlice, current } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = {
	list: data.products || [],
	filteredList: data.products || [],
	filterBy: "all",
	orderBy: "latest",
	orderByList: ["lowest", "highest"]
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getFilteredProducts(product, action) {
			const { filterBy } = action.payload;

			const filtered =
				filterBy === "all" || filterBy === ""
					? product.list
					: product.list.filter((p) => {
							return p.availableSizes.includes(
								action.payload.filterBy
							);
					  });

			return {
				...product,
				filteredList: filtered,
				filterBy,
				orderBy: "latest"
			};
		},
		getSortedProducts(product, action) {
			const { orderBy } = action.payload;

			// create a new copy of the filteredList and work on it to sort.
			const sortable = [...product.filteredList];

			switch (orderBy) {
				case "highest":
					sortable.sort((a, b) => b.price - a.price);
					break;
				case "lowest":
					sortable.sort((a, b) => a.price - b.price);
					break;

				default:
					sortable.sort((a, b) => (a._id - b._id ? 1 : -1));
			}
			return { ...product, filteredList: sortable, orderBy };
		}
	}
});

export const { getFilteredProducts, getSortedProducts } = productSlice.actions;

export default productSlice.reducer;

// selector
export const getProductSizes = ({ product }) => {
	const sizes = product.list.map((p) => p.availableSizes);
	return [...new Set([].concat(...sizes))].reverse();
};
