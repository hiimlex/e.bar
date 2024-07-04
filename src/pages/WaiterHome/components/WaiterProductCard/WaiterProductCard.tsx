import React from "react";
import "./styles.scss";

interface WaiterProductCardProps {}

const WaiterProductCard: React.FC<WaiterProductCardProps> = () => {
	return (
		<div className="product-card">
			<div className="product-image">
				<img
					src="https://res.cloudinary.com/piramides/image/upload/c_fill,h_564,w_395/v1/products/11061-heineken-zero-long-neck-330ml-24un.20240613133557.png?_a=BAAASyGX"
					alt="Image"
				/>
			</div>
			<div className="product-info">
				<div className="product-info-col">
					<h5 className="product-info-name">{"Cerveja"}</h5>
					<span className="product-info-category">{"Cervejas"}</span>
				</div>

				<div className="product-info-row">
					<span className="product-info-price">{"R$ 10,00"}</span>

					<span className="product-info-stock">{"10"}x</span>
				</div>
			</div>
		</div>
	);
};

export { WaiterProductCard };
