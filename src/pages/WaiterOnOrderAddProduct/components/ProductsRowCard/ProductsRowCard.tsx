import "./styles.scss";

interface ProductsRowCardProps {}

const ProductsRowCard: React.FC<ProductsRowCardProps> = () => {
	return (
		<div className="product-row">
			<div className="product-row-image">
				<img
					src="https://res.cloudinary.com/piramides/image/upload/c_fill,h_564,w_395/v1/products/11061-heineken-zero-long-neck-330ml-24un.20240613133557.png?_a=BAAASyGX"
					alt="Image"
				/>
			</div>
			<div className="product-row-info">
				<div className="product-row-info-row">
					<h5 className="product-row-info-name">{"Cerveja"}</h5>

					<span className="chip-status chip-status-secondary product-row-info-stock">
						{"+10"}
					</span>
				</div>
				<span className="product-row-info-category">{"Cervejas"}</span>

				<span className="product-row-info-price">{"R$ 10,00"}</span>
			</div>
		</div>
	);
};

export { ProductsRowCard };
