import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Notice from "./common/Notice";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getCartTotalItem } from "../utils/store/cartSlice";

const Header = () => {
	const path = useLocation().pathname;

	// const total = useSelector((state) => getCartTotalItem(state.cart));

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container">
					<Link className="navbar-brand" to="/">
						RDX Shopping
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse navbar-collapse justify-content-end"
						id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink
									className="nav-link mx-2"
									aria-current="page"
									to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link mx-2" to="/about">
									About
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link mx-2" to="/cart">
									Cart
									{/* <FaShoppingBag /> {total} */}
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				<style jsx="true">{`
					.navbar-nav li a {
						font-family: "Open Sans", sans-serif;
						color: #ffc200 !important;
						font-weight: 500;
						font-size: 18px;
						text-transform: uppercase;
					}
					.navbar-nav li a:hover,
					.navbar-nav li a.active {
						color: #ff7600 !important;
					}
				`}</style>
			</nav>
			{(path === "/" || path === "/cart") && <Notice />}
		</>
	);
};

export default Header;
