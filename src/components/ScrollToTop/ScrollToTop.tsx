import React, { useEffect, useMemo, useState } from "react";
import { ArrowUp } from "react-feather";
import "./styles.scss";

const ScrollToTop: React.FC = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const scrolled = useMemo(() => scrollPosition > 100, [scrollPosition]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const handleScroll = (event: Event) => {
		if (event.target) {
			setScrollPosition(window.scrollY);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	if (!scrolled) {
		return null;
	}

	return (
		<div
			className="button-rounded bl-position"
			role="button"
			onClick={scrollToTop}
		>
			<ArrowUp />
		</div>
	);
};

export { ScrollToTop };
