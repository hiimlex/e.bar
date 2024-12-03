import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Icons, Input } from "../../";
import {
	FieldErrorsType,
	IPaymentForm,
	TPaymentMethods,
} from "../../../@types";

import { Box } from "leux";
import { Paperclip } from "react-feather";
import { useTheme } from "styled-components";
import { Styled } from "../../../styles";
import { IAddPaymentBottomSheetProps } from "./AddPaymentBottomSheet.model";
import S from "./AddPaymentBottomSheet.styles";

const AddPaymentBottomSheet: React.FC<IAddPaymentBottomSheetProps> = ({
	order,
	onAddPayment,
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [method, setMethod] = useState<TPaymentMethods>("pix");
	const {
		control,
		formState: { isValid },
		watch,
		handleSubmit,
	} = useForm<IPaymentForm>({
		mode: "all",
	});
	const values = watch();

	const selectPaymentMethod = (method: TPaymentMethods) => {
		setMethod(method);
	};

	const chargeBack = useMemo(() => {
		if (order?.total) {
			if (values.receivedValue > order.total) {
				return values.receivedValue - order.total;
			}
		}

		return 0;
	}, [values.receivedValue]);

	const onInputFileClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<S.Container>
			<S.PaymentMethod className="w-op-methods">
				<Styled.Typography.Label>
					{t("WaiterOrderPayment.Labels.PaymentMethod")}
				</Styled.Typography.Label>
				<Box
					flex
					flexDirection="row"
					alignItems="center"
					justifyContent="space-between"
					customClass="gap-4"
				>
					<S.PaymentMethodItem
						role="button"
						active={method === "pix"}
						onClick={() => selectPaymentMethod("pix")}
					>
						<Icons.PixSVG
							fill={method === "pix" ? theme.colors.primary : theme.text.dark}
						/>
						<label className="label">
							{t("WaiterOrderPayment.Labels.Pix")}
						</label>
					</S.PaymentMethodItem>
					<S.PaymentMethodItem
						active={method === "credit-card"}
						role="button"
						onClick={() => selectPaymentMethod("credit-card")}
					>
						<Icons.CreditCardSVG
							fill={
								method === "credit-card"
									? theme.colors.primary
									: theme.text.dark
							}
						/>
						<label>{t("WaiterOrderPayment.Labels.CreditCard")}</label>
					</S.PaymentMethodItem>
					<S.PaymentMethodItem
						role="button"
						onClick={() => selectPaymentMethod("cash")}
						active={method === "cash"}
					>
						<Icons.CashSVG
							fill={method === "cash" ? theme.colors.primary : theme.text.dark}
						/>
						<label>{t("WaiterOrderPayment.Labels.Cash")}</label>
					</S.PaymentMethodItem>
				</Box>
			</S.PaymentMethod>

			<Box>
				<Styled.Typography.FieldLabel>
					{t("WaiterOrderPayment.Labels.ReceivedValue")}
				</Styled.Typography.FieldLabel>
				<Controller
					control={control}
					name="receivedValue"
					rules={{
						required: {
							value: true,
							message: FieldErrorsType.Required,
						},
					}}
					render={({ field, fieldState: { error } }) => (
						<Input
							hasPrefix
							prefixContent={<span className="text-body-1">R$</span>}
							value={field.value}
							placeholder="0"
							type="number"
							hideLabel
							onChangeValue={(value) => {
								field.onChange(value);
							}}
							errorMessage={error?.message}
							showError={!!error}
							errorValue={{ min: order?.total || 0 }}
						/>
					)}
				/>
			</Box>
			{method === "pix" && (
				<Box flex flexDirection="column" customClass="gap-3">
					<Box>
						<Styled.Typography.FieldLabel>
							{t("WaiterOrderPayment.Labels.Name")}
						</Styled.Typography.FieldLabel>
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
					</Box>
				</Box>
			)}
			{method === "credit-card" && (
				<Box flex flexDirection="column" customClass="gap-3">
					<Box>
						<Styled.Typography.FieldLabel className="text-subtitle-2">
							{t("WaiterOrderPayment.Labels.NF")}
						</Styled.Typography.FieldLabel>
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
					</Box>
				</Box>
			)}
			{method === "cash" && (
				<div className="flex flex-row justify-between">
					<Styled.Typography.BodyBold>
						{t("WaiterOrderPayment.Labels.PurchaseChange")}
					</Styled.Typography.BodyBold>
					<Styled.Typography.BodyBold>
						R$ {chargeBack}
					</Styled.Typography.BodyBold>
				</div>
			)}
			{(method === "credit-card" || method === "pix") && (
				<Box>
					<Styled.Typography.FieldLabel>
						{t("WaiterOrderPayment.Labels.Attachment")}
					</Styled.Typography.FieldLabel>
					<Controller
						control={control}
						name="attachment"
						render={({ field }) => (
							<S.InputFileWrapper onClick={onInputFileClick}>
								<input
									type="file"
									onChange={(e) =>
										field.onChange(
											(e.target.files && e.target.files[0]) || null
										)
									}
									ref={inputRef}
									style={{ display: "none" }}
								/>
								<Styled.Typography.BodyBold
									textColor={field.value ? "dark" : "gray300"}
								>
									{field.value?.name ||
										t("WaiterOrderPayment.Labels.SelectFile")}
								</Styled.Typography.BodyBold>
								<S.InputFileSuffix>
									<Paperclip color={theme.colors.gray300} />
								</S.InputFileSuffix>
							</S.InputFileWrapper>
						)}
					/>
				</Box>
			)}
			<Box flex flexDirection="row" alignItems="center" customClass="gap-3">
				<Button className="fill-row" theme="default">
					{t("WaiterOrderPayment.Buttons.Cancel")}
				</Button>
				<Button
					className="fill-row"
					theme="secondary"
					disabled={!isValid}
					onClick={handleSubmit(onAddPayment)}
				>
					{t("WaiterOrderPayment.Buttons.Continue")}
				</Button>
			</Box>
		</S.Container>
	);
};

export default AddPaymentBottomSheet;
