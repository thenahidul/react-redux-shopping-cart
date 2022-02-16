import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const Products = () => {
	const products = useSelector((state) => state.products.list);

	useEffect(() => {
		// setProducts(data.products);
	}, []);
	// console.log(products);

	return (
		<div className="row row-cols-1 row-cols-lg-3 row-cols-sm-2 g-4">
			{products.length
				? products.map((product) => (
						<Product product={product} key={product._id} />
				  ))
				: "No products found"}
		</div>
	);
};

export default Products;
