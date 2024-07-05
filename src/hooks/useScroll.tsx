import { useEffect, useState } from "react";

function useScroll(
	callback?: (scroll: number) => void,
	target?: HTMLElement,
	isScrollingGap = 0
) {
	const [scroll, setScroll] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			let scroll = window.scrollY;

			if (target) {
				scroll = target.scrollTop;
			}

			const isScrolling = scroll > isScrollingGap;

			setIsScrolling(isScrolling);
			setScroll(scroll);

			if (callback) {
				callback(scroll);
			}

			console.log("scroll", scroll, isScrolling);
		};

		if (!target) {
			window.addEventListener("scroll", onScroll);
		}

		if (target) {
			target.addEventListener("scroll", onScroll);
		}
		return () => {
			if (target) {
				target.removeEventListener("scroll", onScroll);
			}

			if (!target) {
				window.removeEventListener("scroll", onScroll);
			}
		};
	}, [target]);

	return { scroll, isScrolling };
}

export default useScroll;
