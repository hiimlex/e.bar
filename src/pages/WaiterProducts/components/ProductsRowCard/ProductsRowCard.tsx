import { useMemo } from "react";
import { Minus, Plus } from "react-feather";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../../../@types";
import { ChipStatus, IconButton } from "../../../../components";
import "./styles.scss";

interface ProductsRowCardProps {
	product: IProduct;

	showChangeButtons?: boolean;
	onChange?: (product: IProduct, n: number) => void;
	quantity?: number;

	slashedText?: boolean;
}

const ProductsRowCard: React.FC<ProductsRowCardProps> = ({
	product,
	showChangeButtons = false,
	onChange,
	quantity,
}) => {
	const { t } = useTranslation();
	const quantity_value = useMemo(() => quantity || 0, [quantity]);

	return (
		<div className={`product-row ${showChangeButtons ? "minify" : ""}`}>
			<div className="product-row-image">
				<img src={product.picture?.url} alt={product.name} />
			</div>
			<div className="product-row-info">
				<div className="product-row-info-row">
					<h5 className="product-row-info-name">{product.name}</h5>

					{!showChangeButtons && (
						<ChipStatus colorScheme="secondary" customClass="product-row-info-stock">
							{`${quantity}x`}
						</ChipStatus>
					)}
				</div>
				{showChangeButtons && (
					<div className="product-row-info-row product-row-info-row-start">
						<span className="product-row-info-price">
							{t("Generics.Currency.Format", { value: product.price })}
						</span>
					</div>
				)}
				{!showChangeButtons && (
					<>
						<span className="product-row-info-price">
							{t("Generics.Currency.Format", { value: product.price })}
						</span>
					</>
				)}
			</div>

			{showChangeButtons && (
				<div className="product-row-add">
					<IconButton
						onClick={() => onChange && onChange(product, quantity_value - 1)}
						disabled={quantity_value === 0}
					>
						<Minus size={14} />
					</IconButton>
					<span>{quantity_value || 0}</span>
					<IconButton
						onClick={() => onChange && onChange(product, quantity_value + 1)}
						disabled={quantity_value === product.stock}
					>
						<Plus size={14} />
					</IconButton>
				</div>
			)}
		</div>
	);
};

export { ProductsRowCard };
