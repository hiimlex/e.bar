import { Edit2, Minus, Plus } from "react-feather";
import { IconButton } from "../../../../components";
import "./styles.scss";

interface ProductCardProps {}

const ProductCard: React.FC<ProductCardProps> = () => {
	return (
		<div className="product-card">
			<div className="product-image">
				<img
					src="https://res.cloudinary.com/piramides/image/upload/c_fill,h_564,w_395/v1/products/11061-heineken-zero-long-neck-330ml-24un.20240613133557.png?_a=BAAASyGX"
					alt="Image"
				/>

				<div className="product-edit">
					<IconButton theme="secondary">
						<Edit2 className="product-edit-icon" strokeWidth={2} size={16} />
					</IconButton>
				</div>
			</div>
			<div className="product-info">
				<div className="product-info-col">
					<h5 className="product-info-name">{"Cerveja"}</h5>
					<span className="product-info-category">{"Cervejas"}</span>
				</div>

				<div className="product-info-row">
					<span className="product-info-price">{"R$ 10,00"}</span>

					<div className="product-info-stock-wrapper">
						<IconButton size="sm">
							<Minus size={14} />
						</IconButton>
						<span className="product-info-stock">{"10"}</span>
						<IconButton size="sm">
							<Plus size={14} />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export { ProductCard };
