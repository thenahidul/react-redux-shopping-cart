import { useEffect } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { createOrder } from "../../utils/store/orderSlice";
import { useDispatch } from "react-redux";

const Paypal = ({ total, handlePayment }) => {
	const amount = total;
	const currency = "USD";
	const style = { layout: "vertical" };

	const dispatch2 = useDispatch();

	const ButtonWrapper = ({ currency, showSpinner }) => {
		const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

		useEffect(() => {
			dispatch({
				type: "resetOptions",
				value: {
					...options,
					currency: currency
				}
			});
		}, [currency, showSpinner, total]);

		return (
			<>
				{showSpinner && isPending && <div className="spinner" />}
				<PayPalButtons
					style={style}
					disabled={false}
					forceReRender={[amount, currency, style]}
					fundingSource={undefined}
					createOrder={(data, actions) => {
						return actions.order
							.create({
								purchase_units: [
									{
										amount: {
											currency_code: currency,
											value: amount
										}
									}
								]
							})
							.then((orderId) => {
								console.log("Order Created", orderId, data);
								// Your code here after create the order
								return orderId;
							});
					}}
					onApprove={function (data, actions) {
						return actions.order.capture().then(function (details) {
							handlePayment(details);
							// console.log("Order Captured", details);
							// Your code here after capture the order
						});
					}}
				/>
			</>
		);
	};
	return (
		<div style={{ maxWidth: "750px", minHeight: "200px" }}>
			<PayPalScriptProvider
				options={{
					"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
					components: "buttons",
					currency: "USD",
					"disable-funding": "credit,card,p24"
				}}>
				<ButtonWrapper currency={currency} showSpinner={false} />
			</PayPalScriptProvider>
		</div>
	);
};

export default Paypal;
