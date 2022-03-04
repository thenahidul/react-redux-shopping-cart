import { useSelector, useDispatch } from "react-redux";
import {
	getFilteredProducts,
	getProductSizes,
	getSortedProducts
} from "../../utils/store/productSlice";
import Select from "../common/Select";

const ProductFilter = () => {
	const products = useSelector((state) => state.product.filteredList);
	const sizes = useSelector((state) => getProductSizes(state));
	const orderBy = useSelector((state) => state.product.orderBy);

	const dispatch = useDispatch();

	const sortOrder = ["lowest", "highest"];

	return (
		<div className="row align-items-center justify-content-end my-3 product-filter">
			<div
				className="col-12 col-md-6 mb-md-0 mb-3 text-lg-end"
				style={{ fontWeight: 500 }}>
				Showing {products.length} Products
			</div>
			<div className="col-6 col-md-3 d-flex flex-row-reverse align-items-center">
				<Select
					options={sizes}
					firstOption="ALL"
					firstValue="all"
					label="Filter"
					required={false}
					onChange={(e) =>
						dispatch(
							getFilteredProducts({ filterBy: e.target.value })
						)
					}
				/>
			</div>
			<div className="col-6 col-md-3 d-flex flex-row-reverse align-items-center">
				<Select
					options={sortOrder}
					label="Order"
					firstOption={orderBy}
					firstValue={orderBy}
					required={false}
					onChange={(e) =>
						dispatch(getSortedProducts({ orderBy: e.target.value }))
					}
				/>
			</div>
		</div>
	);
};

export default ProductFilter;
