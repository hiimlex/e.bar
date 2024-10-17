import { useEffect, useState } from "react";

function useScroll(
	callback?: (scroll: number) => void,
	target?: HTMLElement,
	isScrollingGap = 0
) {
	const [scroll, setScroll] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const [scrollHeight, setScrollHeight] = useState(0);
	const [scrollWidth, setScrollWidth] = useState(0);

	const onScroll = () => {
		let scroll = window.scrollY;
		let scrollLeft = window.scrollX;
		let scrollWidth = window.screenX;
		let scrollHeight = window.screenY;

		if (target) {
			scroll = target.scrollTop;
			scrollLeft = target.scrollLeft;
			scrollWidth = target.scrollWidth;
			scrollHeight = target.scrollHeight;
		}

		const isScrolling = scroll > isScrollingGap || scrollLeft > isScrollingGap;

		setIsScrolling(isScrolling);
		setScrollLeft(scrollLeft);
		setScroll(scroll);
		setScrollHeight(scrollHeight);
		setScrollWidth(scrollWidth);

		if (callback) {
			callback(scroll);
		}
	};

	useEffect(() => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [target, isScrollingGap]);

	return { scroll, isScrolling, scrollHeight, scrollWidth, scrollLeft };
}

export { useScroll };
