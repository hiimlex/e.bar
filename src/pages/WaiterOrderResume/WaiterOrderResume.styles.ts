import styled from "styled-components";
import { getUnitInPx, shouldForwardProp } from "../../styles";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
`;

const List = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${getUnitInPx(1)};
	width: 100%;
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
		text-align: right;
	}

	span:first-child {
		text-align: left;
	}
`;

const ListItem = styled.div.withConfig({
	shouldForwardProp,
})<{ textSlashed?: boolean }>`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 100px 60px;

	span {
		text-align: right;
	}

	span:first-child {
		text-align: left;
	}

	${({ textSlashed }) =>
		textSlashed &&
		`
		* {
			color: $color-gray-3 !important;
		}
	`}
`;

export default { Container, List, ListHeader, ListItem };
