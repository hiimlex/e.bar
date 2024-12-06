import styled from "styled-components";
import { Breakpoints } from "../../hooks";
import { getUnitInPx, shouldForwardProp } from "../../styles";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: ${getUnitInPx(2)};
	padding-top: 24px;
	padding-bottom: 12px;
`;

const Header = styled.header.withConfig({ shouldForwardProp })<{
	breakpoint?: Breakpoints;
}>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	position: relative;
	padding: 0 ${getUnitInPx(2)};
`;

const Centered = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: fit-content;
`;

export default {
	Wrapper,
	Header,
	Centered,
};
