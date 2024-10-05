import React, { useMemo } from "react";
import "./styles.scss";
import { IProduct } from "../../../../@types";
import { RootState } from "../../../../store";

interface WaiterProductCardProps {
	product: IProduct;
}

const WaiterProductCard: React.FC<WaiterProductCardProps> = ({ product }) => {
	const categoryName = useMemo(
		() => typeof product.category !== "string" && product.category.name,
		[product]
	);

	return (
		<div className="w-product-card">
			<div className="w-product-image">
				<img src={product.picture?.url} alt={product.name} />
			</div>
			<div className="w-product-info">
				<div className="w-product-info-col">
					<h5 className="w-product-info-name">{product.name}</h5>
					<span className="w-product-info-category">{categoryName}</span>
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
