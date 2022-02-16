import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="min-vh-100 main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
