import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		customer: {
			firstname: {
				type: String,
				required: [true, "Provide name."]
			},
			lastname: {
				type: String,
				required: [true, "Provide name."]
			},
			email: {
				type: String,
				required: [true, "Provide email."]
			},
			phone: {
				type: String,
				required: [true, "Provide phone."]
			},
			address: {
				type: String,
				required: [true, "Provide address."]
			},
			country: {
				type: String,
				required: [true, "Provide country."]
			},
			city: {
				type: String,
				required: [true, "Provide city."]
			},
			zip: {
				type: Number,
				required: [true, "Provide a zip."]
			}
		},

		total: {
			type: Number,
			required: [true, "Provide total."]
		},
		items: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: [true, "Provide item _id."]
				},
				title: {
					type: String,
					required: [true, "Provide item title."]
				},
				qty: {
					type: Number,
					required: [true, "Provide item qty."]
				},
				price: {
					type: Number,
					required: [true, "Provide item price."]
				}
			}
		],
		payment: {
			_id: {
				type: String,
				required: [true, "Provide payment _id."]
			},
			title: {
				type: String,
				required: [true, "Provide payment title."]
			},
			status: {
				type: String,
				default: "pending"
			},
			payer_email: String
		},
		shipping: {
			_id: {
				type: String,
				required: [true, "Provide shipping method."]
			},
			title: {
				type: String,
				required: [true, "Provide shipping title."]
			},
			rate: {
				type: Number,
				required: [true, "Provide shipping price."]
			}
		}
	},
	{ timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
