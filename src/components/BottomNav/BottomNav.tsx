import { Home, Settings } from "react-feather";
import { NavLink, Pages, SafeAny } from "../../@types";
import "./styles.scss";

const WAITER_LINKS: NavLink[] = [
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

const BottomNav: React.FC<BottomNavProps> = () => {
	const style: SafeAny = {
		"--navlinks": WAITER_LINKS.length,
	};

	return (
		<nav className="bottom-nav" style={style}>
			{WAITER_LINKS.map((link, index) => (
				<span key={index} className="bottom-nav-icon">
					{link.icon}
				</span>
			))}
		</nav>
	);
};

export { BottomNav };
