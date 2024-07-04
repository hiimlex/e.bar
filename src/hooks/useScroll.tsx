import { useEffect, useState } from "react";

function useScroll(callback?: (scroll: number) => void, target?: HTMLElement) {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			let scroll = window.scrollY;

			if (target) {
				scroll = target.scrollTop;
			}

			setScroll(scroll);

			if (callback) {
				callback(scroll);
			}
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

	return scroll;
}

export default useScroll;
