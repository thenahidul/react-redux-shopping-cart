const mongoose = require("mongoose");
const URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide a title for this product."],
			maxlength: [100, "Name cannot be more than 100 characters"]
		},
		// with help of mongoose-slug-generator
		slug: {
			type: String,
			slug: "title",
			slug_padding_size: 1,
			unique: true
		},
		description: {
			type: String,
			required: [true, "Please provide a title for this product."]
		},
		price: {
			type: Number,
			required: [true, "Please provide a price for this product"]
		},
		image: {
			type: String,
			required: [true, "Please provide a image for this product"]
		},
		availableSizes: [String],
		colors: [String]
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models.Product || mongoose.model("Product", ProductSchema);
