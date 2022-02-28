const Select = (props) => {
	const {
		options,
		firstOption = "Select an option",
		firstValue = "",
		label,
		id,
		size = "",
		className = `form-select form-select-${size}`,
		error,
		...rest
	} = props;

	return (
		<>
			{label && (
				<label htmlFor={id} className="form-label">
					{label}
				</label>
			)}
			<select {...rest} className={className} id={id}>
				<option defaultValue value={firstValue}>
					{firstOption}
				</option>
				{options.map((option, i) =>
					typeof option === "string" ? (
						<option value={option} key={option}>
							{option}
						</option>
					) : (
						<option value={option.label} key={i}>
							{option.label}
						</option>
					)
				)}
			</select>
			{error && (
				<div className="my-1 fw-500 f-letter-uppercase text-danger small">
					{error}
				</div>
			)}
		</>
	);
};

export default Select;
