import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../functions";

const Product = ({ product }) => {
	return (
		<div className="col">
			<div className="card h-100 img-thumbnail">
				<Link to={`/${product._id}`}>
					<img
						src={product.image}
						className="card-img-top"
						alt={product.title}
					/>
				</Link>
				<div className="card-body">
					<h5 className="card-title">
						<Link
							to={`/${product._id}`}
							className="color-secondary">
							{product.title}
						</Link>
					</h5>
					{/* <p className="card-text">{product.description}</p> */}
				</div>
				<div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
					<h6 className="m-0 text-dark">
						{formatCurrency(product.price)}
					</h6>
					<button className="btn btn-warning rounded-0">
						Add to Cart
					</button>
				</div>
			</div>
			<style jsx="true">{`
				.card-body {
					min-height: 90px;
				}
				.card-title {
					font-size: 18px;
				}
			`}</style>
		</div>
	);
};

export default Product;
