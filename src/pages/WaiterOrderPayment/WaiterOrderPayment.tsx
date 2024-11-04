import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IPaymentForm, Pages, TPayments } from "../../@types";
import { WaiterOrdersService } from "../../api";
import { Button, Input, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

const WaiterOrderPaymentPage: React.FC = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { control } = useForm<IPaymentForm>({
		mode: "all",
	});

	const [method, setMethod] = useState<TPayments>("pix");
	const { order } = useSelector((state: RootState) => state.onOrder);

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
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goBack = () => {
		const to = Pages.WaiterOrder.replace(":orderId", orderId || "");

		navigate(to);
	};

	const selectPaymentMethod = (method: TPayments) => {
		setMethod(method);
	};

	useEffect(() => {
		getOrder();
	}, []);

	return (
		<MainContainer wrapperRef={wrapperRef} showGoBack onGoBack={goBack}>
			<div className="w-op">
				<main className="w-op-header">
					<header>
						<span
							className="page-title"
							dangerouslySetInnerHTML={{
								__html: t("WaiterOrderPayment.Title"),
							}}
						></span>
					</header>
				</main>
				<div className="w-op-container">
					<div className="flex flex-row justify-between items-center">
						<strong className="w-op-total">
							{t("WaiterOrderPayment.Labels.Total")}
						</strong>
						<strong className="w-op-total-value">R$ {order?.total || 0}</strong>
					</div>
					<div className="w-op-methods">
						<span className="w-op-methods-title">
							{t("WaiterOrderPayment.Labels.PaymentMethod")}
						</span>
						<div className="flex flex-row items-center justify-between">
							<div
								role="button"
								onClick={() => selectPaymentMethod("pix")}
								className={`w-op-methods-item ${
									method === "pix" ? "active" : ""
								}`}
							>
								<img src="/src/assets/Group.svg"></img>
								<label className="label">
									{t("WaiterOrderPayment.Labels.Pix")}
								</label>
							</div>
							<div
								role="button"
								onClick={() => selectPaymentMethod("credit-card")}
								className={`w-op-methods-item ${
									method === "credit-card" ? "active" : ""
								}`}
							>
								<img src="/src/assets/credit-card.svg"></img>
								<label>{t("WaiterOrderPayment.Labels.CreditCard")}</label>
							</div>
							<div
								role="button"
								onClick={() => selectPaymentMethod("cash")}
								className={`w-op-methods-item ${
									method === "cash" ? "active" : ""
								}`}
							>
								<img src="/src/assets/dollar-sign.svg"></img>
								<label>{t("WaiterOrderPayment.Labels.Cash")}</label>
							</div>
						</div>
					</div>

					{method === "pix" && (
						<div className="w-op-pix">
							<span className="text-subtitle-2">
								{t("WaiterOrderPayment.Labels.Name")}
							</span>
							<Controller
								control={control}
								name="name"
								render={({ field }) => (
									<Input
										placeholder={t("WaiterOrderPayment.Labels.Name")}
										value={field.value}
										hideLabel
										onChangeValue={(value) => {
											field.onChange(value);
										}}
									/>
								)}
							/>
						</div>
					)}
					{method === "credit-card" && (
						<div className="w-op-credit-card">
							<span className="text-subtitle-2">
								{t("WaiterOrderPayment.Labels.NF")}
							</span>
							<Controller
								control={control}
								name="nf"
								render={({ field }) => (
									<Input
										hasPrefix
										prefixContent={<span className="text-body-1">#</span>}
										value={field.value}
										placeholder="0"
										hideLabel
										type="number"
										onChangeValue={(value) => {
											field.onChange(value);
										}}
									/>
								)}
							/>
						</div>
					)}
					{method === "cash" && (
						<div className="w-op-cash">
							<span className="text-subtitle-2">
								{t("WaiterOrderPayment.Labels.ReceivedValue")}
							</span>
							<Controller
								control={control}
								name="receivedValue"
								render={({ field }) => (
									<Input
										hasPrefix
										prefixContent={<span className="text-body-1">R$</span>}
										value={field.value}
										placeholder="0"
										hideLabel
										type="number"
										onChangeValue={(value) => {
											field.onChange(value);
										}}
									/>
								)}
							/>
						</div>
					)}
				</div>
				<footer className="w-op-actions">
					<Button className="fill-row">
						{t("WaiterOrderPayment.Buttons.Confirm")}
					</Button>
				</footer>
			</div>
		</MainContainer>
	);
};

export { WaiterOrderPaymentPage };
