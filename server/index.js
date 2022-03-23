const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const path = require("path");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const myEnv = dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenvExpand.expand(myEnv);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "../build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../build/index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
