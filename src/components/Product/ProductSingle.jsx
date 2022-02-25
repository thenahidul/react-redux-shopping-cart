import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import AddToCartSingle from "./AddToCartSingle";
import { getProduct } from "../../utils/store/productSlice";
import Notice from "../common/Notice";
import BtnGroup from "../common/BtnGroup";

const ProductSingle = () => {
	const [noticeText, setNoticeText] = useState("");
	const [notice, setNotice] = useState(false);
	const product = useSelector((state) => state.product.singleProduct);
	const dispatch = useDispatch();

	const { slug } = useParams();

	useEffect(() => {
		dispatch(getProduct({ slug }));
	}, [dispatch, slug]);

	const handleClick = (product) => {
		setNotice(true);

		// to pass html data ast prop in <Notice/> element
		setNoticeText([
			<BsFillCheckCircleFill className="mx-2" />,
			product.title,
			<span className="mx-2">has been added to your cart</span>,
			<BtnGroup />
		]);
	};

	return Object.keys(product).length ? (
		<div className="container min-vh-100 py-5 product-single">
			{notice && <Notice text={noticeText} type="success" />}
			<div className="row align-items-center">
				<div className="col-md-5">
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
						<p>{product.description}</p>
						<AddToCartSingle
							product={product}
							handleClick={handleClick}
						/>
					</div>
				</div>
			</div>
		</div>
	) : (
		"No Product Found!"
	);
};

export default ProductSingle;
