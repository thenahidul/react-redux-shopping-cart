import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { formatCurrency } from "../../utils/functions";
import {
	clearCart,
	getCartTotalItem,
	getCartTotalPrice,
	removeFromCart
} from "../../utils/store/cartSlice";
import styles from "./CartMini.module.css";
import BtnGroup from "../common/BtnGroup";

const CartMini = () => {
	const cart = useSelector((state) => state.cart.list);
	const dispatch = useDispatch();
	const total = useSelector((state) => getCartTotalItem(state.cart));
	const totalPrice = useSelector((state) => getCartTotalPrice(state));

	return (
		<div className="border rounded p-3">
			<h3
				className={`text-center mb-4 pb-3 border-bottom ${styles["cart-heading"]}`}>
				Cart
				<small> ({total})</small>
			</h3>
			{cart.length ? (
				<Fade cascade direction="up" triggerOnce={true}>
					<ul className="list-unstyled d-grid gap-3 mb-0">
						{cart.map((product) => (
							<li
								className="d-flex position-relative text-right"
								key={product._id}>
								<img
									className={`img-thumbnail ${styles.thumb}`}
									src={product.image}
									alt={product.title}
								/>
								<div className="px-3">
									<h6
										className={`mt-0 mb-1 card-title ${styles["cart-title"]}`}>
										{product.title}
									</h6>
									<div
										className={`text-secondary ${styles["cart-meta"]}`}>
										<span className="amount">
											{formatCurrency(product.price)}
										</span>
										<span>x</span>
										<span className={styles.quantity}>
											{product.qty}
										</span>
										<div>
											<span className={styles.size}>
												Size: {product.size},
											</span>
											<span className={styles.color}>
												Color: {product.color}
											</span>
										</div>
										<span
											className={`position-absolute ${styles.remove}`}
											onClick={() => {
												if (
													window.confirm(
														"Are you sure?"
													)
												) {
													dispatch(
														removeFromCart({
															_id: product._id
														})
													);
												}
											}}>
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
					<BtnGroup cssClass="w-100 mt-2" />
					<button
						onClick={() => {
							if (window.confirm("Are you sure?")) {
								dispatch(clearCart());
							}
						}}
						className="btn text-danger d-block mx-auto">
						Clear Cart
					</button>
				</div>
			)}
		</div>
	);
};

export default CartMini;
