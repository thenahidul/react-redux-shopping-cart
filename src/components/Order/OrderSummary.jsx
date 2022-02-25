import CustomerDetails from "./CustomerDetails";
import OrderDetails from "./OrderDetails";

const OrderSummmary = () => {
	return (
		<div className="table-responsive">
			<OrderDetails />
			<CustomerDetails />
		</div>
	);
};

export default OrderSummmary;
