import { useCallback, useEffect, useState } from "react";
import { Plus, User } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ITable, ITableFilters, TOrderBy } from "../../../../@types";
import { AttendancesService, TablesService } from "../../../../api";
import { Button, OrderBy, Spinner } from "../../../../components";
import {
	AppDispatch,
	RootState,
	onAttendancefetchAttendance,
} from "../../../../store";
import "./styles.scss";

interface TablesProps {}

const Tables: React.FC<TablesProps> = () => {
	const { t } = useTranslation();
	const [tables, setTables] = useState<ITable[]>([]);

	const [loading, setLoading] = useState(false);
	const [adding, setAdding] = useState(false);

	const { attendance } = useSelector((state: RootState) => state.onAttendance);

	const [filters, setFilters] = useState<ITableFilters>({
		limit: attendance?.tables_count,
		is_enabled: true,
	});

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		setFilters((curr) => ({ ...curr, limit: attendance?.tables_count }));
	}, [attendance]);

	const fetchTables = useCallback(
		async (shouldLoad = true) => {
			try {
				setLoading(shouldLoad);
				const { data } = await TablesService.fetchAll(filters);
				setTables(data.content);

				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		},
		[filters]
	);

	const addTableToAttendance = async () => {
		setAdding(true);
		try {
			if (!attendance) {
				return;
			}

			await AttendancesService.addTableToAttendance(attendance._id);

			await fetchTables(false);

			await dispatch(onAttendancefetchAttendance());

			setAdding(false);
		} catch (error) {
			setAdding(false);
			console.error(error);
		}
	};

	const onOrderBy = (sort?: TOrderBy, sort_by?: ITableFilters["sort_by"]) => {
		if (sort === "") {
			sort = undefined;
			sort_by = undefined;
		}

		console.log(sort, sort_by);

		setFilters((curr) => ({ ...curr, sort, sort_by }));
	};

	useEffect(() => {
		fetchTables();
	}, [fetchTables]);

	return (
		<div className="tables">
			<div className="tables-actions">
				<div className="tables-filters">
					<OrderBy
						label="N° Mesa"
						onOrderChange={(sort) => onOrderBy(sort, "number")}
					/>
				</div>
				<Button loading={adding} onClick={addTableToAttendance}>
					<Plus size={14} /> {t("StoreAttendanceView.General.Buttons.Add")}
				</Button>
			</div>
			{!loading && (
				<div className="tables-grid">
					{tables.map((table) => (
						<div
							className={`card card-gray ${
								table.in_use ? "table-card" : "table-not-active"
							}`}
							key={table._id}
						>
							<div
								className={`flex  ${
									table.in_use ? "justify-between" : "justify-end"
								}`}
							>
								{table.in_use && table.order && (
									<div className="chip-status chip-status-primary flex flex-row items-center gap-1">
										{/* {t(`Generics.TableStatus.${table.in_use ? "InUse" : "Free"}`)} */}
										<User size={16} color="white" />
										{typeof table.order !== "string" && table.order.customers}
									</div>
								)}

								<span className="tables-info-number flex justify-self-end">
									{t("StoreAttendanceView.General.Labels.Table", {
										number: table.number,
									})}
								</span>
							</div>
							<span className="tables-info-bartender flex justify-center">
								{table.in_use_by
									? t(`StoreAttendanceView.General.Labels.Waiter`, {
											name:
												typeof table.in_use_by !== "string" &&
												table.in_use_by.name
													? table.in_use_by.name.split(' ')[0]
													: "---",
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  })
									: t("Empty.Empty")}
							</span>
							{table.order && (
								<div className="flex justify-between">
									<span className="tables-order-number">
										{t(`StoreAttendanceView.General.Labels.Order`, {
											number:
												typeof table.order !== "string" && table.order.number,
										})}
									</span>
									<span className="tables-order-number">
										{t("Generics.Currency.Format", {
											value:
												typeof table.order !== "string" && table.order.total,
										})}
									</span>
								</div>
							)}
							{/* {table.enabled ? (
								<Button
									className="fill-row"
									theme="danger"
									loading={updating === table._id}
									onClick={() => deactivate(table._id)}
								>
									{t("StoreAttendanceView.General.Buttons.Disable")}
								</Button>
							) : (
								<Button
									className="fill-row"
									theme="secondary"
									loading={updating === table._id}
									onClick={() => activate(table._id)}
								>
									{t("StoreAttendanceView.General.Buttons.Enable")}
								</Button>
							)} */}
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className="tables-loading">
					<Spinner size={48} theme="primary" />
					{t("Loaders.AttendanceTables")}
				</div>
			)}
		</div>
	);
};

export { Tables };
