import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	IGetOrderProduct,
	Pages,
	ServeOrderProductPayload,
} from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

interface WaiterOrderServePageProps {}

const WaiterOrderServePage: React.FC<WaiterOrderServePageProps> = () => {
	const { orderId } = useParams();

	const { order } = useSelector((state: RootState) => state.onOrder);

	const [loading, setLoading] = useState(false);
	const [toServe, setToServe] = useState<Set<number>>(new Set());

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const addToServe = (orderProduct: IGetOrderProduct) => {
		const toServeCopy = new Set(toServe);

		if (!toServeCopy.has(orderProduct.order_product_id)) {
			toServeCopy.add(orderProduct.order_product_id);
		} else {
			toServeCopy.delete(orderProduct.order_product_id);
		}

		console.log(toServeCopy);

		setToServe(toServeCopy);
	};

	const markAsServe = async () => {
		if (!orderId) {
			return;
		}

		try {
			setLoading(true);

			const arr: ServeOrderProductPayload[] = [];
			toServe.forEach((id) => {
				arr.push({ order_product_id: id });
			});

			await WaiterOrdersService.serve_order_products(orderId, arr);

			goBack();

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				return;
			}

			const { data } = await WaiterOrdersService.fetchAll({
				order_id: +orderId,
				product_status: "ordered",
			});

			if (data) {
				dispatch(OnOrderActions.setOrder(data[0]));
			} else {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			navigate(Pages.WaiterHome);
		}
	}, []);

	useEffect(() => {
		getOrder();
	}, []);

	return (
		<MainContainer
			wrapperRef={wrapperRef}
			showMenu={false}
			showGoBack
			onGoBack={goBack}
		>
			<div className="w-serve-order">
				<main className="w-serve-order-content">
					<header className={`w-serve-order-header`}>
						<div className="flex flex-row gap-2">
							<span className="w-serve-order-table chip-status chip-status-secondary">
								Pedido {order?.id}
							</span>
							<span className="w-serve-order-table chip-status chip-status-primary">
								Mesa {order?.table_id}
							</span>
						</div>
					</header>
					<span className="page-title">
						Marcar como <br /> Servido
					</span>

					<div className="detailed-list">
						<div className="detailed-list-products-header">
							<span className="detailed-list-products-title"></span>
							<span className="detailed-list-products-title">Produto</span>
							<span className="detailed-list-products-title">Preço</span>
						</div>
						{order?.products.map((op, index) => (
							<div
								key={index}
								className={`detailed-list-products-item ${
									toServe.has(op.order_product_id) && "text-slash"
								}`}
								onClick={() => addToServe(op)}
							>
								<div
									className={`custom-checkbox ${
										toServe.has(op.order_product_id)
											? "custom-checkbox-active"
											: ""
									}`}
								/>
								<span className="detailed-list-products-name">
									({op.status === "delivered" ? op.delivered : op.quantity}x){" "}
									{op.name}
								</span>
								<span className="detailed-list-products-price">
									<span>{op.price}</span>
								</span>
							</div>
						))}
					</div>
					<footer className="w-serve-order-footer">
						<Button
							className="fill-row"
							theme="secondary"
							variant="outlined"
							onClick={goBack}
						>
							Cancelar
						</Button>
						<Button
							onClick={markAsServe}
							disabled={toServe.size === 0}
							className="fill-row"
							theme="secondary"
							loading={loading}
						>
							Confirmar
						</Button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterOrderServePage };
