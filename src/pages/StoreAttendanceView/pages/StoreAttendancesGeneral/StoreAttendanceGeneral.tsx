import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { TStoreAttendanceGeneralView } from "../../../../@types";
import { Chip, ChipWrapper } from "../../../../components";
import { Tables, Waiters } from "../../components";
import "./styles.scss";

const StoreAttendanceGeneral: React.FC = () => {
	const { t } = useTranslation();
	const [tab, setTab] = useState<TStoreAttendanceGeneralView>("tables");
	const { attendanceId } = useParams();

	const changeTab = (tab: TStoreAttendanceGeneralView) => {
		setTab(tab);
	};

	return (
		<div className="sa-general">
			<ChipWrapper>
				<Chip
					theme="primary"
					onClick={() => changeTab("tables")}
					active={tab === "tables"}
				>
					{t("StoreAttendanceView.General.Tabs.Tables")}
				</Chip>
				<Chip
					theme="primary"
					onClick={() => changeTab("waiters")}
					active={tab === "waiters"}
				>
					{t("StoreAttendanceView.General.Tabs.Waiters")}
				</Chip>
			</ChipWrapper>

			{tab === "waiters" && <Waiters />}
			{tab === "tables" && <Tables />}
		</div>
	);
};

export { StoreAttendanceGeneral };
