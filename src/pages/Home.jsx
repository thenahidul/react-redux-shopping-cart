import React from "react";
import Products from "../components/Product/Products";
import Sidebar from "../components/Sidebar";

const Home = () => {
	return (
		<div className="container min-vh-100 py-5">
			<div className="row">
				<div className="col-lg-9 col-md-8">
					<Products />
				</div>
				<div className="col-lg-3 col-md-4">
					<Sidebar />
				</div>
			</div>
		</div>
	);
};

export default Home;
