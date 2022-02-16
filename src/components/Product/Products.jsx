import { useEffect } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";
// import Fade from "react-reveal/Fade";
import { Slide } from "react-awesome-reveal";

const Products = () => {
	const products = useSelector((state) => state.products.list);

	useEffect(() => {
		// setProducts(data.products);
	}, []);
	// console.log(products);

	return (
		<div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-4">
			<Slide cascade direction="up" duration={900} triggerOnce={true}>
				{products.length
					? products.map((product) => (
							<Product product={product} key={product._id} />
					  ))
					: "No products found"}
			</Slide>
		</div>
	);
};

export default Products;
