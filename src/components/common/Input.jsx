import Radio from "./Radio";

const Input = (props) => {
	const {
		type = "text",
		label,
		id,
		size = "lg",
		className = `form-control form-control-${size}`,
		error
	} = props;
	return (
		<>
			<label htmlFor={id} className="form-label">
				{label}
			</label>
			{type === "radio" ? (
				<Radio {...props} />
			) : (
				<input {...props} type={type} className={className} />
			)}
			{error && (
				<div className="my-1 fw-500 f-letter-uppercase text-danger small">
					{error}
				</div>
			)}
		</>
	);
};

export default Input;
