import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../@types";
import { Button, MainContainer } from "../../components";
import { AppDispatch } from "../../store";
import "./styles.scss";

interface WaiterNewOrderPageProps {}

const WaiterNewOrderPage: React.FC<WaiterNewOrderPageProps> = () => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [selectedTable, setSelectedTable] = useState<number | null>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const onSelectTable = (tableId: number) => {
		setSelectedTable(tableId);
	};

	const createOrder = () => {
		const to = Pages.WaiterOrder.replace(":orderId", "1");

		navigate(to);
	};

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			waiterHeaderGoBack
			waiterHeaderOnBack={goBack}
		>
			<div className="new-order">
				<main className="new-order-content">
					<header className={`w-products-header`}>
						<span className="page-title">
							Nova <br />
							Comanda
						</span>
					</header>
					<div className="new-order-tables">
						<span className="new-order-subtitle">Selecionar mesa</span>

						<div className="new-order-list no-scroll">
							{Array.from({ length: 12 }).map((_, index) => {
								const isSelected = selectedTable === index;
								return (
									<div
										role="button"
										onClick={() => onSelectTable(index)}
										className={`card card-gray ${
											isSelected ? " card-selected" : ""
										}`}
										key={index}
									>
										<div className="flex-row-text">
											<span className="tables-info-number">Mesa {index}</span>
											<div
												className={`chip-status chip-status-${
													isSelected ? "secondary" : "primary"
												}`}
											>
												{"OCUPADA"}
											</div>
										</div>
										<span className="table-info-bartender">---</span>
									</div>
								);
							})}
						</div>
					</div>
				</main>
				<Button disabled={selectedTable === null} onClick={createOrder}>
					CONTINUAR
				</Button>
			</div>
		</MainContainer>
	);
};

export default WaiterNewOrderPage;
