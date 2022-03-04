import { useSelector, useDispatch } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { formatCurrency } from "../utils/functions";
import {
	adjustQty,
	getCartSubTotalPrice,
	removeFromCart
} from "../utils/store/cartSlice";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";

const Cart = () => {
	const cart = useSelector((state) => state.cart.list);
	const totalPrice = useSelector((state) => getCartSubTotalPrice(state));
	const dispatch = useDispatch();

	return (
		<div className="container py-5">
			<div className="row">
				<div className="col">
					<h1>Cart</h1>
					{cart.length ? (
						<div className="table-responsive">
							<table className="table align-middle">
								<thead>
									<tr>
										<th></th>
										<th></th>
										<th>Product</th>
										<th>Price</th>
										<th className="text-center">
											Quantity
										</th>
										<th>Subtotal</th>
									</tr>
								</thead>
								<tbody>
									{cart.map((product) => (
										<tr key={product._id}>
											<th
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
												}}
												scope="row"
												className="text-danger cursor-pointer">
												<MdDeleteForever size={22} />
											</th>
											<td>
												<img
													className="thumb img-thumbnail"
													src={product.image}
													alt={product.title}
													width={50}
												/>
											</td>
											<td>
												{product.title}
												<span className="mx-2 text-capitalize">
													- {product.color},
													<span className="ms-1">
														{product.size}
													</span>
												</span>
											</td>
											<td>
												{formatCurrency(product.price)}
											</td>
											<td className="text-center">
												<Input
													type="number"
													min={1}
													value={product.qty}
													className="text-center form-number"
													onChange={(e) =>
														dispatch(
															adjustQty({
																_id: product._id,
																value: e.target
																	.value
															})
														)
													}
												/>
											</td>
											<td>
												{formatCurrency(
													product.qty * product.price
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="d-flex flex-column align-items-end justify-content-end px-lg-5">
								<h4 className="my-3">
									Total:
									<span className="mx-3">
										{formatCurrency(totalPrice)}
									</span>
								</h4>
								<div className="btn-group gap-3 flex-column flex-md-row">
									<Link
										to="/"
										className="btn rounded-0 bgc-secondary text-uppercase px-lg-4 px-2">
										Back to Shopping
									</Link>
									<Link
										to="/checkout"
										className="btn rounded-0 bgc-primary text-uppercase px-lg-4 px-2">
										Proceed to Checkout
									</Link>
								</div>
							</div>
						</div>
					) : (
						"Your Cart is Empty"
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
