import React from "react";
import "./styles.scss";

interface WaiterProductCardProps {}

const WaiterProductCard: React.FC<WaiterProductCardProps> = () => {
	return (
		<div className="w-product-card">
			<div className="w-product-image">
				<img
					src="https://res.cloudinary.com/piramides/image/upload/c_fill,h_564,w_395/v1/products/11061-heineken-zero-long-neck-330ml-24un.20240613133557.png?_a=BAAASyGX"
					alt="Image"
				/>
			</div>
			<div className="w-product-info">
				<div className="w-product-info-col">
					<h5 className="w-product-info-name">{"Cerveja"}</h5>
					<span className="w-product-info-category">{"Cervejas"}</span>
				</div>

				<div className="w-product-info-row">
					<span className="w-product-info-price">{"R$ 10,00"}</span>

					<span className="w-product-info-stock">{"+10"}</span>
				</div>
			</div>
		</div>
	);
};

export { WaiterProductCard };
