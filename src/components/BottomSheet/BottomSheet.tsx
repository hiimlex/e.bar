import { useSpring } from "@react-spring/web";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Styled } from "../../styles";
import S from "./BottomSheet.styles";

interface BottomSheetProps {
	title?: string;
	onClose?: () => void;
	closeOnBackdropClick?: boolean;
}

const BottomSheet: React.FC<PropsWithChildren<BottomSheetProps>> = ({
	title,
	children,
	onClose,
	closeOnBackdropClick = true,
}) => {
	const { t } = useTranslation();
	const slideIn = useSpring({
		from: {
			transform: "translateY(100%)",
		},
		to: {
			transform: "translateY(0)",
		},
		config: {
			bounce: 1,
		},
		delay: 200,
	});
	const fadeIn = useSpring({
		from: {
			opacity: 0,
		},
		to: {
			opacity: 1,
		},
	});

	const onBackdropClick = () => {
		if (closeOnBackdropClick && onClose) {
			onClose();
		}
	};

	return (
		<S.Backdrop onClick={onBackdropClick} style={fadeIn}>
			<S.BottomSheetContainer
				style={slideIn}
				onClick={(e) => e.stopPropagation()}
			>
				{title && (
					<Styled.Typography.Subtitle>{t(title)}</Styled.Typography.Subtitle>
				)}
				{children}
			</S.BottomSheetContainer>
		</S.Backdrop>
	);
};

export default BottomSheet;
