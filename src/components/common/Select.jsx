import React from "react";

const Select = ({
	options,
	firstOption = "Select an option",
	name,
	label,
	id,
	size = "",
	required = true,
	onChange
}) => {
	return (
		<>
			{label && (
				<label htmlFor={id} className="form-label">
					{label}
				</label>
			)}
			<select
				className={`form-select form-select-${size}`}
				id={id}
				name={name}
				onChange={onChange}
				required={required}>
				<option value="">{firstOption}</option>
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
