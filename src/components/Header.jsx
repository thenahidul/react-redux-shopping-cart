import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BsCart4, BsBorderStyle } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
import { getCartTotalItem } from "../utils/store/cartSlice";
import Notice from "./common/Notice";
import CartMini from "./Cart/CartMini";

const Header = () => {
	const [width, setWidth] = useState();
	const [collapse, setCollapse] = useState("");

	const path = useLocation().pathname;
	const total = useSelector((state) => getCartTotalItem(state.cart));

	const getWindowWidth = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		getWindowWidth();
		window.addEventListener("resize", getWindowWidth);
	}, [width]);

	const renderMiniCart = () => (
		<div className="position-absolute dropdown header-minicart">
			<CartMini />
		</div>
	);

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
				<div className="container">
					<Link
						className="navbar-brand d-flex align-items-center"
						to="/">
						<BsBorderStyle />
						<span className="ms-1">RDX Shopping</span>
					</Link>
					<div className="d-flex">
						{width <= 991 && (
							<ul className="m-0 p-0 d-flex align-items-center">
								<li className="nav-item position-relative dropdown-trigger-mobile">
									<NavLink
										className="nav-link color-primary d-flex align-items-center"
										to="/cart">
										<BsCart4 size="18" /> ({total})
									</NavLink>
									{renderMiniCart()}
								</li>
							</ul>
						)}

						<button
							onClick={() => setCollapse(!collapse)}
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarNav"
							aria-controls="navbarNav"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<AiOutlineBars
								size="20"
								className="color-primary fw-600"
							/>
						</button>
					</div>
					<div
						className={`collapse navbar-collapse justify-content-end ${
							collapse && "show"
						} `}
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
							{!!total && (
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
									{width > 991 ? (
										<>
											<BsCart4 size="18" /> ({total})
										</>
									) : (
										"Cart"
									)}
								</NavLink>
								{width > 991 && renderMiniCart()}
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
