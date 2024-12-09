import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Card = styled.div`
	width: 100%;
	min-width: 240px;
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(2)};
	padding: ${getUnitInPx(3)};
	background: ${({ theme }) => theme.text.white};
	box-shadow: ${({ theme }) => theme.shadows.normal};
	border-radius: ${getUnitInPx(3)};
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	max-height: 320px;
	overflow-y: auto;
	gap: ${getUnitInPx(1)};
	width: 100%;
`;

const DetailsItem = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 120px 60px;

	span:last-child {
		text-align: right;
	}
`;

export default { Card, Details, DetailsItem };
