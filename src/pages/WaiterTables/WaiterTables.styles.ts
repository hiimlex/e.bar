import styled from "styled-components";
import { getUnitInPx } from "../../styles";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${getUnitInPx(3)};
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 200px));
	justify-content: center;
	align-items: center;
	gap: ${getUnitInPx(4)};
`;

export default {
	Container,
	Grid,
};
