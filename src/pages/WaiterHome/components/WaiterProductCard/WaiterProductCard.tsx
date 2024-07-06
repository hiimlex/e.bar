import React from "react";
import "./styles.scss";
import { IProduct } from "../../../../@types";

interface WaiterProductCardProps {
	product: IProduct;
}

const WaiterProductCard: React.FC<WaiterProductCardProps> = ({ product }) => {
	return (
		<div className="w-product-card">
			<div className="w-product-image">
				<img src={product.image_url} alt={product.name} />
			</div>
			<div className="w-product-info">
				<div className="w-product-info-col">
					<h5 className="w-product-info-name">{product.name}</h5>
					<span className="w-product-info-category">{product.category}</span>
				</div>

				<div className="w-product-info-row">
					<span className="w-product-info-price">{`R$ ${product.price}`}</span>

					<span className="w-product-info-stock">{`${product.stock}x`}</span>
				</div>
			</div>
		</div>
	);
};

export { WaiterProductCard };
