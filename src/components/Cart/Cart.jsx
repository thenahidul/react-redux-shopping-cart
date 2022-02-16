import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { formatCurrency } from "../../functions";
import {
	clearCart,
	getCartTotalItem,
	getCartTotalPrice,
	removeFromCart
} from "../../utils/store/cartSlice";

const Cart = () => {
	const cart = useSelector((state) => state.cart.list);
	const dispatch = useDispatch();
	const total = useSelector((state) => getCartTotalItem(state.cart));
	const totalPrice = useSelector((state) => getCartTotalPrice(state.cart));

	return (
		<div className="border rounded p-3">
			<h3 className="text-center mb-4 pb-3 border-bottom cart-heading">
				Cart
				<small> ({total})</small>
			</h3>
			{cart.length ? (
				<Fade cascade direction="left" triggerOnce={true}>
					<ul className="list-unstyled d-grid gap-3 mb-0">
						{cart.map((product) => (
							<li
								className="d-flex position-relative text-right"
								key={product._id}>
								<img
									className="thumb img-thumbnail"
									src={product.image}
									alt={product.title}
								/>
								<div className="px-3">
									<h6 className="mt-0 mb-1 card-title cart-title">
										{product.title}
									</h6>
									<div className="text-secondary cart-meta">
										<span className="amount">
											{formatCurrency(product.price)}
										</span>
										<span>x</span>
										<span className="quantity">
											{product.qty}
										</span>
										<div>
											<span className="size">
												Size: {product.size},
											</span>
											<span className="color">
												Color: {product.color}
											</span>
										</div>
										<span
											className="position-absolute remove"
											onClick={() =>
												dispatch(
													removeFromCart({
														_id: product._id
													})
												)
											}>
											<MdDeleteForever />
										</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Fade>
			) : (
				<p className="text-center text-muted">
					No items added in the cart
				</p>
			)}
			{cart.length > 0 && (
				<div className="border-top pt-3 mt-4">
					<h4 className="text-end mt-2">
						Total: {formatCurrency(totalPrice)}
					</h4>
					<div className="btn-group w-100 mt-2">
						<Link
							to="/cart"
							type="button"
							className="btn bgc-primary">
							View Cart
						</Link>
						<button type="button" className="btn bgc-secondary">
							Checkout
						</button>
					</div>
					<button
						onClick={() => dispatch(clearCart())}
						className="btn text-danger d-block mx-auto">
						Clear Cart
					</button>
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
