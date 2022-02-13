import React from "react";
import { formatCurrency } from "../../functions";

const Product = ({ product }) => {
	return (
		<div className="col">
			<div className="card h-100">
				<img
					src={product.image}
					className="card-img-top"
					alt={product.title}
				/>
				<div className="card-body">
					<h5 className="card-title">{product.title}</h5>
					{/* <p className="card-text">{product.description}</p> */}
				</div>
				<div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
					<h6 className="m-0">{formatCurrency(product.price)}</h6>
					<a href={`/#${product.title}`} className="btn btn-warning">
						Add to Cart
					</a>
				</div>
			</div>
		</div>
	);
};

export default Product;
