import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../functions";
import { addToCart } from "../../utils/store/cartSlice";

const Product = ({ product }) => {
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		if (!size) return alert("Select a size");
		if (!color) return alert("Select a color");
		dispatch(addToCart({ ...product, size, color }));
	};

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

				<div className="d-flex align-items-center justify-content-between px-3">
					<div>
						<select
							id="size"
							className="form-control"
							onChange={(e) => setSize(e.target.value)}>
							<option value="">Select a size</option>
							{product.availableSizes.map((size) => (
								<option value={size} key={size}>
									{size}
								</option>
							))}
						</select>
					</div>
					<div>
						<select
							id="color"
							className="form-control"
							onChange={(e) => setColor(e.target.value)}>
							<option value="">Select a color</option>
							{product.colors.map((color) => (
								<option value={color} key={color}>
									{color}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="d-flex align-items-center px-3"></div>

				<div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
					<h6 className="m-0 text-dark">
						{formatCurrency(product.price)}
					</h6>
					<button
						className="btn btn-warning rounded-0"
						onClick={() => handleAddToCart(product)}>
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
				.card-title:first-letter {
					text-transform: capitalize;
				}
			`}</style>
		</div>
	);
};

export default Product;
