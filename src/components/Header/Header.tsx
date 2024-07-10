import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink, Pages } from "../../@types";
import { useBreakpoint } from "../../hooks";
import { Brands } from "../Brands";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { UserActions } from "../../store";

export const NAV_LINKS: NavLink[] = [
	{ to: Pages.Orders, label: "Pedidos" },
	{ to: Pages.Sales, label: "Vendas" },
	{ to: Pages.Products, label: "Produtos" },
	{ to: Pages.Attendance, label: "Atendimento" },
];

const Header: React.FC = () => {
	const { breakpoint } = useBreakpoint();
	const location = useLocation();
	const navigate = useNavigate();
	const [scrollPosition, setScrollPosition] = useState(0);

	const scrolled = useMemo(() => scrollPosition > 0, [scrollPosition]);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(UserActions.logout());

		navigate(Pages.Login);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={`header-wrapper ${scrolled ? "header-scrolled" : ""}`}>
			<div className={`header header-${breakpoint}`}>
				<div className="header-brands">
					<Brands.EBarBrand />
				</div>

				<nav className="header-nav">
					{NAV_LINKS.map((link, index) => {
						const isActive = location.pathname === link.to;

						return (
							<Link
								key={index}
								className={`header-nav-link ${isActive ? "active" : ""}`}
								to={link.to}
							>
								{link.label}
							</Link>
						);
					})}
					<span className="header-nav-link" onClick={logout}>
						Sair
					</span>
				</nav>
			</div>
		</div>
	);
};

export { Header };
