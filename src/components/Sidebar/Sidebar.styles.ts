import styled from "styled-components";
import { getUnitInPx, shouldForwardProp, theme } from "../../styles";

const Sidebar = styled.div`
	position: fixed;
	right: 0;
	z-index: 9;
	min-width: 140px;

	padding-bottom: 12px;
	background: ${({ theme }) => theme.colors.white};
	border-left: 1px solid ${theme.colors.gray100};
	height: 100%;
	box-shadow: -2px 0 4px rgba(#333333, 0.1);
	padding: ${getUnitInPx(4)};

	display: flex;
	flex-direction: column;

	gap: ${getUnitInPx(4)};

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	animation: slideIn 0.3s ease-in-out;
`;

const SidebarNavButton = styled.button.withConfig({ shouldForwardProp })<{
	active?: boolean;
}>`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	color: ${({ theme }) => theme.colors.secondary};

	text-decoration: none;
	font-size: 14px;
	font-weight: 600;
	gap: 6px;

	transition: ${({ theme }) => theme.styles.transition};

	${({ active, theme }) =>
		active &&
		`
		color: ${theme.colors.primary};
		
		svg {
			stroke: ${theme.colors.primary};
		}
		`}

	&:hover {
		scale: ${({ theme }) => theme.styles.scale};
	}
`;

export default {
	Sidebar,
	SidebarNavButton,
};
