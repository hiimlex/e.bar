import styled from "styled-components";
import { getUnitInPx, shouldForwardProp } from "../../styles";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	gap: ${getUnitInPx(4)};
`;

const Container = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: ${getUnitInPx(4)};
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
`;

const Footer = styled.footer`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: ${getUnitInPx(4)};
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${getUnitInPx(1)};
	width: 100%;
	height: 100%;
	max-height: 100%;
	overflow-y: auto;
`;

const ListHeader = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 100px 60px;
	font-size: 14px;
	font-weight: 600;

	position: sticky;
	top: 0;
	z-index: 4;

	span {
		color: ${({ theme }) => theme.text.placeholder};
	}

	span:last-child {
		text-align: right;
	}
`;

const ListItem = styled.div.withConfig({
	shouldForwardProp,
})<{ textSlashed?: boolean }>`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 100px 60px;

	span:last-child {
		text-align: right;
	}

	${({ textSlashed }) =>
		textSlashed &&
		`
		* {
			text-decoration: line-through !important;
			color: $color-gray-3 !important;
		}
	`}
`;

const LargeButton = styled.button.withConfig({ shouldForwardProp })<{
	colorScheme?: "primary" | "secondary" | "danger";
	fitSize?: boolean;
}>`
	width: 100%;
	padding: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 6px;
	font-size: 16px;
	font-weight: 600;
	border-radius: ${getUnitInPx(2)};
	transition: ${({ theme }) => theme.styles.transition};

	${({ colorScheme, theme }) =>
		colorScheme &&
		theme.colors[colorScheme] &&
		`
		color: ${theme.text.white};
		background-color: ${theme.colors[colorScheme]};
	`}

	${({ fitSize }) => fitSize && `
		width: fit-content;
		height: fit-content;
	`}

	&:hover {
		cursor: pointer;
		scale: ${({ theme }) => theme.styles.scale};
	}

	&:disabled {
		opacity: 0.5 !important;

		&:hover {
			cursor: not-allowed;
			scale: 1;
		}
	}
`;

export default {
	Wrapper,
	List,
	ListHeader,
	ListItem,
	Header,
	Container,
	Footer,
	LargeButton,
};
