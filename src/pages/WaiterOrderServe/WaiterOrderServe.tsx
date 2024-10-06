import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IOrderProduct, Pages, UpdateOrderProductPayload } from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

interface WaiterOrderServePageProps {}

const WaiterOrderServePage: React.FC<WaiterOrderServePageProps> = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();

	const { order } = useSelector((state: RootState) => state.onOrder);

	const tableNumber = useMemo(
		() => (typeof order?.table !== "string" ? order?.table.number : "---"),
		[order?.table]
	);

	const [loading, setLoading] = useState(false);
	const [toServe, setToServe] = useState<Set<string>>(new Set());

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const addToServe = (orderProduct: IOrderProduct) => {
		const toServeCopy = new Set(toServe);
		if (!toServeCopy.has(orderProduct._id)) {
			toServeCopy.add(orderProduct._id);
		} else {
			toServeCopy.delete(orderProduct._id);
		}
		setToServe(toServeCopy);
	};

	const markAsServe = async () => {
		if (!orderId) {
			return;
		}

		try {
			setLoading(true);

			const arr: UpdateOrderProductPayload[] = [];
			toServe.forEach((id) => {
				arr.push({ order_product_id: id, status: "DELIVERED" });
			});

			await WaiterOrdersService.update_order_products(orderId, arr);

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

			const { data } = await WaiterOrdersService.getById(orderId, {
				order_product_status: "PENDING",
			});

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
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
								{t(`WaiterOrder.Labels.OrderNumber`, { number: order?.number })}
							</span>
							<span className="w-serve-order-table chip-status chip-status-primary">
								{t(`WaiterOrder.Labels.TableNumber`, { number: tableNumber })}
							</span>
						</div>
					</header>
					<span
						className="page-title"
						dangerouslySetInnerHTML={{
							__html: t("WaiterOrder.MarkAsDelivered.Title"),
						}}
					></span>

					<div className="detailed-list">
						<div className="detailed-list-products-header">
							<span className="detailed-list-products-title"></span>
							<span className="detailed-list-products-title">
								{t("WaiterOrder.Table.Headers.Products")}
							</span>
							<span className="detailed-list-products-title">
								{t("WaiterOrder.Table.Headers.Price")}
							</span>
						</div>
						{order?.items.map(
							(op, index) =>
								op.status === "PENDING" && (
									<div
										key={index}
										className={`detailed-list-products-item ${
											toServe.has(op._id) && "text-slash"
										}`}
										onClick={() => addToServe(op)}
									>
										<div
											className={`custom-checkbox ${
												toServe.has(op._id) ? "custom-checkbox-active" : ""
											}`}
										/>
										<span className="detailed-list-products-name">
											({op.quantity}x){" "}
											{typeof op.product !== "string" ? op.product.name : "---"}
										</span>
										<span className="detailed-list-products-price">
											<span>{op.total}</span>
										</span>
									</div>
								)
						)}
					</div>
					<footer className="w-serve-order-footer">
						<Button
							className="fill-row"
							theme="secondary"
							variant="outlined"
							onClick={goBack}
						>
							{t("Generics.Buttons.Cancel")}
						</Button>
						<Button
							onClick={markAsServe}
							disabled={toServe.size === 0}
							className="fill-row"
							theme="secondary"
							loading={loading}
						>
							{t("Generics.Buttons.Confirm")}
						</Button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterOrderServePage };
