import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
// import Fade from "react-reveal/Fade";
import { Fade } from "react-awesome-reveal";
import ProductFilter from "./ProductFilter";
import { getProducts } from "../../utils/store/productSlice";

const Products = () => {
	const { loading, filteredList: products } = useSelector(
		(state) => state.product
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	// console.log(products);

	return (
		<>
			<ProductFilter />
			<div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 g-5">
				{loading ? (
					<div className="w-100 py-3 text-center">
						Products loading...
					</div>
				) : (
					<Fade
						cascade
						duration={800}
						triggerOnce={true}
						className="card-group">
						{products.map((product) => (
							<Product product={product} key={product._id} />
						))}
					</Fade>
				)}
			</div>
		</>
	);
};

export default Products;
