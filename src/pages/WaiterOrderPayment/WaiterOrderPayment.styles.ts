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
	gap: ${getUnitInPx(3)};
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
const Footer = styled.footer``;

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

export default {
	Wrapper,
	Container,
	ContainerHeader,
	Header,
	Content,
	Footer,
	ClickableIcon,
	AddPaymentButton,
};
