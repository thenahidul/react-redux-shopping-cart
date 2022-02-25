import { useSelector } from "react-redux";
import styles from "./OrderSummary.module.css";

const CustomerDetails = () => {
	const customer = useSelector((state) => state.order.newOrder.data.customer);

	const renderCustomer = () => {
		const _customer = {
			name: `${customer.firstname} ${customer.lastname}`,
			...customer
		};

		return Object.keys(_customer).map((item, i) => {
			if (item !== "firstname" && item !== "lastname") {
				return (
					<tr key={i}>
						<td className="f-letter-uppercase">{item}</td>
						<td>{_customer[item]}</td>
					</tr>
				);
			}
		});
	};

	return (
		<table
			className={`table table-bordered align-middle ${styles["order-table"]}`}>
			<thead className="border-bottom">
				<tr>
					<th colSpan="2">
						<h3 className="text-center my-2">Customer Details</h3>
					</th>
				</tr>
			</thead>
			<tbody className="fw-500">{renderCustomer()}</tbody>
		</table>
	);
};

export default CustomerDetails;
