import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../functions";
import { addToCart } from "../../utils/store/cartSlice";
import Input from "../common/Input";
import Select from "../common/Select";
import styles from "./Product.module.css";

const AddToCart = ({ product }) => {
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		if (!size) return alert("Select a size");
		if (!color) return alert("Select a color");
		if (!qty) return alert("Select quantity");

		dispatch(addToCart({ ...product, size, color, qty: +qty }));
		// +qty to make it number
		// setQty(1);
	};

	return (
		<>
			<div className="d-flex align-items-center justify-content-between px-3 gap-3">
				<Select
					id="size"
					size="md"
					options={product.availableSizes}
					firstOption="Select a size"
					onChange={(e) => setSize(e.target.value)}
				/>
				<Select
					id="color"
					size="md"
					options={product.colors}
					firstOption="Select a color"
					onChange={(e) => setColor(e.target.value)}
				/>
			</div>
			<div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center">
				<h6 className="m-0 text-dark">
					{formatCurrency(product.price)}
				</h6>
				<div>
					<Input
						type="number"
						min={1}
						value={qty}
						className={styles.qty}
						onChange={(e) => setQty(e.target.value)}
					/>
					<button
						className="btn btn-warning rounded-0"
						onClick={() => handleAddToCart(product)}>
						Add to Cart
					</button>
				</div>
			</div>
		</>
	);
};

export default AddToCart;
