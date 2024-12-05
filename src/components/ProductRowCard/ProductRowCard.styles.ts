import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Card = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	width: 100%;

	gap: ${getUnitInPx(3)};
`;

const Info = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
`;


const ChangeQuantity = styled.div`
	display: grid;
	grid-template-columns: 28px 28px 28px;
	text-align: center;
	align-items: center;
	gap: ${getUnitInPx(1)};
`;

const ChangeQuantityButton = styled.button``;

const ProductImage = styled.img`
	height: 48px;
	border-radius: 4px;
`;

const ProductImageWrapper = styled.div`
	width: 72px;
	height: 72px;
	border-radius: 12px;
	padding: 6px;
	background: ${({ theme }) => theme.colors.gray100};

	display: flex;
	align-items: center;
	justify-content: center;
`;

export default {
	Card,
	Info,
	ChangeQuantity,
	ChangeQuantityButton,
	ProductImage,
	ProductImageWrapper,
};
