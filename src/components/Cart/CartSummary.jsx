import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/functions";
import {
	getCartTotalPrice,
	getCartSubTotalPrice
} from "../../utils/store/cartSlice";
import { changePayment } from "../../utils/store/paymentSlice";
import { changeShipping } from "../../utils/store/shippingSlice";
import Input from "../common/Input";
import styles from "./CartSummary.module.css";

const CartSummary = () => {
	const [filteredShipping, setFilteredShipping] = useState([]);
	const cart = useSelector((state) => state.cart.list);
	const {
		list: shippings,
		selected: selectedShipping,
		free_ship_amount
	} = useSelector((state) => state.shipping);
	const { list: payments, selected: selectedPayment } = useSelector(
		(state) => state.payment
	);
	const cartTotal = useSelector((state) => getCartTotalPrice(state));
	const cartSubTotal = useSelector((state) => getCartSubTotalPrice(state));

	const dispatch = useDispatch();

	useEffect(() => {
		if (cartSubTotal < free_ship_amount) {
			setFilteredShipping(
				shippings.filter((shipping) => shipping._id !== "free_shipping")
			);
			dispatch(changeShipping("flat_rate"));
		} else {
			setFilteredShipping(shippings);
			dispatch(changeShipping("free_shipping"));
		}
	}, [cartSubTotal, free_ship_amount, shippings]);

	// selectedShipping = filteredShipping[0];

	return (
		<div>
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
									<th className="text-end">Total</th>
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
										{filteredShipping.map((shipping) => (
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
													checked={
														selectedShipping._id ===
															shipping._id &&
														"checked"
													}
												/>
											</div>
										))}
									</td>
								</tr>
								<tr>
									<th>Subtotal</th>
									<th className="text-end">
										{formatCurrency(cartSubTotal)}
									</th>
								</tr>
								<tr>
									<th>Total</th>
									<th className="text-end">
										{formatCurrency(cartTotal)}
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
										checked={
											selectedPayment._id ===
												method._id && "checked"
										}
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
