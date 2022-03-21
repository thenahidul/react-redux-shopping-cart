import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	list: [],
	error: "",
	filteredList: [],
	singleProduct: {},
	filterBy: "all",
	orderBy: "latest",
	orderByList: ["lowest", "highest"]
};

const API = `http://localhost:5000/api/products/`;

export const getProducts = createAsyncThunk("product/getProducts", async () => {
	const data = await fetch(API);
	return await data.json();
});

export const getProduct = createAsyncThunk(
	"product/getProduct",
	async ({ slug }) => {
		const data = await fetch(`${API}/${slug}`);
		const json = await data.json();
		return json;
	}
);

const productSlice = createSlice({
	name: "product",
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
	},
	extraReducers: {
		[getProducts.pending]: (state) => {
			state.loading = true;
		},
		[getProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
			state.filteredList = state.list;
		},
		[getProducts.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		[getProduct.pending]: (state) => {
			state.loading = true;
		},
		[getProduct.fulfilled]: (state, action) => {
			state.loading = false;
			state.singleProduct = action.payload;
		},
		[getProduct.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
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
