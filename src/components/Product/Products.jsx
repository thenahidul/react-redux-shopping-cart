import { useEffect, useState } from "react";
import data from "../../data.json";
import Product from "./Product";

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(data.products);
	}, []);
	// console.log(products);

	return (
		<div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-4">
			{products &&
				products.map((product) => (
					<Product product={product} key={product._id} />
				))}
		</div>
	);
};

export default Products;
