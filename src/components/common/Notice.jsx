const Notice = ({
	type = "primary",
	text = "FREE SHIPPING order over $50!"
}) => {
	return (
		<div
			className={`alert alert-${type} d-flex align-items-center justify-content-center border-0 rounded-0 text-center fw-500 py-2 text-dark`}>
			{text}
		</div>
	);
};

export default Notice;
