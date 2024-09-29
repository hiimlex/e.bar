import { useTranslation } from "react-i18next";
import { MainContainer } from "../../components";
import { ArrowLeft } from "react-feather";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { AttendancesService } from "../../api";
import { IAttendance, Pages } from "../../@types";
import "./styles.scss";
import { format } from "date-fns";
import { TabItemType, Tabs } from "./components";

export enum TabEnum {
	General = "General",
	Sales = "Sales",
	Orders = "Orders",
}

const tabs: TabItemType[] = [
	{
		label: `BarOnAttendance.Tabs.${TabEnum.General}`,
		value: TabEnum.General,
	},
	{
		label: `BarOnAttendance.Tabs.${TabEnum.Orders}`,
		value: TabEnum.Orders,
	},
	{
		label: `BarOnAttendance.Tabs.${TabEnum.Sales}`,
		value: TabEnum.Sales,
	},
];

const BarOnAttendance: React.FC = () => {
	const { t } = useTranslation();

	const { attendanceId } = useParams();
	const [loading, setLoading] = useState(true);
	const [attendance, setAttendance] = useState<IAttendance | undefined>(
		undefined
	);
	const navigate = useNavigate();

	const getAttendance = async () => {
		try {
			if (!attendanceId) {
				navigate(Pages.BarAttendances);

				return;
			}

			setLoading(true);

			const { data } = await AttendancesService.getById(attendanceId);

			if (data) {
				setAttendance(data);
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getAttendance();
	}, []);

	const [selectedTab, setSelectedTab] = useState<string>(TabEnum.General);

	const handleTabSelect = (value: string) => {
		setSelectedTab(value);
	};

	if ((!attendance || !attendanceId) && !loading) {
		return null;
	}

	return (
		<MainContainer showAdminHeader>
			{loading && <h4>{t("Loading")}</h4>}
			{!loading && (
				<div className="b-o-attendance">
					<header className="b-o-attendance-header">
						<Link to={Pages.BarAttendances} className="link link-primary">
							<ArrowLeft size={16} />
							{t("BarOnAttendance.GoBack")}
						</Link>

						<div className="flex flex-row gap-4 items-end">
							<h4 className="page-title">
								{t("BarOnAttendance.Title", {
									attendanceId,
									code: attendance?.code || "",
								})}
							</h4>
							<span className="chip-status chip-status-success-outlined">
								{t(`Generics.Status.${attendance?.status}`)}
							</span>
						</div>
					</header>

					<div className="b-o-attendance-status">
						<div className="flex group">
							<span className="group-label">Inicio</span>
							<span className="group-value chip-status chip-status-default">
								{attendance?.start_date &&
									format(
										new Date(attendance?.start_date),
										t("Generics.Dates.Long.Format")
									)}
							</span>
						</div>
						<div className="flex group">
							<span className="group-label">Mesas ativas</span>
							<span className="group-value chip-status chip-status-default">
								{attendance?.tables_count || "---"}
							</span>
						</div>
						<div className="flex group">
							<span className="group-label">Garçons ativos</span>
							<span className="group-value chip-status chip-status-default">
								{"12"}
							</span>
						</div>
					</div>

					<Tabs
						tabs={tabs}
						selected={selectedTab}
						onSelect={(tab) => handleTabSelect(tab)}
					/>

					<div className="tabs-content">
						<Outlet />
					</div>
				</div>
			)}
		</MainContainer>
	);
};

export default BarOnAttendance;
