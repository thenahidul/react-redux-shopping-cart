import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
	return (
		<>
			<Header />
			<main>
				<div className="min-vh-100 container">
					<div className="row">
						<div className="col-sm-8">Main Content</div>
						<div className="col-sm-4">Sidebar</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default App;
