import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartSummary from "../components/Cart/CartSummary";
import Input from "../components/common/Input";
import { clearCart, getCartTotalPrice } from "../utils/store/cartSlice";
import { formatPrice } from "../functions.js";
import { createOrder } from "../utils/store/orderSlice";
import Modal from "../components/Order/Modal";
import Paypal from "../components/Order/Paypal";

const Checkout = () => {
	const cart = useSelector((state) => state.cart.list);
	const payment = useSelector((state) => state.payment.selected);
	const shipping = useSelector((state) => state.shipping.selected);
	const orderSuccess = useSelector((state) => state.order.newOrder.success);
	const total = useSelector((state) => formatPrice(getCartTotalPrice(state)));

	const dispatch = useDispatch();

	const items = cart.map((item) => ({
		_id: item._id,
		title: `${item.title} - ${item.color}, ${item.size}`,
		qty: item.qty,
		price: formatPrice(item.price * item.qty)
	}));

	const [modal, setModal] = useState(false);
	const [showPaypal, setShowPaypal] = useState(false);

	const [orderData, setOrderData] = useState({
		customer: {},
		items,
		total,
		payment,
		shipping
	});

	const handleChange = ({ currentTarget }) => {
		let { name, value } = currentTarget;

		if (name === "zip") {
			value = +value;
		}

		setOrderData((prevState) => ({
			...prevState,
			customer: {
				...prevState.customer,
				[name]: value
			}
		}));
	};

	useEffect(() => {
		setOrderData((prevState) => ({
			...prevState,
			total,
			payment,
			shipping
		}));

		payment._id === "ppl" ? setShowPaypal(true) : setShowPaypal(false);
	}, [total, payment, shipping]);

	useEffect(() => {
		if (orderSuccess) {
			dispatch(clearCart());
		}
	}, [orderSuccess]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createOrder(orderData));
		setModal(true);
	};

	// paypal
	const handlePayment = (data) => {
		const newOrderData = {
			...orderData,
			payment: {
				...payment,
				status: "completed",
				payer_email: data.payer.email_address
			}
		};

		dispatch(createOrder(newOrderData));
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	return (
		<div className="container min-vh-100 py-5">
			{modal && <Modal closeModal={closeModal} />}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<h1>Checkout</h1>
					{cart.length ? (
						<>
							<div className="mt-4 col-lg-8">
								<div className="row g-3 form-row">
									<div className="col-md-6">
										<Input
											onChange={handleChange}
											label="First Name"
											id="firstname"
											name="firstname"
										/>
									</div>

									<div className="col-md-6">
										<Input
											onChange={handleChange}
											label="Last Name"
											id="lastname"
											name="lastname"
										/>
									</div>

									<div className="col">
										<Input
											onChange={handleChange}
											type="email"
											label="Email"
											id="email"
											name="email"
										/>
									</div>

									<div className="col">
										<Input
											onChange={handleChange}
											type="tel"
											label="Phone"
											id="phone"
											name="phone"
										/>
									</div>

									<div className="col-12">
										<Input
											onChange={handleChange}
											label="Address"
											id="address"
											name="address"
										/>
									</div>
									<div className="col-md-4">
										<Input
											onChange={handleChange}
											label="Country"
											id="country"
											name="country"
										/>
									</div>
									<div className="col-md-4">
										<Input
											onChange={handleChange}
											label="City"
											id="city"
											name="city"
										/>
									</div>
									<div className="col-md-4">
										<Input
											onChange={handleChange}
											type="number"
											label="Zip"
											id="zip"
											name="zip"
										/>
									</div>
								</div>
							</div>
							<div className="col-lg-4 mt-5">
								<CartSummary />
								<div className="mt-2">
									{showPaypal ? (
										<Paypal
											total={total}
											orderData={orderData}
											handlePayment={handlePayment}
										/>
									) : (
										<button
											type="submit"
											className="btn btn-lg bgc-primary w-100 mb-3">
											Place Order
										</button>
									)}
								</div>
							</div>
						</>
					) : (
						<div className="col">Your Cart is Empty</div>
					)}
				</div>
			</form>
		</div>
	);
};

export default Checkout;
