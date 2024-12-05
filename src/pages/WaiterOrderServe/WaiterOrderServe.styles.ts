import styled from "styled-components";
import { getUnitInPx, shouldForwardProp } from "../../styles";

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	gap: ${getUnitInPx(3)};
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
	width: 100%;
	height: 100%;
`;

const List = styled.div`
	display: flex;
	width: 100%;
	height: 100%;

	flex-direction: column;
	gap: ${getUnitInPx(1)};
`;

const ListItem = styled.div`
	display: grid;
	grid-template-columns: 40px 1fr 80px;

	span:last-child,
	strong:last-child {
		text-align: right;
	}
`;

const ListText = styled.span.withConfig({
	shouldForwardProp,
})<{ textSlashed?: boolean }>`
	font-size: 14px;
	font-weight: 500;
	color: ${({ theme, textSlashed }) =>
		textSlashed ? theme.text.placeholder : theme.text.dark};
	text-decoration: ${(props) => (props.textSlashed ? "line-through" : "none")};
`;

const Footer = styled.footer`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: ${getUnitInPx(2)};
`;

export default {
	Container,
	Content,
	Footer,
	List,
	ListItem,
	ListText,
};
