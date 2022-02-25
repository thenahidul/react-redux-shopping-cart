import { useSelector } from "react-redux";
import { formatCurrency } from "../../functions";
import { getCartSubTotalPrice } from "../../utils/store/cartSlice";
import { getOrderSubTotalPrice } from "../../utils/store/orderSlice";
import styles from "./OrderSummary.module.css";

const OrderDetails = () => {
	const data = useSelector((state) => state.order.newOrder.data);
	const orderSubTotal = useSelector((state) => getOrderSubTotalPrice(state));

	return (
		<table
			className={`table table-bordered align-middle ${styles["order-table"]}`}>
			<thead className="border-bottom">
				<tr>
					<th colSpan="2">
						<h3 className="text-center my-2">Order Details</h3>
					</th>
				</tr>
				<tr className="">
					<th>Product</th>
					<th className="text-end">Total</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.items.map((item) => (
						<tr key={item._id}>
							<td>
								<span>{item.title}</span>
								<span className="fw-500 ms-2">
									x {item.qty}
								</span>
							</td>
							<td className="text-end fw-500">
								{formatCurrency(item.price)}
							</td>
						</tr>
					))}

				<tr>
					<th>Shipping</th>
					<td className="text-end fw-500">
						<span className="mx-2">{data.shipping.title} -</span>
						{formatCurrency(data.shipping.rate)}
					</td>
				</tr>
				<tr>
					<th>Subtotal</th>
					<th className="text-end">
						{formatCurrency(orderSubTotal)}
					</th>
				</tr>
				<tr>
					<th>Payment Method</th>
					<th className="text-end">{data.payment.title}</th>
				</tr>
				<tr>
					<th>Payment Status</th>
					<th className="text-end f-letter-uppercase">
						{data.payment.status}
					</th>
				</tr>
				<tr>
					<th>Total</th>
					<th className="text-end">{formatCurrency(data.total)}</th>
				</tr>
			</tbody>
		</table>
	);
};

export default OrderDetails;
