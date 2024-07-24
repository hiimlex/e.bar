import { useState } from "react";
import { Chip, ChipWrapper } from "../../../../components";
import { useTranslation } from "react-i18next";
import { Tables, Waiters } from "../../components";
import "./styles.scss";

type BarAttendanceTab = "waiters" | "tables";

const BarOnAttendanceGeneral: React.FC = () => {
	const { t } = useTranslation();
	const [tab, setTab] = useState<BarAttendanceTab>("tables");

	const onSelectTab = (tab: BarAttendanceTab) => {
		setTab(tab);
	};

	return (
		<div className="a-general">
			<div>
				<ChipWrapper>
					<Chip onClick={() => onSelectTab("tables")} active={tab === "tables"}>
						{t("BarOnAttendance.General.Tabs.Tables")}
					</Chip>
					<Chip
						onClick={() => onSelectTab("waiters")}
						active={tab === "waiters"}
					>
						{t("BarOnAttendance.General.Tabs.Waiters")}
					</Chip>
				</ChipWrapper>
			</div>

			{tab === "tables" && <Tables />}
			{tab === "waiters" && <Waiters />}
		</div>
	);
};

export { BarOnAttendanceGeneral };
