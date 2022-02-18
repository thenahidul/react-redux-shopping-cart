import React from "react";
import ChartSummary from "../components/Cart/CartSummary";
import Input from "../components/common/Input";

const Checkout = () => {
	return (
		<div className="container min-vh-100 py-5">
			<form>
				<div className="row">
					<h1>Checkout</h1>
					<div className="col-sm-8">
						<div className="row g-3">
							<div className="col-md-6">
								<Input label="First Name" id="firstname" />
							</div>

							<div className="col-md-6">
								<Input label="Last Name" id="latstname" />
							</div>

							<div className="col">
								<Input type="email" label="Email" id="email" />
							</div>

							<div className="col">
								<Input type="tel" label="Phone" id="phone" />
							</div>

							<div className="col-12">
								<Input label="Adress" id="adress" />
							</div>
							<div className="col-md-4">
								<Input label="Country" id="country" />
							</div>
							<div className="col-md-4">
								<Input label="City" id="city" />
							</div>
							<div className="col-md-4">
								<Input type="number" label="Zip" id="zip" />
							</div>
						</div>
					</div>
					<div className="col-sm-4">
						<ChartSummary />
						<div className="mt-2">
							<button type="submit" className="btn btn-lg bgc-primary w-100">
								Place Order
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Checkout;
