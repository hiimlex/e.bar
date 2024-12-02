import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const LoadingApp = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${getUnitInPx(6)};

	position: absolute;
	z-index: 4;
	background: ${({ theme }) => theme.colors.background};
`;

export default { LoadingApp };
