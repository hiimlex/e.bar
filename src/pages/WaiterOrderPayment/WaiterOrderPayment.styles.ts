import styled from "styled-components";
import { getUnitInPx, hexPercentage } from "../../styles";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	justify-content: space-between;
`;
const Container = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
	max-height: 100%;
	overflow-y: auto;
	gap: ${getUnitInPx(3)};
	margin-bottom: 140px;
`;

const ContainerHeader = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
`;

const ClickableIcon = styled.div`
	cursor: pointer;
`;

const Content = styled.div``;

const Footer = styled.footer`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
	padding: ${getUnitInPx(3)} ${getUnitInPx(2)};
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	box-shadow:  0 -2px 3px 1px rgba(0, 0, 0, 0.1);
	background: ${({ theme }) => theme.colors.background};
`;

const AddPaymentButton = styled.button`
	width: 100%;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	background: ${({ theme }) => theme.colors.primary + hexPercentage[10]};

	padding: ${getUnitInPx(2)} ${getUnitInPx(3)};
	border-radius: ${getUnitInPx(2)};
	font-size: 14px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.primary};
	transition: ${({ theme }) => theme.styles.transition};

	&:hover {
		background: ${({ theme }) => theme.colors.primary + hexPercentage[20]};
	}
`;

const PaymentList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;

export default {
	Wrapper,
	Container,
	ContainerHeader,
	Header,
	Content,
	Footer,
	ClickableIcon,
	AddPaymentButton,
	PaymentList
};
