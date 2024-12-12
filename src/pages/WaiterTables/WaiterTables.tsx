import { FC, useEffect, useState } from "react";
import { MainContainer, TableStatusCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import S from "./WaiterTables.styles";
import { Styled } from "../../styles";
import { ITable, SafeAny } from "../../@types";
import { TablesService } from "../../api";
import { AxiosError } from "axios";
import { useToast } from "leux";
import { FileMinus } from "react-feather";

const WaiterTablesPage: FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const ToastService = useToast();

	const [loading, setLoading] = useState<boolean>(false);
	const [tables, setTables] = useState<ITable[]>([]);

	const getTables = async () => {
		setLoading(true);
		try {
			const { data } = await TablesService.fetchAvailable();

			setTables(data.content);
			setLoading(false);
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data) {
				const { message } = error.response.data as SafeAny;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}

			setLoading(false);
		}
	};

	useEffect(() => {
		getTables();
	}, []);

	return (
		<MainContainer showGoBack onGoBack={() => navigate(-1)}>
			<S.Container>
				<Styled.Typography.Title
					dangerouslySetInnerHTML={{
						__html: t("WaiterTables.Title"),
					}}
				></Styled.Typography.Title>

				<S.Grid>
					{!loading &&
						tables.map((table) => (
							<TableStatusCard
								order={
									!!table.order && typeof table.order !== "string"
										? table.order
										: undefined
								}
								table_number={table.number}
								active={table.in_use}
								key={table._id}
							/>
						))}
				</S.Grid>

				{tables.length === 0 && !loading && (
					<Styled.Empty>
						<FileMinus size={24} />
						<Styled.Typography.Caption>
							{t("Empty.Tables")}
						</Styled.Typography.Caption>
					</Styled.Empty>
				)}
			</S.Container>
		</MainContainer>
	);
};

export default WaiterTablesPage;
