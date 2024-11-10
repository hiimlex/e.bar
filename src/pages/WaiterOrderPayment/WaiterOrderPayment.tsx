import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	FieldErrorsType,
	ICreatePayment,
	IPaymentForm,
	Pages,
	TPaymentMethods,
} from "../../@types";
import { PaymentsService, WaiterOrdersService } from "../../api";
import { Button, Input, MainContainer } from "../../components";
import { OnOrderActions, RootState } from "../../store";
import "./styles.scss";

const WaiterOrderPaymentPage: React.FC = () => {
	const { orderId } = useParams();
	const { t } = useTranslation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		control,
		formState: { isValid },
		watch,
		handleSubmit,
	} = useForm<IPaymentForm>({
		mode: "all",
	});

	const values = watch();

	const [method, setMethod] = useState<TPaymentMethods>("pix");
	const { order } = useSelector((state: RootState) => state.onOrder);
	const { attendance } = useSelector((state: RootState) => state.user);
	const [loading, setLoading] = useState(false);

	const chargeBack = useMemo(() => {
		if (order?.total) {
			if (values.receivedValue > order.total) {
				return values.receivedValue - order.total;
			}
		}

		return 0;
	}, [values.receivedValue]);

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

	const selectPaymentMethod = (method: TPaymentMethods) => {
		setMethod(method);
	};

	const onPay = async (data: IPaymentForm) => {
		try {
			if (!order || !attendance) {
				return;
			}

			const { name, nf, receivedValue } = data;

			const createPayment: ICreatePayment = {
				method,
				amount: order.total,
				order_id: order._id,
			};

			if (method === "pix") {
				createPayment.pix_config = {
					name,
				};
			}

			if (method === "credit-card") {
				createPayment.credit_card_config = {
					nf,
				};
			}

			if (method === "cash") {
				createPayment.cash_config = {
					charge: chargeBack,
				};
			}

			const payment = await PaymentsService.create(createPayment);

			console.log(payment);
		} catch (error) {
			console.error(error);
		}
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
								<img src="/src/assets/pix.svg"></img>
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
								<img src="/src/assets/cash.svg"></img>
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
								rules={{
									required: {
										value: true,
										message: FieldErrorsType.Required,
									},
								}}
								render={({ field, fieldState: { error } }) => (
									<Input
										placeholder={t("WaiterOrderPayment.Labels.Name")}
										value={field.value}
										hideLabel
										onChangeValue={(value) => {
											field.onChange(value);
										}}
										errorMessage={error?.message}
										showError={!!error}
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
								rules={{
									required: {
										value: true,
										message: FieldErrorsType.Required,
									},
								}}
								name="nf"
								render={({ field, fieldState: { error } }) => (
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
										errorMessage={error?.message}
										showError={!!error}
									/>
								)}
							/>
						</div>
					)}
					{method === "cash" && (
						<div className="w-op-cash flex gap-6 flex-col">
							<div>
								<span className="text-subtitle-2">
									{t("WaiterOrderPayment.Labels.ReceivedValue")}
								</span>
								<Controller
									control={control}
									name="receivedValue"
									rules={{
										required: {
											value: true,
											message: FieldErrorsType.Required,
										},
										min: {
											value: order?.total || 0,
											message: FieldErrorsType.Min,
										},
									}}
									render={({ field, fieldState: { error } }) => (
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
											errorMessage={error?.message}
											showError={!!error}
											errorValue={{ min: order?.total || 0 }}
										/>
									)}
								/>
							</div>
							<div className="flex flex-row justify-between">
								<span className="text-subtitle-2">
									{t("WaiterOrderPayment.Labels.PurchaseChange")}
								</span>
								<span className="text-subtitle-2">R$ {chargeBack}</span>
							</div>
						</div>
					)}
				</div>
				<footer className="w-op-actions">
					<Button
						className="fill-row"
						disabled={!isValid}
						onClick={handleSubmit(onPay)}
						loading={loading}
					>
						{t("WaiterOrderPayment.Buttons.Confirm")}
					</Button>
				</footer>
			</div>
		</MainContainer>
	);
};

export { WaiterOrderPaymentPage };
