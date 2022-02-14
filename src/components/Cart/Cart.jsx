import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import data from "../../data.json";

const Cart = () => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		// const products = data.products.map((product) => product);
		setCart(data.products.slice(0, 3));
	}, []);

	return (
		<div className="border rounded p-3">
			<h3 className="text-center mb-4 pb-3 border-bottom cart-heading">
				Cart
				<small> ({cart.length})</small>
			</h3>
			<ul className="list-unstyled d-grid gap-3 mb-0">
				{cart &&
					cart.map((cart) => (
						<li
							className="d-flex position-relative text-right"
							key={cart._id}>
							<img
								className="thumb img-thumbnail"
								src={cart.image}
								alt={cart.title}
							/>
							<div className="px-3">
								<h6 className="mt-0 mb-1 text-secondary card-title cart-title">
									{cart.title}
								</h6>
								<div className="color-secondary cart-meta">
									<span className="amount">$10</span>
									<span>x</span>
									<span className="quantity">1</span>
									<div>
										<span className="size">Size: XL</span>
										<span className="color">
											Color: Red
										</span>
									</div>
									<span className="position-absolute remove">
										<MdDeleteForever />
									</span>
								</div>
							</div>
						</li>
					))}

				<style jsx="true">{`
					.cart-heading {
						font-size: 22px;
					}
					.thumb {
						width: 64px;
						height: 64px;
					}
					.cart-title {
						font-size: 14px;
					}
					.cart-meta {
						font-size: 80%;
					}
					.cart-meta span {
						margin-right: 5px;
					}
					.remove {
						position: absolute;
						right: -5px;
						top: 0;
						color: red;
						font-size: 20px;
						cursor: pointer;
					}
				`}</style>
			</ul>
		</div>
	);
};

export default Cart;
