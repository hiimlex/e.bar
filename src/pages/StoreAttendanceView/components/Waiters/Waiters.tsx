import { useCallback, useEffect, useState } from "react";
import { Edit2, Plus } from "react-feather";
import { useDebounceValue } from "usehooks-ts";
import {
	IWaiter,
	ModalIds,
	TOrderBy,
	WaitersFilters,
} from "../../../../@types";
import { WaitersService } from "../../../../api";
import {
	Button,
	IconButton,
	Input,
	OrderBy,
	Spinner,
} from "../../../../components";
import { useModal } from "../../../../hooks";
import { format } from "../../../../utils";
import { WaiterModal } from "../WaiterModal";
import "./styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useTranslation } from "react-i18next";

interface WaitersProps {}

const Waiters: React.FC<WaitersProps> = () => {
	const { t } = useTranslation();
	const [waiters, setWaiters] = useState<IWaiter[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const [filters, setFilters] = useState<WaitersFilters>({});
	const [search, setSearch] = useState<string>("");
	const [debouncedValue, setDebouncedValue] = useDebounceValue(
		filters.name,
		300
	);
	const { attendance } = useSelector((state: RootState) => state.onAttendance);

	const [activatingWaiterId, setActivatingWaiterId] = useState<
		string | undefined
	>(undefined);

	const { openModal } = useModal();

	useEffect(() => {
		setFilters((curr) => ({ ...curr, name: debouncedValue }));
	}, [debouncedValue]);

	const fetchWaiters = useCallback(
		async (load = true) => {
			setLoading(load);
			// Fetch waiters from API
			try {
				const { data } = await WaitersService.fetchAll(filters);

				setWaiters(data.content);
				setLoading(false);
			} catch (error) {
				setWaiters([]);
				setLoading(false);
			}
		},
		[filters]
	);

	const onOrderBy = (sort?: TOrderBy, sort_by?: WaitersFilters["sort_by"]) => {
		if (sort === "") {
			sort = undefined;
			sort_by = undefined;
		}

		setFilters((curr) => ({ ...curr, sort, sort_by }));
	};

	const onAddWaiter = () => {
		openModal({
			id: ModalIds.AddWaiter,
			title: "Modals.Waiter.create.Title",
			children: (
				<WaiterModal
					modalId={ModalIds.AddWaiter}
					mode="create"
					beforeClose={() => fetchWaiters(false)}
				/>
			),
		});
	};

	const onEditWaiter = (waiter: IWaiter) => {
		const { _id, name, email, phone } = waiter;
		openModal({
			id: ModalIds.EditWaiter,
			title: "Modals.Waiter.edit.Title",
			children: (
				<WaiterModal
					modalId={ModalIds.EditWaiter}
					mode="edit"
					beforeClose={() => fetchWaiters(false)}
					waiterId={_id}
					initialWaiter={{
						name,
						email,
						phone: format.phone(phone.toString()),
						password: "",
					}}
				/>
			),
		});
	};

	const onActive = async (waiter: IWaiter, active: boolean) => {
		try {
			setActivatingWaiterId(waiter._id.toString());
			await WaitersService.update(waiter._id.toString(), { enabled: !active });
			await fetchWaiters(false);
			setActivatingWaiterId(undefined);
		} catch (error) {
			setActivatingWaiterId(undefined);
		}
	};

	useEffect(() => {
		fetchWaiters();
	}, [fetchWaiters]);

	useEffect(() => {
		setFilters((curr) => ({ ...curr, nome: debouncedValue }));
	}, [debouncedValue]);

	return (
		<div className="waiters">
			<div className="waiters-actions">
				<div className="waiters-filters">
					<Input
						hideLabel
						className="waiters-search"
						placeholder="Buscar..."
						value={search}
						onChangeValue={(value) => {
							setSearch(value);
							setDebouncedValue(value);
						}}
					/>
					<OrderBy
						label="Nome"
						onOrderChange={(sort_by) => onOrderBy(sort_by, "name")}
					/>
				</div>
				<Button onClick={onAddWaiter}>
					<Plus size={14} /> Adicionar
				</Button>
			</div>
			{!loading && (
				<div className="waiters-grid">
					{waiters.map((waiter) => (
						<div className="card card-gray" key={waiter._id}>
							<div className="flex-col-text">
								<div className="flex-row-text">
									<span className="waiters-info-name">{waiter.name}</span>
									<div className="chip-status chip-status-primary">
										{t(
											`Generics.WaiterStatus.${
												attendance?.working_at.some(
													(el) => el.toString() === waiter._id.toString()
												)
													? "In"
													: "Off"
											}`
										)}
									</div>
								</div>
								<span className="waiters-info-phone">{waiter.phone}</span>
								<span className="waiters-info-email">{waiter.email}</span>
							</div>
							<div className="card-footer">
								{/* <IconButton
									theme="secondary"
									className="edit-button"
									onClick={() => onEditWaiter(waiter)}
									size="lg"
								>
									<Edit2 strokeWidth={2} size={16} />
								</IconButton> */}
								<Button
									className="fill-row"
									variant="text"
									theme={waiter.enabled ? "danger" : "primary"}
									onClick={() => onActive(waiter, waiter.enabled)}
									disabled={activatingWaiterId === waiter._id.toString()}
								>
									{waiter.enabled ? "Desativar" : "Ativar"}
								</Button>
							</div>
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className="waiters-loading">
					<Spinner size={48} theme="primary" />
					{t("Loaders.AttendanceWaiters")}
				</div>
			)}
		</div>
	);
};

export { Waiters };
