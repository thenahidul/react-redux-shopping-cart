import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import AddToCartSingle from "./AddToCartSingle";
import { getProduct } from "../../utils/store/productSlice";
import Notice from "../common/Notice";
import BtnGroup from "../common/BtnGroup";

const ProductSingle = () => {
	const [notice, setNotice] = useState(false);

	const { loading, singleProduct: product } = useSelector(
		(state) => state.product
	);
	// const product = useSelector((state) => state.product.singleProduct);
	const dispatch = useDispatch();

	const { slug } = useParams();

	useEffect(() => {
		dispatch(getProduct({ slug }));
	}, [dispatch, slug]);

	const handleClick = (product) => {
		window.scrollTo(0, 0);
		setNotice(true);
	};

	return (
		<div className="container min-vh-100 py-5 product-single">
			{notice && (
				<Notice type="success">
					<p className="mb-lg-0 my-1">
						<BsFillCheckCircleFill className="mx-2" />
						{product.title} has been added to your cart
					</p>
					<BtnGroup cssClass="d-block" />
				</Notice>
			)}

			{loading ? (
				<div className="w-100 py-3 text-center">Product loading...</div>
			) : Object.keys(product).length ? (
				<div className="row align-items-center">
					<div className="col-md-5 mb-md-0 mb-4">
						<img
							src={product.image}
							alt={product.title}
							className="img-thumbnail"
						/>
					</div>
					<div className="col-md-7">
						<div className="product-details">
							<h1 className="f-letter-uppercase product-title">
								{product.title}
							</h1>
							<div className="my-4">{product.description}</div>
							<AddToCartSingle
								product={product}
								handleClick={handleClick}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="w-100 py-3 bg-danger text-white text-center">
					No product found
				</div>
			)}
		</div>
	);
};

export default ProductSingle;
