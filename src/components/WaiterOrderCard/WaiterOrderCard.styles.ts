import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Card = styled.div`
	width: 100%;
	min-width: 260px;
	max-width: 420px;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	padding: ${getUnitInPx(3)};
	background: ${({ theme }) => theme.text.white};
	box-shadow: ${({ theme }) => theme.shadows.normal};
	border-radius: ${getUnitInPx(3)};
`;

export default { Card };
