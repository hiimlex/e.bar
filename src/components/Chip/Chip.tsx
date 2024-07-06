import {
	PropsWithChildren,
	RefAttributes,
	useMemo,
	useRef,
	useState,
} from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useScroll } from "../../hooks";
import "./styles.scss";

interface ChipProps extends PropsWithChildren {
	active?: boolean;
	clickable?: boolean;
	onClick?: () => void;
	theme?: "primary" | "secondary";
}

const Chip: React.FC<ChipProps> = ({
	active,
	children,
	clickable,
	onClick,
	theme = "primary",
}) => {
	const handleOnClick = () => {
		if (clickable && onClick) {
			onClick();
		}
	};

	const classNames = useMemo(
		() => `chip ${active ? "active" : ""} ${theme ? `chip-${theme}` : ""}`,
		[active]
	);

	return (
		<div onClick={handleOnClick} role="button" className={classNames}>
			{children}
		</div>
	);
};

interface ChipWrapperProps extends PropsWithChildren {
	maxWidth?: number;
}

const ChipWrapper: React.FC<
	ChipWrapperProps & RefAttributes<HTMLDivElement>
> = ({ children, maxWidth, ...rest }) => {
	const chipWrapperRef = useRef<HTMLDivElement>(null);
	const [intervalId, setIntervalId] = useState<number | null>(null);

	const { scrollLeft, scrollWidth } = useScroll(
		undefined,
		chipWrapperRef.current as HTMLElement
	);

	const isScrollable = useMemo(() => !!maxWidth, [maxWidth]);
	const canScrollRight = useMemo(() => {
		return !!maxWidth && scrollLeft + maxWidth < scrollWidth;
	}, [scrollLeft, scrollWidth, maxWidth]);

	const keepScrolling = (n: number) => {
		if (!maxWidth) {
			return;
		}

		let scrollToX = scrollLeft;

		const isPositive = n > 0;

		const intervalId = setInterval(() => {
			if (!chipWrapperRef.current) {
				return;
			}

			scrollToX += n;

			if (
				(!isPositive && scrollToX < 0) ||
				(isPositive && scrollToX >= maxWidth + scrollLeft)
			) {
				if (!isPositive && scrollLeft !== 0) {
					chipWrapperRef.current?.scrollTo({ left: 0, behavior: "smooth" });
				}

				if (intervalId) {
					clearInterval(intervalId);
					setIntervalId(null);
				}

				return;
			}

			chipWrapperRef.current?.scrollTo({ left: scrollToX, behavior: "smooth" });
		}, 10);

		setIntervalId(intervalId);
	};

	const stopScrolling = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	};

	return (
		<div className="chip-container">
			{isScrollable && (
				<button
					className="chip-wrapper-arrow-left"
					onMouseDown={() => keepScrolling(-100)}
					onMouseUp={stopScrolling}
					disabled={scrollLeft < 30}
				>
					<ChevronLeft size={24} strokeWidth={2} />
				</button>
			)}
			<div
				className={`chip-container ${
					isScrollable && "chip-wrapper-scrollable"
				} ${scrollLeft > 30 && "scrollable-left"}`}
				style={{ maxWidth }}
				ref={chipWrapperRef}
				{...rest}
			>
				{children}
			</div>
			{isScrollable && (
				<button
					disabled={!canScrollRight}
					className="chip-wrapper-arrow-right"
					onMouseDown={() => keepScrolling(100)}
					onMouseUp={stopScrolling}
				>
					<ChevronRight size={24} strokeWidth={2} />
				</button>
			)}
		</div>
	);
};

export { Chip, ChipWrapper };
