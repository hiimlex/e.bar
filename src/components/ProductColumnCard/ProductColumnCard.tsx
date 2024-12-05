import { useTranslation } from "react-i18next";
import { IProduct } from "../../@types";

import S from "./ProductColumnCard.styles";
import { Box } from "leux";
import { Styled } from "../../styles";
import { IconButton } from "../IconButton";
import { Minus, Plus } from "react-feather";
import { useMemo } from "react";

type ProductColumnCardProps = {
	product: IProduct;

	showChangeButtons?: boolean;
	onChange?: (product: IProduct, n: number) => void;
	quantity?: number;
};

const ProductColumnCard: React.FC<ProductColumnCardProps> = ({
	product,
	showChangeButtons,
	onChange,
	quantity,
}) => {
	const { t } = useTranslation();
	const quantity_value = useMemo(() => quantity || 0, [quantity]);

	return (
		<S.Wrapper>
			<S.ProductImageWrapper>
				<S.ProductImage src={product.picture?.url} alt={product.name} />
				{showChangeButtons && (
					<S.ChangeQuantity>
						<IconButton
							onClick={() => onChange && onChange(product, quantity_value - 1)}
							disabled={quantity_value === 0}
						>
							<Minus size={14} />
						</IconButton>
						<Styled.Typography.Button>{quantity_value}</Styled.Typography.Button>
						<IconButton
							onClick={() => onChange && onChange(product, quantity_value + 1)}
							disabled={quantity_value === product.stock}
						>
							<Plus size={14} />
						</IconButton>
					</S.ChangeQuantity>
				)}
			</S.ProductImageWrapper>
			<S.Info>
				<Box>
					<Styled.Typography.BodyBold textColor="darker">
						{product.name}
					</Styled.Typography.BodyBold>
				</Box>
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Styled.Typography.Caption textColor="placeholder">
						R$ {product.price}
					</Styled.Typography.Caption>
					<Styled.Typography.Caption textColor="placeholder">
						{product.stock}x
					</Styled.Typography.Caption>
				</Box>
			</S.Info>
		</S.Wrapper>
	);
};

export default ProductColumnCard;
