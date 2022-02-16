import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import styles from "./Product.module.css";

const Product = ({ product }) => {
	return (
		<div className="col">
			<div className="card h-100 img-thumbnail">
				<Link to={`/${product._id}`}>
					<img
						src={product.image}
						className="card-img-top"
						alt={product.title}
					/>
				</Link>
				<div className={`card-body ${styles.productBody}`}>
					<h5 className={`card-title ${styles.productTitle}`}>
						<Link
							to={`/${product._id}`}
							className="color-secondary">
							{product.title}
						</Link>
					</h5>
				</div>
				<AddToCart product={product} />
			</div>
		</div>
	);
};

export default Product;
