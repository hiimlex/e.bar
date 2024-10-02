import { Edit2 } from "react-feather";
import { IProduct } from "../../../../@types";
import { IconButton } from "../../../../components";
import "./styles.scss";

interface ProductCardProps {
	product: IProduct;
	onEdit?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
	return (
		<div className="product-card">
			<div className="product-image">
				<img src={product.picture?.url} alt={product.name} />

				<div className="product-edit">
					<IconButton theme="secondary" onClick={onEdit}>
						<Edit2 className="product-edit-icon" strokeWidth={2} size={16} />
					</IconButton>
				</div>
			</div>
			<div className="product-info">
				<div className="product-info-col">
					<h5 className="product-info-name">{product.name}</h5>
					<span className="product-info-category link link-primary">{product.category_name}</span>
				</div>

				<div className="product-info-row">
					<span className="product-info-price">{`R$ ${product.price}`}</span>

					<div className="product-info-stock-wrapper">
						{/* <IconButton size="sm">
							<Minus size={14} />
						</IconButton> */}
						<span className="product-info-stock">{product.stock}x</span>
						{/* <IconButton size="sm"> */}
						{/* <Plus size={14} /> */}
						{/* </IconButton> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export { ProductCard };
