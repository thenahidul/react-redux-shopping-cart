import { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
// import Fade from "react-reveal/Fade";
import { Fade } from "react-awesome-reveal";
import ProductFilter from "./ProductFilter";

const Products = () => {
	const products = useSelector((state) => state.product.filteredList);

	useEffect(() => {
		// setProducts(data.products);
	}, []);
	// console.log(products);

	return (
		<div>
			<ProductFilter />
			<div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-4">
				{products.length ? (
					<Fade cascade duration={800} triggerOnce={true}>
						{products.map((product) => (
							<Product product={product} key={product._id} />
						))}
					</Fade>
				) : (
					"No products found"
				)}
			</div>
		</div>
	);
};

export default Products;
