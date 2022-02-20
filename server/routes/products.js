import express from "express";
import Product from "../models/Product";
import dbConnect from "../utils/dbConnect";

const router = express.Router();

dbConnect();

// get
router.get("/", async (req, res) => {
	// await dbConnect();
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.get("/:slug", async (req, res) => {
	// await dbConnect();
	try {
		const products = await Product.find({ slug: req.params.slug });
		res.status(200).json(products.length ? products[0] : {});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.post("/", async (req, res) => {
	try {
		let product = new Product(req.body);
		const result = await product.save();
		res.status(201).json(result);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

// delete
router.delete("/", async (req, res) => {
	try {
		const response = await Product.deleteMany();
		res.status(204).json(response);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const response = await Product.findByIdAndRemove(req.params.id);
		res.status(204).json(response);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
});

export default router;
