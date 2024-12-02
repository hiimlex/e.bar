import {
	PropsWithChildren,
	RefAttributes,
	useMemo,
	useRef,
	useState,
} from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useScroll } from "../../hooks";
import S from "./Chip.styles";

interface ChipProps extends PropsWithChildren {
	active?: boolean;
	clickable?: boolean;
	onClick?: () => void;
	theme?: "primary" | "secondary";
}

const Chip: React.FC<ChipProps> = ({
	active,
	children,
	onClick,
	theme = "primary",
}) => {
	const handleOnClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<S.Chip
			onClick={handleOnClick}
			active={active}
			role="button"
			colorScheme={theme}
		>
			{children}
		</S.Chip>
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
		<S.ChipContainer isScrollable={isScrollable}>
			{isScrollable && (
				<S.ChipWrapperArrowLeft
					onMouseDown={() => keepScrolling(-100)}
					onMouseUp={stopScrolling}
					disabled={scrollLeft < 30}
				>
					<ChevronLeft size={24} strokeWidth={2} />
				</S.ChipWrapperArrowLeft>
			)}
			<S.ChipWrapper style={{ maxWidth }} ref={chipWrapperRef} {...rest}>
				{children}
			</S.ChipWrapper>
			{isScrollable && (
				<S.ChipWrapperArrowRight
					disabled={!canScrollRight}
					onMouseDown={() => keepScrolling(100)}
					onMouseUp={stopScrolling}
				>
					<ChevronRight size={24} strokeWidth={2} />
				</S.ChipWrapperArrowRight>
			)}
		</S.ChipContainer>
	);
};

export { Chip, ChipWrapper };
