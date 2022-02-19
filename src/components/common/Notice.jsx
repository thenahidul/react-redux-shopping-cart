import React from "react";

const Notice = ({ text = "FREE SHIPPING order over $50!" }) => {
	return (
		<div className="alert alert-primary bgc-primary border-0 rounded-0 text-center fw-500 py-2 text-dark">
			{text}
		</div>
	);
};

export default Notice;
