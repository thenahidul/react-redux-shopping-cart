import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import path from "path";

import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";

const myEnv = dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenvExpand.expand(myEnv);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
	"http://localhost:3000",
	"http://localhost:8080",
	"https://react-redux-shopping-cart-1bz4v7h25-thenahidul.vercel.app",
	"https://elegant-swartz-6637f0.netlify.app"
];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			console.log("Origin acceptable");
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	}
};

app.use(helmet());
app.use(cors(corsOptions));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../build")));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "../build/", "index.html"));
	});
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
