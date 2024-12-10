import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Spinner } from "../../Spinner";
import { Box } from "leux";
import { colors, Styled } from "../../../styles";

import S from "./PixQr.styles";

const PixQR = () => {
	const { attendance } = useSelector((state: RootState) => state.user);

	if (!attendance || !attendance?.code) {
		return <Spinner size={32} theme="primary" />;
	}

	return (
		<Box
			flex
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			customClass="gap-6 p-2"
		>
			<S.BoxQr>
				<QRCode value={attendance.code} size={180} fgColor={colors.primary} />
			</S.BoxQr>
			<Styled.Typography.Caption textColor="placeholder">
				{"pix key:"} {attendance.code}
			</Styled.Typography.Caption>
		</Box>
	);
};

export default PixQR;
