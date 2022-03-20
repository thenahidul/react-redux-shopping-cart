import Products from "../components/Product/Products";
// eslint-disable-next-line no-unused-vars

const Home = () => {
	return (
		<div className="container min-vh-100 py-5">
			<div className="row">
				<div className="col">
					<Products />
				</div>
			</div>
		</div>
	);
};

export default Home;
