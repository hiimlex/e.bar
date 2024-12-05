import styled from "styled-components";
import { getUnitInPx, hexPercentage, shouldForwardProp } from "../../styles";

const Card = styled.div`
	min-width: 120px;
	max-width: 200px;
	width: 100%;
	background: ${({ theme }) => theme.colors.gray100};

	display: flex;
	flex-direction: column;
	border-radius: ${getUnitInPx(2)};
	overflow: hidden;
`;

const ImageWrapper = styled.div`
	border-radius: ${getUnitInPx(3)};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px 0;
	box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.05);
	background: ${({ theme }) => theme.colors.primary + hexPercentage[60]};
`;

const Image = styled.img`
	height: 60px;
	border-radius: 4px;
`;

const Info = styled.div`
	padding: ${getUnitInPx(2)};
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
`;

const Category = styled.span.withConfig({ shouldForwardProp })<{
	isClickable?: boolean;
}>`
	font-weight: 500;
	font-size: 12px;
	color: ${({ theme }) => theme.colors.primary};

	cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
`;

export default { Card, ImageWrapper, Category, Image, Info };
