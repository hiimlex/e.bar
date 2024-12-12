import styled from "styled-components";
import { getUnitInPx, shouldForwardProp } from "../../styles";

const TableItem = styled.div.withConfig({
	shouldForwardProp,
})<{
	active?: boolean;
}>`
	border-radius: 18px;
	padding: ${getUnitInPx(2)};
	gap: ${getUnitInPx(1)};
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	background: ${({ theme }) => theme.colors.gray100};

	${({ active, theme }) =>
		active &&
		`
		border: 2px dashed ${theme.colors.primary};
	`}

	min-height:120px;
	position: relative;

	${({ active, theme }) =>
		!active &&
		`
			box-shadow: ${theme.shadows.soft};
	`}
`;

const CenteredText = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: fit-content;
	height: fit-content;
`;

export default {
	TableItem,
	CenteredText,
};
