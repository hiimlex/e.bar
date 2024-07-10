import { Minus, Plus } from "react-feather";
import { IProduct } from "../../../../@types";
import { IconButton } from "../../../../components";
import "./styles.scss";
import { useMemo } from "react";

interface ProductsRowCardProps {
	product: IProduct;

	showAdd?: boolean;
	onAdd?: (product: IProduct, n: number) => void;
	selected?: number;
}

const ProductsRowCard: React.FC<ProductsRowCardProps> = ({
	product,
	showAdd = false,
	onAdd,
	selected,
}) => {
	const quantity = useMemo(() => selected || 0, [selected]);

	return (
		<div className={`product-row ${showAdd ? "minify" : ""}`}>
			<div className="product-row-image">
				<img src={product.image_url} alt={product.name} />
			</div>
			<div className="product-row-info">
				<div className="product-row-info-row">
					<h5 className="product-row-info-name">{product.name}</h5>

					{!showAdd && (
						<span className="chip-status chip-status-secondary product-row-info-stock">
							{`${product.stock}x`}
						</span>
					)}
				</div>
				{showAdd && (
					<div className="product-row-info-row product-row-info-row-start">
						<span className="product-row-info-price">{`R$ ${product.price}`}</span>
						<span className="product-row-info-stock product-row-info-stock-black">{`${product.stock}x`}</span>
					</div>
				)}
				{!showAdd && (
					<>
						<span className="product-row-info-price">{`R$ ${product.price}`}</span>
					</>
				)}
			</div>

			{showAdd && (
				<div className="product-row-add">
					<IconButton
						onClick={() => onAdd && onAdd(product, quantity - 1)}
						disabled={selected === 0}
					>
						<Minus size={14} />
					</IconButton>
					<span>{selected || 0}</span>
					<IconButton
						onClick={() => onAdd && onAdd(product, quantity + 1)}
						disabled={selected === product.stock}
					>
						<Plus size={14} />
					</IconButton>
				</div>
			)}
		</div>
	);
};

export { ProductsRowCard };
