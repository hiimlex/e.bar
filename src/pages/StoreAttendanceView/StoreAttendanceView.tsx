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
import { useDispatch, useSelector } from "react-redux";
import {
	AppDispatch,
	OnAttendanceActions,
	RootState,
	onAttendancefetchAttendance,
} from "../../store";

export enum TabEnum {
	General = "General",
	Sales = "Sales",
	Orders = "Orders",
}

const tabs: TabItemType[] = [
	{
		label: `StoreAttendanceView.Tabs.${TabEnum.General}`,
		value: TabEnum.General,
	},
	{
		label: `StoreAttendanceView.Tabs.${TabEnum.Orders}`,
		value: TabEnum.Orders,
	},
	{
		label: `StoreAttendanceView.Tabs.${TabEnum.Sales}`,
		value: TabEnum.Sales,
	},
];

const StoreAttendanceView: React.FC = () => {
	const { t } = useTranslation();

	const { attendanceId } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const [loading, setLoading] = useState(true);
	const { attendance } = useSelector((state: RootState) => state.onAttendance);

	const navigate = useNavigate();

	const getAttendance = async () => {
		try {
			if (!attendanceId) {
				navigate(Pages.StoreAttendances);

				return;
			}

			setLoading(true);

			dispatch(OnAttendanceActions.setAttendanceId(attendanceId));

			await dispatch(onAttendancefetchAttendance());

			navigate(
				Pages.StoreAttendanceGeneral.replace(":attendanceId", attendanceId),
				{ replace: true }
			);

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
						<Link to={Pages.StoreAttendances} className="link link-primary">
							<ArrowLeft size={16} />
							{t("StoreAttendanceView.GoBack")}
						</Link>

						<div className="flex flex-row gap-4 items-end">
							<h4 className="page-title">
								{t("StoreAttendanceView.Title", {
									code: attendance?.code || "",
								})}
							</h4>
							<span className="chip-status chip-status-success-outlined">
								{t(`Generics.AttendanceStatus.${attendance?.status}`)}
							</span>
						</div>
					</header>

					<div className="b-o-attendance-status">
						<div className="flex group">
							<span className="group-label">Inicio</span>
							<span className="group-value chip-status chip-status-default">
								{attendance?.started_at &&
									format(
										new Date(attendance?.started_at),
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

export { StoreAttendanceView };
