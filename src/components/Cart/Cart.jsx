import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../functions";
import { removeFromCart } from "../../utils/store/cartSlice";

const Cart = () => {
	// const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);
	const cart = useSelector((state) => state.cart.list);
	const dispatch = useDispatch();

	useEffect(() => {
		// const products = data.products.map((product) => product);
		// setCart(data.products.slice(0, 3));
		setTotal(
			cart.reduce((total, curr) => {
				return total + curr.price * curr.qty;
			}, 0)
		);
	}, [cart]);
	// console.log(cart);

	return (
		<div className="border rounded p-3">
			<h3 className="text-center mb-4 pb-3 border-bottom cart-heading">
				Cart
				<small> ({cart.length})</small>
			</h3>
			<ul className="list-unstyled d-grid gap-3 mb-0">
				{cart.length ? (
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
								<h6 className="mt-0 mb-1 card-title cart-title">
									{cart.title}
								</h6>
								<div className="text-secondary cart-meta">
									<span className="amount">
										{formatCurrency(cart.price)}
									</span>
									<span>x</span>
									<span className="quantity">{cart.qty}</span>
									<div>
										<span className="size">
											Size: {cart.size},
										</span>
										<span className="color">
											Color: {cart.color}
										</span>
									</div>
									<span
										className="position-absolute remove"
										onClick={() =>
											dispatch(
												removeFromCart({
													_id: cart._id
												})
											)
										}>
										<MdDeleteForever />
									</span>
								</div>
							</div>
						</li>
					))
				) : (
					<p className="text-center text-muted">
						No items added in the cart
					</p>
				)}
			</ul>
			{cart.length > 0 && (
				<div className="border-top pt-3 mt-4">
					<h4 className="text-end mt-2">
						Total: {formatCurrency(total)}
					</h4>
					<div className="btn-group w-100 mt-2">
						<button type="button" className="btn bgc-primary">
							View Cart
						</button>
						<button type="button" className="btn bgc-secondary">
							Checkout
						</button>
					</div>
				</div>
			)}

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
				.color,
				.size {
					text-transform: capitalize;
				}
			`}</style>
		</div>
	);
};

export default Cart;
