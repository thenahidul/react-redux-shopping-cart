import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import OrderSummmary from "./OrderSummary";

const Modal = ({ closeModal }) => {
	const { loading, error } = useSelector((state) => state.order);
	// const orderSuccess = useSelector((state) => state.order.newOrder.success);

	return (
		<>
			<div className="modal" tabIndex={-1} style={{ display: "block" }}>
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						{loading ? (
							<div className="modal-header border-0 bg-danger text-center text-white">
								<h5 className="flex-grow-1 modal-title">
									{error
										? "Something went wrong!"
										: "Processing order..."}
								</h5>
								<IoCloseSharp
									size="28"
									onClick={closeModal}
									className="cursor-pointer"
								/>
							</div>
						) : (
							<>
								<div className="modal-header border-0  bg-success text-white text-center">
									<h5 className="flex-grow-1 modal-title">
										Thank you. Your order has been received.
									</h5>
									<IoCloseSharp
										size="28"
										onClick={closeModal}
										className="cursor-pointer"
									/>
								</div>
								<div className="modal-body">
									<OrderSummmary />
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>
		</>
	);
};

export default Modal;
