import { useSelector } from "react-redux";
import { formatCurrency } from "../../functions";

const Notice = ({ type = "primary", text = "" }) => {
	const free_shipping = useSelector(
		(state) => state.shipping.extra.free_shipping
	);

	text = text || `Free Shipping order over ${formatCurrency(free_shipping)}!`;

	return (
		<div
			className={`alert alert-${type} d-flex align-items-center justify-content-center border-0 rounded-0 text-center fw-500 py-2 text-dark`}>
			{text}
		</div>
	);
};

export default Notice;
