import { useLayoutEffect, useState } from "react";

interface UseWindowSizeReturn {
	width: number;
	height: number;
}

const useWindowSize = (): UseWindowSizeReturn => {
	const [windowSize, setWindowSize] = useState<UseWindowSizeReturn>({
		width: 0,
		height: 0,
	});

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useLayoutEffect(() => {
		handleSize();

		window.addEventListener("resize", handleSize);

		return () => window.removeEventListener("resize", handleSize);
	}, []);

	return windowSize;
};

export default useWindowSize;
