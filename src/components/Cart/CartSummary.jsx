import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../functions";
import { getCartTotalPrice } from "../../utils/store/cartSlice";
import { changePayment } from "../../utils/store/paymentSlice";
import { changeShipping } from "../../utils/store/shippingSlice";
import Input from "../common/Input";
import styles from "./CartSummary.module.css";

const CartSummary = () => {
	const cart = useSelector((state) => state.cart.list);
	const shippings = useSelector((state) => state.shipping.list);
	const payments = useSelector((state) => state.payment.list);
	const totalPrice = useSelector((state) => getCartTotalPrice(state));
	const dispatch = useDispatch();
	// console.log(shippings);

	useEffect(() => {
		// if (totalPrice >= 50) {
		// 	dispatch();
		// } else {
		// 	dispatch(selectShipping(SHIPPING_METHODS.flatRate));
		// }
	}, []);

	// console.log("x", totalPrice);

	return (
		<div className="">
			{cart.length && (
				<>
					<div className="table-responsive">
						<table
							className={`table table-bordered align-middle ${styles["order-table"]}`}>
							<thead className="border-bottom">
								<tr>
									<th colSpan="2">
										<h3 className="text-center my-2">
											Your Order
										</h3>
									</th>
								</tr>
								<tr className="">
									<th>Product</th>
									<th className="text-end">Subtotal</th>
								</tr>
							</thead>
							<tbody>
								{cart.map((product) => (
									<tr key={product._id}>
										<td>
											<span>{product.title}</span>
											<span> x {product.qty}</span>
										</td>
										<td className="text-end">
											{formatCurrency(
												product.price * product.qty
											)}
										</td>
									</tr>
								))}
								<tr>
									<th colSpan="2">Shipping</th>
								</tr>
								<tr>
									<td colSpan="2">
										{shippings.map((shipping) => (
											<div
												className="form-check"
												key={shipping._id}>
												<Input
													onChange={(e) =>
														dispatch(
															changeShipping(
																e.target.value
															)
														)
													}
													type="radio"
													label={`${
														shipping.title
													} (${formatCurrency(
														shipping.rate
													)})`}
													id={shipping._id}
													name="shipping"
													value={shipping._id}
												/>
											</div>
										))}
									</td>
								</tr>
								<tr>
									<th>Subtotal</th>
									<th className="text-end">
										{formatCurrency(totalPrice)}
									</th>
								</tr>
								<tr>
									<th>Total</th>
									<th className="text-end">
										{formatCurrency(totalPrice)}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="mt-4">
						{payments.map((method) => (
							<div
								className="form-check d-flex align-items-center"
								key={method._id}>
								<div>
									<Input
										onChange={(e) =>
											dispatch(
												changePayment(e.target.value)
											)
										}
										type="radio"
										label={method.title}
										id={method._id}
										name="method"
										value={method._id}
									/>
								</div>
								<img
									className="mx-2"
									src={method.icon}
									alt={method.title}
									width="50"
								/>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default CartSummary;
