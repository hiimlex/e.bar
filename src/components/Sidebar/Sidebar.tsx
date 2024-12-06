import { Book, Home, LogOut, Settings, ShoppingBag, X } from "react-feather";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink, Pages, SafeAny } from "../../@types";
import { UserActions } from "../../store";

import { useTranslation } from "react-i18next";
import { Icons } from "../Icons";
import S from "./Sidebar.styles";
import { cloneElement, createElement } from "react";

const WAITER_LINKS: NavLink[] = [
	{
		to: Pages.WaiterHome,
		label: "Links.WaiterHome",
		icon: <Home size={28} />,
	},
	{
		to: Pages.WaiterMyOrders,
		label: "Links.WaiterMyOrders",
		icon: <ShoppingBag size={28} />,
	},
	{
		to: Pages.WaiterProducts,
		label: "Links.WaiterProducts",
		icon: <Book size={28} />,
	},
	{
		to: Pages.WaiterTables,
		label: "Links.WaiterTables",
		icon: <Icons.TablesIconSVG width={24} height={24} />,
		isSvg: true,
	},
	{
		to: Pages.WaiterSettings,
		label: "Links.WaiterSettings",
		icon: <Settings size={28} />,
	},
];

interface SidebarProps {
	show: boolean;
	onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, onClose }) => {
	const style: SafeAny = {
		"--navlinks": WAITER_LINKS.length,
	};

	const { t } = useTranslation();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		dispatch(UserActions.logout());

		navigate(Pages.Login);
	};

	const goTo = (to: string) => {
		navigate(to);
	};

	return (
		show && (
			<S.Sidebar style={style}>
				<S.SidebarNavButton className="sidebar-nav-button" onClick={onClose}>
					<X size={24} />
				</S.SidebarNavButton>
				{WAITER_LINKS.map((link, index) => (
					<S.SidebarNavButton
						key={index}
						active={location.pathname === link.to}
						onClick={() => goTo(link.to)}
					>
						<span>{t(link.label)}</span>
					</S.SidebarNavButton>
				))}
				<S.SidebarNavButton className="sidebar-nav-button" onClick={logout}>
					<LogOut size={28} />
					{t("Links.LogOut")}
				</S.SidebarNavButton>
			</S.Sidebar>
		)
	);
};

export { Sidebar };
