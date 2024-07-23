import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { MoreVertical } from "react-feather";
import { useTranslation } from "react-i18next";
import { GetAttendanceFilters, IAttendance, ModalIds } from "../../@types";
import { AttendancesService } from "../../api";
import {
	Button,
	Chip,
	ChipWrapper,
	MainContainer,
	OrderBy,
	OrderByType,
} from "../../components";
import { useModal } from "../../hooks";
import "./styles.scss";
import { StartAttendanceModal } from "./components/StartAttendanceModal";

interface BarAttendancesPageProps {}

const BarAttendancesPage: React.FC<BarAttendancesPageProps> = () => {
	const { t } = useTranslation();
	const { openModal } = useModal();

	const [attendances, setAttendances] = useState<IAttendance[]>([]);
	const [filters, setFilters] = useState<GetAttendanceFilters>({});

	const loadAttendances = useCallback(async () => {
		try {
			const { data } = await AttendancesService.fetchAll(filters);

			if (data) {
				setAttendances(data);
			}
		} catch (error) {
			console.error(error);
		}
	}, [filters]);

	const setFilter = (filter: GetAttendanceFilters) => {
		setFilters((curr) => ({ ...curr, ...filter }));
	};

	const onOrderChange = (
		sort_order?: OrderByType,
		sort_by?: GetAttendanceFilters["sort_by"]
	) => {
		if (sort_order === "" || !sort_order || !sort_by) {
			sort_order = undefined;
			sort_by = undefined;
		}

		setFilters((curr) => ({ ...curr, sort_order, sort_by }));
	};

	const openStartAttendanceModal = () => {
		openModal({
			id: ModalIds.StartAttendance,
			title: "Modals.StartAttendance.Title",
			children: <StartAttendanceModal onClose={loadAttendances} />,
		});
	};

	useEffect(() => {
		loadAttendances();
	}, [loadAttendances]);

	return (
		<MainContainer showAdminHeader>
			<div className="attendances">
				<header className="attendances-header">
					<h2 className="page-title">{t("BarAttendances.Title")}</h2>
				</header>

				<section className="attendances-filters">
					<ChipWrapper>
						<Chip
							active={!filters.status}
							onClick={() => setFilter({ status: undefined })}
							theme="secondary"
						>
							{t("BarAttendances.Filters.All")}
						</Chip>
						<Chip
							active={filters.status === "off"}
							onClick={() => setFilter({ status: "off" })}
							theme="secondary"
						>
							{t("BarAttendances.Filters.Finished")}
						</Chip>
						<OrderBy
							onOrderChange={(order) => onOrderChange(order, "start_date")}
							label="BarAttendances.Filters.Interval"
						/>
					</ChipWrapper>
					<Button onClick={openStartAttendanceModal}>
						{t("BarAttendances.Buttons.Add")}
					</Button>
				</section>

				<main className="attendances-table">
					<header className="attendances-table-header">
						<span>{t("BarAttendances.Table.Headers.Id")}</span>
						<span>{t("BarAttendances.Table.Headers.Status")}</span>
						<span>{t("BarAttendances.Table.Headers.Start")}</span>
						<span>{t("BarAttendances.Table.Headers.End")}</span>
						<span>{t("BarAttendances.Table.Headers.TablesCount")}</span>
						<span>{t("BarAttendances.Table.Headers.Code")}</span>
						<span>{t("BarAttendances.Table.Headers.Actions")}</span>
					</header>
					<div className="attendances-table-body">
						{attendances.map((attendance, index) => (
							<div key={index} className="attendances-table-item">
								<span>{attendance.id}</span>
								<span className={attendance.status}>{t(`Generics.Status.${attendance.status}`)}</span>
								<span>
									{format(
										new Date(attendance.start_date),
										t("Generics.Dates.Long.Format")
									)}
								</span>
								<span>
									{attendance.end_date &&
										format(
											new Date(attendance.end_date),
											t("Generics.Dates.Long.Format")
										)}
									{!attendance.end_date && t("Generics.EmptySign")}
								</span>
								<span>{attendance.tables_count}</span>
								<span>{attendance.code}</span>
								<span
									role="button"
									className="table-action flex align-center justify-center link link-secondary"
								>
									<MoreVertical size={24} />
								</span>
							</div>
						))}
					</div>
					<footer className="attendances-table-footer"></footer>
				</main>
			</div>
		</MainContainer>
	);
};

export { BarAttendancesPage };
