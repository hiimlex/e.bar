import React, { useMemo } from "react";
import { IProduct } from "../../@types";

import { Box } from "leux";
import { Styled } from "../../styles";
import S from "./WaiterProductCard.styles";

interface WaiterProductCardProps {
	product: IProduct;
	onCategoryClick?: (categoryId: string) => void;
	categoryClickable?: boolean;
}

const WaiterProductCard: React.FC<WaiterProductCardProps> = ({
	product,
	onCategoryClick,
	categoryClickable = true,
}) => {
	const categoryName = useMemo(
		() => typeof product.category !== "string" && product.category.name,
		[product]
	);
	const categoryId = useMemo(
		() => typeof product.category !== "string" && product.category._id,
		[product]
	);

	return (
		<S.Card>
			<S.ImageWrapper>
				<S.Image src={product.picture?.url} alt={product.name} />
			</S.ImageWrapper>
			<S.Info>
				<Styled.Typography.Subtitle2>
					{product.name}
				</Styled.Typography.Subtitle2>
				<S.Category
					role="button"
					onClick={() =>
						onCategoryClick && !!categoryId && onCategoryClick(categoryId)
					}
					isClickable={categoryClickable}
				>
					{categoryName}
				</S.Category>
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Styled.Typography.Body>{`R$ ${product.price}`}</Styled.Typography.Body>

					<Styled.Typography.Body>{`${product.stock}x`}</Styled.Typography.Body>
				</Box>
			</S.Info>
		</S.Card>
	);
};

export { WaiterProductCard };
