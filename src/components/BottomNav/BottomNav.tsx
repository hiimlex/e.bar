import { useLocation } from "react-router-dom";
import "./styles.scss";
import { NavLink, Pages } from "../../@types";
import { Home, Settings, User } from "react-feather";

const WAITER_LINKS: NavLink[] = [
	{
		to: Pages.WaiterHome,
		label: Pages.WaiterHome,
		icon: <Home />,
	},
	{
		to: Pages.WaiterHome,
		label: Pages.WaiterHome,
		icon: <Home />,
	},
	{
		to: Pages.WaiterHome,
		label: Pages.WaiterHome,
		icon: <Settings />,
	},
];

interface BottomNavProps {}

const BottomNav: React.FC = () => {
	const location = useLocation();



	return (
		<nav className="bottom-nav">
			{WAITER_LINKS.map((link,index) => (
				<span key={index} className="bottom-nav-icon">
					{link.icon}
				</span>
			))}
		</nav>
	);
};

export { BottomNav };
