import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/functions";
import { addToCart } from "../../utils/store/cartSlice";
import Input from "../common/Input";
import Select from "../common/Select";

const AddToCartSingle = ({ product, handleClick }) => {
	const [size, setSize] = useState("");
	const [color, setColor] = useState("");
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		if (!size) return alert("Select a size");
		if (!color) return alert("Select a color");
		if (!qty) return alert("Select quantity");

		dispatch(addToCart({ ...product, size, color, qty: +qty }));
		handleClick(product);
	};
	return (
		<>
			<h3 className="my-3 text-dark price">
				{formatCurrency(product.price)}
			</h3>
			<div className="d-flex w-75 align-items-center justify-content-between gap-3 my-3">
				<Select
					id="size"
					size="lg"
					options={product.availableSizes}
					firstOption="Select a size"
					onChange={(e) => setSize(e.target.value)}
				/>
				<Select
					id="color"
					size="lg"
					options={product.colors}
					firstOption="Select a color"
					onChange={(e) => setColor(e.target.value)}
				/>
			</div>
			<div className="d-flex">
				<button
					className="btn btn-lg btn-warning rounded-0 btn-add-to-cart px-5 me-2"
					onClick={() => handleAddToCart(product)}>
					Add to Cart
				</button>
				<Input
					type="number"
					min={1}
					value={qty}
					className="qty form-control"
					style={{ width: "80px", textAlign: "center" }}
					onChange={(e) => setQty(e.target.value)}
				/>
			</div>
		</>
	);
};

export default AddToCartSingle;
