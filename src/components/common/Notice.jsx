import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/functions";

const Notice = ({ type = "primary", children }) => {
	const free_ship_amount = useSelector(
		(state) => state.shipping.free_ship_amount
	);

	return (
		<div
			className={`alert alert-${type} d-lg-flex align-items-center justify-content-around border-0 rounded-0 text-center fw-500 py-2 text-dark`}>
			{children ||
				`Free Shipping order over ${formatCurrency(free_ship_amount)}!`}
		</div>
	);
};

export default Notice;
