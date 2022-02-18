import Radio from "./Radio";

const Input = (props) => {
	const {
		type = "text",
		label,
		id,
		size = "lg",
		className = `form-control form-control-${size}`
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
		</>
	);
};

export default Input;
