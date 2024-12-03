import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const BottomSheetContainer = styled.div`
	width: 100%;
	height: fit-content;

	display: flex;
	flex-direction: column;

	background: ${({ theme }) => theme.colors.background};
	border-top-left-radius: ${getUnitInPx(6)};
	border-top-right-radius: ${getUnitInPx(6)};
	padding: ${getUnitInPx(4)};
	box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);
	gap: ${getUnitInPx(3)};
`;

const BottomSheetOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	background: rgba(0, 0, 0, 0.2);
	z-index: 100;

	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;
`;

export default { BottomSheetContainer, BottomSheetOverlay };
