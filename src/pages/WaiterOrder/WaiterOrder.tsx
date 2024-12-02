import { useCallback, useEffect, useMemo, useRef } from "react";
import { Check, User } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Pages } from "../../@types";
import { WaiterOrdersService } from "../../api";
import {
	Button,
	ChipStatus,
	ChipStatusProps,
	Icons,
	MainContainer,
} from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";
import { useToast } from "leux";
import { AxiosError } from "axios";

interface WaiterOrderPageProps {}

const WaiterOrderPage: React.FC<WaiterOrderPageProps> = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const ToastService = useToast();
	const { order } = useSelector((state: RootState) => state.onOrder);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const goBack = () => {
		navigate(Pages.WaiterHome);
	};

	const goToMarkAsServePage = () => {
		const to = Pages.WaiterOrderServe.replace(":orderId", orderId || "");

		navigate(to);
	};

	const getOrder = useCallback(async () => {
		try {
			if (!orderId) {
				navigate(Pages.WaiterHome);

				return;
			}

			const { data } = await WaiterOrdersService.getById(orderId);

			if (data) {
				dispatch(OnOrderActions.setOrder(data));
			}

			if (!data) {
				navigate(Pages.WaiterHome);
			}
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const { message } = error.response.data;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const seeOrderProducts = () => {
		const to = Pages.WaiterOrderProducts.replace(":orderId", orderId || "");

		navigate(to);
	};

	const tableNumber = useMemo(
		() => (typeof order?.table !== "string" ? order?.table.number : "---"),
		[order?.table]
	);

	const goToPayment = () => {
		const to = Pages.WaiterOrderPayment.replace(":orderId", orderId || "");

		navigate(to);
	};

	const orderStatusChip: {
		colorScheme: ChipStatusProps["colorScheme"];
		variant: ChipStatusProps["variant"];
	} = useMemo(() => {
		if (order?.status === "FINISHED") {
			return { colorScheme: "success", variant: "outlined" };
		}

		return { colorScheme: "secondary", variant: "filled" };
	}, [order?.status]);

	useEffect(() => {
		getOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getOrder]);

	return (
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack}>
			<div className="w-on-order">
				<main className="w-on-order-content">
					<header className={`w-on-order-header`}>
						<div className="flex flex-row gap-2">
							<ChipStatus customClass="w-on-order-chip" colorScheme="primary">
								{t(`WaiterOrder.Labels.TableNumber`, { number: tableNumber })}
							</ChipStatus>

							<ChipStatus
								colorScheme="primary"
								customClass="w-on-order-chip flex flex-row gap-2"
							>
								<User size={20} />
								{order?.customers || 0}
							</ChipStatus>

							{order?.status && (
								<ChipStatus
									customClass="w-on-order-chip"
									variant={orderStatusChip.variant}
									colorScheme={orderStatusChip.colorScheme}
								>
									{t(`Generics.OrderStatus.${order?.status}`)}
								</ChipStatus>
							)}
						</div>
						<div className="flex-row-text w-on-order-header-title">
							<span className="w-on-order-title">
								{t("WaiterOrder.Labels.OrderNumber", { number: order?.number })}
							</span>
							<button
								className={`link link-secondary ${
									order?.status === "FINISHED" ? "link-disabled" : ""
								}`}
								onClick={seeOrderProducts}
								disabled={order?.status === "FINISHED"}
							>
								{t("WaiterOrder.Buttons.SeeProducts")}
							</button>
						</div>
					</header>
					<div className="detailed-list">
						<div className="detailed-list-products-header">
							<span className="detailed-list-products-title">
								{t("WaiterOrder.Table.Headers.Products")}
							</span>
							<span className="detailed-list-products-title">
								{t("WaiterOrder.Table.Headers.Status")}
							</span>
							<span className="detailed-list-products-title">
								{t("WaiterOrder.Table.Headers.Price")}
							</span>
						</div>
						{order?.items.map((op, index) => (
							<div
								key={index}
								className={`detailed-list-products-item ${
									op.status === "DELIVERED" ? "text-slash" : ""
								}`}
							>
								<span className="detailed-list-products-name">
									({op.quantity}x){" "}
									{typeof op.product !== "string" ? op.product.name : "---"}
								</span>
								<span className="detailed-list-products-name">
									{op.status === "DELIVERED" ? "Servido" : "Pendente"}
								</span>
								<span className="detailed-list-products-price">
									<span>{op.total}</span>
								</span>
							</div>
						))}
					</div>
					<div className="dashline"></div>
					<div className="flex-row-text detailed-list-total">
						<span>{t("WaiterOrder.Labels.Total")}</span>
						<div className="text-currency">
							<span>{t("Generics.Currency.Symbol")}</span>
							<span>{order?.total}</span>
						</div>
					</div>
					<Button
						className="fill-row"
						theme="secondary"
						onClick={goToMarkAsServePage}
						disabled={
							order?.status === "FINISHED" ||
							order?.status === "DELIVERED" ||
							order?.items.length === 0
						}
					>
						<Check size={20} /> {t("WaiterOrder.Buttons.MarkAsDelivered")}
					</Button>
					<footer className="w-on-order-footer">
						{!order?.payment && (
							<button
								className="large-button large-button-secondary"
								onClick={goToPayment}
								disabled={order?.status !== "DELIVERED"}
							>
								<Icons.PaymentSVG fill="#fff" />
								<span>{t("WaiterOrder.Buttons.Payment")}</span>
							</button>
						)}
						{order?.payment && typeof order.payment !== "string" && (
							<button className="large-button large-button-secondary-outlined">
								<img src={`/src/assets/${order.payment.method}.svg`}></img>
								<span>{t(`WaiterOrder.Buttons.${order.payment.method}`)}</span>
							</button>
						)}
						<button className="large-button large-button-primary">
							<Icons.SendSVG fill="#fff	" />
							<span>{t("WaiterOrder.Buttons.Send")}</span>
						</button>
					</footer>
				</main>
			</div>
		</MainContainer>
	);
};

export { WaiterOrderPage };
