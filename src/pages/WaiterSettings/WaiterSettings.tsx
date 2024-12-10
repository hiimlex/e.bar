import { Hash, Key, LogOut, User } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChipStatus, MainContainer } from "../../components";
import { RootState, UserActions } from "../../store";
import { Styled } from "../../styles";
import S from "./WaiterSettings.styles";
import { Pages } from "../../@types";

const WaiterSettingsPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { attendance } = useSelector((state: RootState) => state.user);

	const dispatch = useDispatch();

	const logout = () => {
		dispatch(UserActions.logout());

		navigate(Pages.Login);
	};

	return (
		<MainContainer showGoBack onGoBack={() => navigate(-1)} showMenu={false}>
			<S.Container>
				<S.Header>
					<Styled.Typography.Title>
						{t("WaiterSettings.Title")}
					</Styled.Typography.Title>
					<Styled.Typography.Caption textColor="gray300">
						{t("WaiterSettings.Subtitle")}
					</Styled.Typography.Caption>
				</S.Header>
				<S.Menu>
					<S.MenuItem disabled>
						<Hash size={24} />
						<Styled.Typography.BodyBold>
							{t("WaiterSettings.Menu.Attendance")}
						</Styled.Typography.BodyBold>
						{attendance && (
							<ChipStatus colorScheme="success" variant="outlined">
								#{attendance?.code}
							</ChipStatus>
						)}
					</S.MenuItem>
					<S.MenuItem onClick={() => navigate(Pages.WaiterSettingsProfile)}>
						<User size={24} />
						<Styled.Typography.BodyBold>
							{t("WaiterSettings.Menu.EditProfile")}
						</Styled.Typography.BodyBold>
					</S.MenuItem>
					<S.MenuItem onClick={() => navigate(Pages.WaiterSettingsPassword)}>
						<Key size={24} />
						<Styled.Typography.BodyBold>
							{t("WaiterSettings.Menu.ChangePassword")}
						</Styled.Typography.BodyBold>
					</S.MenuItem>
				</S.Menu>
				<S.Logout onClick={logout}>
					<LogOut size={20} />
					<Styled.Typography.BodyBold textColor="danger">
						{t("WaiterSettings.Menu.Logout")}
					</Styled.Typography.BodyBold>
				</S.Logout>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterSettingsPage;
