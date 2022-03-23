const express = require("express");
const Order = require("../models/Order");
const dbConnect = require("../utils/dbConnect");

const router = express.Router();

// dbConnect();

// get
router.get("/", async (req, res) => {
	await dbConnect();
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.get("/:slug", async (req, res) => {
	// change to _id
	await dbConnect();
	try {
		const orders = await Order.find({ slug: req.params.slug });
		res.status(200).json(orders.length ? orders[0] : {});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// create
router.post("/", async (req, res) => {
	await dbConnect();
	try {
		let order = new Order(req.body);
		const result = await order.save();
		res.status(201).json(result);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

// delete
router.delete("/", async (req, res) => {
	try {
		const response = await Order.deleteMany();
		res.status(204).json(response);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const response = await Order.findByIdAndRemove(req.params.id);
		res.status(204).json(response);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

module.exports = router;
