import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;

const ProductImageWrapper = styled.div`
	width: 100%;
	padding: 18px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: ${getUnitInPx(3)};
	background-color: ${({ theme }) => theme.colors.gray100};

	gap: ${getUnitInPx(2)};
`;
const ProductImage = styled.img`
	height: 60px;
	width: auto;
	border-radius: 4px;
`;

const Info = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
	padding: 0 ${getUnitInPx(1)};
`;

const ChangeQuantity = styled.div`
	display: grid;
	grid-template-columns: 28px 28px 28px;
	text-align: center;
	align-items: center;
	gap: ${getUnitInPx(1)};
`;

export default {
	Wrapper,
	ProductImageWrapper,
	ProductImage,
	Info,
	ChangeQuantity,
};
