import { FC } from "react";
import { MainContainer, TableStatusCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import S from "./WaiterTables.styles";
import { Styled } from "../../styles";

const WaiterTablesPage: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<MainContainer showGoBack onGoBack={() => navigate(-1)}>
			<S.Container>
				<Styled.Typography.Title
					dangerouslySetInnerHTML={{
						__html: t("WaiterTables.Title"),
					}}
				></Styled.Typography.Title>

				<S.Grid>
					<TableStatusCard table_number={1} active />
				</S.Grid>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterTablesPage;
