import { useRef, useState } from "react";
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
	payment_data,
	payment_item_id,
	initial_method = "pix",
}) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const [method, setMethod] = useState<TPaymentMethods>(initial_method);
	const {
		control,
		formState: { isValid },
		handleSubmit,
	} = useForm<IPaymentForm>({
		mode: "all",
		defaultValues: payment_data,
	});

	const selectPaymentMethod = (method: TPaymentMethods) => {
		setMethod(method);
	};

	const onInputFileClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const handleOnAddPayment = (data: IPaymentForm) => {
		if (onAddPayment) onAddPayment(data, method, payment_item_id);
	};

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
					name="received_value"
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
							name="pix_name"
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
							name="nf_number"
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
					onClick={handleSubmit(handleOnAddPayment)}
				>
					{t("WaiterOrderPayment.Buttons.Continue")}
				</Button>
			</Box>
		</S.Container>
	);
};

export default AddPaymentBottomSheet;
