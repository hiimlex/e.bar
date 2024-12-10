import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.main`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(4)};
	width: 100%;
	height: 100%;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(1)};
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
`;

const MenuItem = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${getUnitInPx(2)};
	padding: ${getUnitInPx(2)};
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
	height: 60px;
	color: ${({ theme }) => theme.text.placeholder};

	&:first-child {
		border-top: 1px solid ${({ theme }) => theme.colors.gray200};
	}

	transition: ${({ theme }) => theme.styles.transition};

	&:hover,
	&:active {
		background-color: ${({ theme }) => theme.colors.gray100};
	}

	&:disabled {
		&:hover {
			background-color: transparent;
		}
	}
`;

const Logout = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	height: fit-content;
	padding: ${getUnitInPx(2)};
	gap: ${getUnitInPx(2)};
	align-self: center;
	color: ${({ theme }) => theme.colors.danger};
`;

export default {
	Container,
	Menu,
	MenuItem,
	Logout,
	Header,
};
