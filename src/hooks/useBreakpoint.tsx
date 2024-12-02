import { useLayoutEffect, useState } from "react";

export type Breakpoints = "sm" | "md" | "lg" | "xl";

type BreakpointType = {
	breakpoint: Breakpoints;
};

/**
 * useBreakpoint hook
 *
 * A one-liner hook to get the current breakpoint based on the window.innerWidth
 * always updated when the window is resized.
 *
 *
 * @returns {LeBreakpointType} `sm | md | lg | xl`
 */
function useBreakpoint(): BreakpointType {
	const [breakpoint, setBreakpoint] = useState<BreakpointType>({
		breakpoint: "sm",
	});

	const updateBreakpoint = () => {
		const { innerWidth: width } = window;

		if (width <= 780) {
			setBreakpoint({ breakpoint: "sm" });
		} else if (width <= 1280) {
			setBreakpoint({ breakpoint: "md" });
		} else if (width <= 1440) {
			setBreakpoint({ breakpoint: "lg" });
		} else {
			setBreakpoint({ breakpoint: "xl" });
		}
	};

	useLayoutEffect(() => {
		window.addEventListener("resize", updateBreakpoint);
		updateBreakpoint();
		return () => window.removeEventListener("resize", updateBreakpoint);
	}, []);

	return breakpoint;
}

export { useBreakpoint };
