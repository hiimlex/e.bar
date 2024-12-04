import { useMemo } from "react";
import { Minus, Plus } from "react-feather";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../../../@types";
import { ChipStatus, IconButton } from "../../../../components";

import S from "./ProductsRowCard.styles";
import { Box } from "leux";
import { Styled } from "../../../../styles";

type ProductsRowCardProps = {
	product: IProduct;

	showChangeButtons?: boolean;
	onChange?: (product: IProduct, n: number) => void;
	quantity?: number;

	slashedText?: boolean;
};

export const ProductsRowCard: React.FC<ProductsRowCardProps> = ({
	product,
	showChangeButtons = false,
	onChange,
	quantity,
}) => {
	const { t } = useTranslation();
	const quantity_value = useMemo(() => quantity || 0, [quantity]);

	return (
		<S.Card>
			<S.ProductImageWrapper>
				<S.ProductImage src={product.picture?.url} alt={product.name} />
			</S.ProductImageWrapper>
			<S.Info>
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Styled.Typography.BodyBold>
						{product.name}
					</Styled.Typography.BodyBold>

					{!showChangeButtons && (
						<ChipStatus
							colorScheme="secondary"
							customClass="product-row-info-stock"
						>
							{`${quantity}x`}
						</ChipStatus>
					)}
				</Box>
				<Styled.Typography.Caption fontWeight={500} textColor="dark">
					{t("Generics.Currency.Format", { value: product.price })}
				</Styled.Typography.Caption>
			</S.Info>

			{showChangeButtons && (
				<S.ChangeQuantity>
					<IconButton
						onClick={() => onChange && onChange(product, quantity_value - 1)}
						disabled={quantity_value === 0}
					>
						<Minus size={14} />
					</IconButton>
					<Styled.Typography.Button>
						{quantity_value || 0}
					</Styled.Typography.Button>
					<IconButton
						onClick={() => onChange && onChange(product, quantity_value + 1)}
						disabled={quantity_value === product.stock}
					>
						<Plus size={14} />
					</IconButton>
				</S.ChangeQuantity>
			)}
		</S.Card>
	);
};
