import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink, Pages } from "../../@types";
import { useBreakpoint } from "../../hooks";
import { UserActions } from "../../store";
import { Brands } from "../Brands";

const NAV_LINKS: NavLink[] = [
	{ to: Pages.StoreAttendances, label: "Atendimento" },
	{ to: Pages.StoreProducts, label: "Produtos" },
	// { to: Pages.Orders, label: "Pedidos" },
	// { to: Pages.Sales, label: "Vendas" },
];

import S from "./Header.styles";

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
		<S.HeaderWrapper isScrolled={scrolled}>
			<S.Header breakpoint={breakpoint}>
				<S.HeaderBrands className="header-brands">
					<Brands.EBarBrand />
				</S.HeaderBrands>

				<S.HeaderNav className="header-nav">
					{NAV_LINKS.map((link, index) => {
						const isActive = location.pathname === link.to;

						return (
							<S.NavLink key={index} active={isActive} to={link.to}>
								{link.label}
							</S.NavLink>
						);
					})}
					<span className="header-nav-link" onClick={logout}>
						Sair
					</span>
				</S.HeaderNav>
			</S.Header>
		</S.HeaderWrapper>
	);
};

export { Header };
