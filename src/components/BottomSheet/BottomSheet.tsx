import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Styled } from "../../styles";
import S from "./BottomSheet.styles";

interface BottomSheetProps {
	title?: string;
}

const BottomSheet: React.FC<PropsWithChildren<BottomSheetProps>> = ({
	title,
	children,
}) => {
	const { t } = useTranslation();

	return (
		<S.BottomSheetOverlay>
			<S.BottomSheetContainer>
				{title && (
					<Styled.Typography.Subtitle>{t(title)}</Styled.Typography.Subtitle>
				)}
				{children}
			</S.BottomSheetContainer>
		</S.BottomSheetOverlay>
	);
};

export default BottomSheet;
