/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const Paypal = ({ total, handlePayment, disable }) => {
	const amount = total;
	const currency = "USD";
	const style = { layout: "vertical" };

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
					disabled={disable}
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
								console.log("Order Created", orderId);
								// Your code here after create the order
								return orderId;
							});
					}}
					onApprove={(data, actions) => {
						return actions.order.capture().then((details) => {
							console.log("ap", details);
							handlePayment(details);
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
				deferLoading={true}
				options={{
					"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
					components: "buttons",
					currency: "USD",
					"disable-funding": "credit,p24"
				}}>
				<ButtonWrapper currency={currency} showSpinner={false} />
			</PayPalScriptProvider>
		</div>
	);
};

export default Paypal;
