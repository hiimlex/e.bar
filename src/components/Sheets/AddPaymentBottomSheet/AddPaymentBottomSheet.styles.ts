import styled from "styled-components";
import { getUnitInPx, hexPercentage, shouldForwardProp } from "../../../styles";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
`;

const PaymentMethod = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;

const PaymentMethodItem = styled.div.withConfig({ shouldForwardProp })<{
	active?: boolean;
}>`
	background: ${({ theme }) => theme.colors.gray100};
	border: 1px solid ${({ theme }) => theme.colors.gray200};
	border-radius: ${getUnitInPx(2)};
	padding: ${getUnitInPx(2)};
	gap: ${getUnitInPx(1)};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-size: 12px;
	font-weight: 500;

	${({ active, theme }) =>
		active &&
		`
		border-color: ${theme.colors.primary};
		background: ${theme.colors.primary + hexPercentage[20]};
		color: ${theme.colors.primary};
	`}
	text-align: center;
	line-height: 100%;
	height: 100%;
`;

const InputFileWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12px 8px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;
const InputFilePrefix = styled.div``;
const InputFileSuffix = styled.div``;

export default {
	Container,
	PaymentMethod,
	PaymentMethodItem,
	InputFileWrapper,
	InputFilePrefix,
	InputFileSuffix,
};
