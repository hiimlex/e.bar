import { useCallback, useEffect, useState } from "react";
import { Edit2, Plus } from "react-feather";
import { useDebounceValue } from "usehooks-ts";
import { IWaiter, ModalIds, WaitersFilters } from "../../../../@types";
import { WaitersService } from "../../../../api";
import {
	Button,
	Chip,
	IconButton,
	Input,
	OrderBy,
	Spinner,
} from "../../../../components";
import { useModal } from "../../../../hooks";
import { WaiterModal } from "../WaiterModal";
import "./styles.scss";

interface WaitersProps {}

const Waiters: React.FC<WaitersProps> = () => {
	const [waiters, setWaiters] = useState<IWaiter[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const [filters, setFilters] = useState<WaitersFilters>({});
	const [debouncedValue, setValue] = useDebounceValue(filters.nome, 300);

	const [activatingWaiterId, setActivatingWaiterId] = useState<
		string | undefined
	>(undefined);

	const { openModal } = useModal();

	const fetchWaiters = useCallback(
		async (load = true) => {
			setLoading(load);
			// Fetch waiters from API
			try {
				const { data } = await WaitersService.fetchAll(filters);

				setWaiters(data);
				setLoading(false);
			} catch (error) {
				setWaiters([]);
				setLoading(false);
			}
		},
		[filters]
	);

	const onSearch = (search: string) => {
		setValue(search);
	};

	const onOrderBy = (
		order: WaitersFilters["ordem"],
		direction: WaitersFilters["direcao"]
	) => {
		if (direction === "") {
			order = undefined;
			direction = undefined;
		}

		setFilters((curr) => ({ ...curr, ordem: order, direcao: direction }));
	};

	const setActiveFilter = () => {
		const ativos = filters.ativos ? undefined : !filters.ativos;

		setFilters((curr) => ({ ...curr, ativos }));
	};

	const setIsAdminFilter = () => {
		const is_admin = filters.is_admin ? undefined : !filters.is_admin;

		setFilters((curr) => ({ ...curr, is_admin }));
	};

	const onAddWaiter = () => {
		openModal({
			id: ModalIds.AddWaiter,
			component: (
				<WaiterModal
					modalId={ModalIds.AddWaiter}
					mode="create"
					beforeClose={() => fetchWaiters(false)}
				/>
			),
		});
	};

	const onEditWaiter = (waiter: IWaiter) => {
		const { id, name, email, phone, is_admin } = waiter;

		openModal({
			id: ModalIds.EditWaiter,
			component: (
				<WaiterModal
					modalId={ModalIds.EditWaiter}
					mode="edit"
					beforeClose={() => fetchWaiters(false)}
					waiterId={id}
					initialWaiter={{
						name,
						email,
						phone,
						password: "",
						is_admin,
					}}
				/>
			),
		});
	};

	const onActive = async (waiter: IWaiter, active: boolean) => {
		try {
			setActivatingWaiterId(waiter.id.toString());

			await WaitersService.active(waiter.id.toString(), !active);

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
			<div className="flex-row-text">
				<h4 className="waiters-title">Garçons</h4>
				<Button onClick={onAddWaiter}>
					<Plus size={14} /> ADICIONAR
				</Button>
			</div>
			<div className="waiters-actions">
				<div className="waiters-filters">
					<Chip
						theme="secondary"
						active={filters.ativos}
						clickable
						onClick={setActiveFilter}
					>
						Ativos
					</Chip>
					<Chip
						theme="secondary"
						clickable
						active={filters.is_admin}
						onClick={setIsAdminFilter}
					>
						Admin
					</Chip>
				</div>
				<div className="waiters-filters">
					<OrderBy
						label="Nome"
						onOrderChange={(direction) => onOrderBy("nome", direction)}
					/>
					<Input
						className="waiters-search"
						placeholder="Buscar..."
						onChangeValue={(value) => onSearch(value)}
					/>
				</div>
			</div>
			{!loading && (
				<div className="waiters-grid">
					{waiters.map((waiter) => (
						<div className="card card-gray" key={waiter.id}>
							<div className="flex-col-text">
								<div className="flex-row-text">
									<span className="waiters-info-name">{waiter.name}</span>
									{waiter.is_admin && (
										<span className="chip-status chip-status-primary">
											ADMIN
										</span>
									)}
								</div>
								<span className="waiters-info-phone">{waiter.phone}</span>
								<span className="waiters-info-email">{waiter.email}</span>
							</div>
							<div className="card-footer">
								<Button
									className="fill-row"
									theme={waiter.active ? "danger" : "primary"}
									onClick={() => onActive(waiter, waiter.active)}
									disabled={activatingWaiterId === waiter.id.toString()}
								>
									{waiter.active ? "DESATIVAR" : "ATIVAR"}
								</Button>
								<IconButton
									theme="secondary"
									className="edit-button"
									onClick={() => onEditWaiter(waiter)}
									size="lg"
								>
									<Edit2 strokeWidth={2} size={16} />
								</IconButton>
							</div>
						</div>
					))}
				</div>
			)}

			{loading && (
				<div className="waiters-loading">
					<Spinner size={48} theme="primary" />
					Carregando Garçons...
				</div>
			)}
		</div>
	);
};

export { Waiters };
