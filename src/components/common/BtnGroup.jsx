import { Link } from "react-router-dom";

const BtnGroup = ({ cssClass }) => {
	return (
		<div className={`btn-group ${cssClass}`}>
			<Link to="/cart" type="button" className="btn bgc-primary">
				View Cart
			</Link>
			<Link to="/checkout" className="btn bgc-secondary">
				Checkout
			</Link>
		</div>
	);
};

export default BtnGroup;
