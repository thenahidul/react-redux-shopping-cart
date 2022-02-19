const Select = (props) => {
	const {
		options,
		firstOption = "Select an option",
		firstValue = "",
		label,
		id,
		size = "",
		className = `form-select form-select-${size}`,
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
				{Array.isArray(options)
					? options.map((option) => (
							<option value={option} key={option}>
								{option}
							</option>
					  ))
					: options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label || option.value}
							</option>
					  ))}
			</select>
		</>
	);
};

export default Select;
