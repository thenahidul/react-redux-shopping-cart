import React from "react";
import Products from "../components/Product/Products";
import Sidebar from "../components/Sidebar";

const Home = () => {
	return (
		<div className="container min-vh-100 py-5">
			<div className="row">
				<div className="col-sm-9">
					<Products />
				</div>
				<div className="col-sm-3">
					<Sidebar />
				</div>
			</div>
		</div>
	);
};

export default Home;
