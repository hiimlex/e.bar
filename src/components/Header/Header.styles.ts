import styled from "styled-components";
import { getUnitInPx, shouldForwardProp } from "../../styles";
import { Breakpoints } from "../../hooks";
import { Link } from "react-router-dom";

const Header = styled.div.withConfig({ shouldForwardProp })<{
	breakpoint?: Breakpoints;
}>`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	z-index: 1;

	padding: 6px 12px;
	min-height: 60px;

	max-width: 1200px;
	padding-left: ${getUnitInPx(4)};
	padding-right: ${getUnitInPx(4)};

	transition: ${({ theme }) => theme.styles.transition};

	${({ breakpoint }) =>
		breakpoint === "md" &&
		`
		max-width: 1000px;
	`}
	${({ breakpoint }) =>
		breakpoint === "lg" &&
		`
		max-width: 1200px;
	`}
	${({ breakpoint }) =>
		breakpoint === "xl" &&
		`
 		max-width: 1400px;
	`}
`;

const HeaderWrapper = styled.div.withConfig({ shouldForwardProp })<{
	isScrolled?: boolean;
}>`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};

	${({ isScrolled }) =>
		isScrolled &&
		`
		position: fixed;
 		z-index: 2;
 		top: 0;
 		left: 0;
 		background: $color-white;
 		box-shadow: $shadow-soft;`}
`;

const HeaderBrands = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${getUnitInPx(2)};
`;

const HeaderNav = styled.nav`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${getUnitInPx(4)};
`;

const NavLink = styled(Link).withConfig({ shouldForwardProp })<{
	active?: boolean;
}>`
	text-decoration: none;
	font-weight: 500;
	font-size: 16px;
	transition: ${({ theme }) => theme.styles.transition};
	color: ${({ theme }) => theme.text.placeholder};

	&:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.primary};
		transform: scale(1.1);
	}

	${({ active }) =>
		active &&
		`
		color: $color-primary;
		font-weight: 700;
	`}
`;

export default { HeaderWrapper, HeaderNav, HeaderBrands, NavLink, Header };
