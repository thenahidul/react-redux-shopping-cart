import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartSummary from "../components/Cart/CartSummary";
import Input from "../components/common/Input";
import { clearCart, getCartTotalPrice } from "../utils/store/cartSlice";
import { formatPrice, schema } from "../utils/functions";
import { createOrder } from "../utils/store/orderSlice";
import Modal from "../components/Order/Modal";
import Paypal from "../components/Order/Paypal";
import countryList from "react-select-country-list";
import Select from "../components/common/Select";

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

	const checkoutForm = useRef();
	const countries = useMemo(() => countryList().getData(), []);

	const [modal, setModal] = useState(false);
	const [showPaypal, setShowPaypal] = useState(false);

	const [errors, setErrors] = useState({});
	const [orderData, setOrderData] = useState({
		customer: {
			firstname: "",
			lastname: "",
			email: "",
			address: "",
			country: "",
			city: "",
			phone: "",
			zip: ""
		},
		items,
		total,
		payment,
		shipping
	});

	useEffect(() => {
		setOrderData((prevState) => ({
			...prevState,
			total,
			payment,
			shipping
		}));
	}, [total, payment, shipping]);

	useEffect(() => {
		if (orderSuccess) {
			// dispatch(clearCart());
		}
	}, [orderSuccess]);

	const validateInputs = () => {
		const { error: formErrors } = schema.validate(orderData.customer, {
			abortEarly: false
		});
		if (!formErrors) return null;

		const errors = {};
		for (let item of formErrors.details) {
			errors[item.path[0]] = item.message;
		}
		return errors;
	};

	const handleChange = ({ currentTarget: input }) => {
		const _customer = {};
		const { name, value } = input;

		if (name === "zip") {
			_customer[name] = +value;
		} else {
			_customer[name] = value.trim();
		}

		setOrderData((prevState) => ({
			...prevState,
			customer: { ...prevState.customer, ..._customer }
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formErrors = validateInputs();
		if (formErrors) {
			setErrors(formErrors);
			window.scrollTo(0, 0);
			return;
		}

		//another way to get button name
		// const btnPayment = window.event.submitter.name;
		const btnPayment = checkoutForm.current.btnName;

		if (btnPayment === "ppl") {
			setShowPaypal(true);
		}
		// validation passed
		else {
			// setTimeout(() => {
			dispatch(createOrder(orderData));
			// }, 5000);
			setModal(true);
		}
	};

	// paypal
	const handlePayment = (data) => {
		const { status, payer } = data;

		const newOrderData = {
			...orderData,
			payment: {
				...payment,
				status: status.toLowerCase(),
				payer_email: payer.email_address
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
			<form onSubmit={handleSubmit} ref={checkoutForm}>
				<div className="row">
					<h1>Checkout</h1>
					{cart.length ? (
						<>
							<div className="mt-4 col-lg-8">
								<div className="row g-3 form-row">
									<div className="col-md-6">
										<Input
											onChange={handleChange}
											label="First Name*"
											id="firstname"
											name="firstname"
											error={errors.firstname}
										/>
									</div>

									<div className="col-md-6">
										<Input
											onChange={handleChange}
											label="Last Name*"
											id="lastname"
											name="lastname"
											error={errors.lastname}
										/>
									</div>

									<div className="col-md-6">
										<Input
											onChange={handleChange}
											type="email"
											label="Email*"
											id="email"
											name="email"
											error={errors.email}
										/>
									</div>

									<div className="col-md-6">
										<Input
											onChange={handleChange}
											type="tel"
											label="Phone*"
											id="phone"
											name="phone"
											error={errors.phone}
										/>
									</div>

									<div className="col-12">
										<Input
											onChange={handleChange}
											label="Address*"
											id="address"
											name="address"
											error={errors.address}
										/>
									</div>
									<div className="col-md-4">
										<Select
											id="country"
											size="lg"
											options={countries}
											name="country"
											label="Country*"
											firstOption="Select a country"
											onChange={handleChange}
											error={errors.country}
										/>
									</div>
									<div className="col-md-4">
										<Input
											onChange={handleChange}
											label="City*"
											id="city"
											name="city"
											error={errors.city}
										/>
									</div>
									<div className="col-md-4">
										<Input
											onChange={handleChange}
											type="number"
											label="Zip*"
											id="zip"
											name="zip"
											error={errors.zip}
										/>
									</div>
								</div>
							</div>
							<div className="col-lg-4 mt-5">
								<CartSummary />
								<div className="mt-2">
									{payment._id === "ppl" ? (
										<>
											{!showPaypal ? (
												<button
													onClick={(e) => {
														checkoutForm.current.btnName =
															e.target.name;
													}}
													type="submit"
													name="ppl"
													className="btn btn-md bgc-primary w-100 mb-3">
													Proceed with Paypal
												</button>
											) : (
												<Paypal
													total={total}
													orderData={orderData}
													handlePayment={
														handlePayment
													}
													disable={
														validateInputs()
															? true
															: false
													}
												/>
											)}
										</>
									) : (
										<button
											onClick={(e) => {
												checkoutForm.current.btnName =
													e.target.name;
											}}
											type="submit"
											name="cod"
											className="btn btn-md bgc-primary w-100 mb-3">
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
