import { FileText, Home, LogOut, Settings, X } from "react-feather";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink, Pages, SafeAny } from "../../@types";
import { UserActions } from "../../store";
import "./styles.scss";

const WAITER_LINKS: NavLink[] = [
	{
		to: Pages.WaiterHome,
		label: "Home",
		icon: <Home size={28} />,
	},
	{
		to: Pages.WaiterOrders,
		label: "Pedidos",
		icon: <FileText size={28} />,
	},
	{
		to: Pages.WaiterSettings,
		label: "Configurações",
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
			<nav className="sidebar-nav	" style={style}>
				<button className="sidebar-nav-button" onClick={onClose}>
					<span>
						<X size={24} />
					</span>
				</button>
				{WAITER_LINKS.map((link, index) => (
					<span
						key={index}
						className={`sidebar-nav-button ${
							location.pathname === link.to ? "active" : ""
						}`}
						onClick={() => goTo(link.to)}
					>
						<span className="sidebar-nav-button-icon">{link.icon}</span>
						<span>{link.label}</span>
					</span>
				))}
				<button className="sidebar-nav-button" onClick={logout}>
					<span>
						<LogOut size={28} />
					</span>
					<span>Sair</span>
				</button>
			</nav>
		)
	);
};

export { Sidebar };
