import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Notice from "./common/Notice";
import CartMini from "./Cart/CartMini";
import { useSelector } from "react-redux";
import { getCartTotalItem } from "../utils/store/cartSlice";

const Header = () => {
	const path = useLocation().pathname;
	const total = useSelector((state) => getCartTotalItem(state.cart));

	return (
		<>
			<nav className="navbar-fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
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
							{total && (
								<li className="nav-item">
									<NavLink
										className="nav-link mx-2"
										to="/checkout">
										Checkout
									</NavLink>
								</li>
							)}
							<li className="nav-item position-relative dropdown-trigger">
								<NavLink
									className="nav-link mx-2 d-flex align-items-center"
									to="/cart">
									<BsCart4 size="18" /> ({total})
								</NavLink>
								<div className="position-absolute dropdown header-minicart">
									<CartMini />
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			{(path === "/" ||
				path === "/cart" ||
				path.startsWith("/product")) && <Notice />}
		</>
	);
};

export default Header;
