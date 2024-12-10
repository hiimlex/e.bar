import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
	FieldErrorsType,
	IEditWaiterPasswordForm,
	SafeAny,
} from "../../@types";
import { Button, Input, MainContainer } from "../../components";
import { Styled } from "../../styles";
import S from "./WaiterSettingsPassword.styles";
import { useToast } from "leux";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { WaitersService } from "../../api";

const WaiterSettingsPasswordPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { control, handleSubmit, formState, watch, setError, reset } =
		useForm<IEditWaiterPasswordForm>({
			mode: "all",
		});
	const [saving, setSaving] = useState(false);
	const ToastService = useToast();
	const values = watch();

	useEffect(() => {
		if (values.confirm !== values.new) {
			setError("confirm", {
				message: t("WaiterSettings.Password.Fields.ConfirmError"),
				type: "deps",
			});
		}

		if (values.new === values.old) {
			setError("new", {
				message: t("WaiterSettings.Password.Fields.NewError"),
				type: "deps",
			});
		}
	}, [values]);

	const onSave = async (formData: IEditWaiterPasswordForm) => {
		setSaving(true);

		try {
			const { old: oldPassword, new: newPassword } = formData;

			await WaitersService.change_password({
				newPassword,
				oldPassword,
			});

			ToastService.createToast({
				label: t("WaiterSettings.Password.Success"),
				colorScheme: "success",
			});

			setSaving(false);

			reset();
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				const message = error.response.data as SafeAny;

				if (message && typeof message === "string") {
					const translateMessage = t(`Errors.${message}`);

					ToastService.createToast({
						label: translateMessage,
						colorScheme: "danger",
					});
				}
			}

			setSaving(false);
		}
	};

	return (
		<MainContainer showGoBack onGoBack={() => navigate(-1)} showMenu={false}>
			<S.Container>
				<S.Header>
					<Styled.Typography.Title>
						{t("WaiterSettings.Password.Title")}
					</Styled.Typography.Title>
				</S.Header>

				<S.Form>
					<Controller
						name="old"
						control={control}
						rules={{
							required: {
								value: true,
								message: FieldErrorsType.Required,
							},
							minLength: {
								value: 6,
								message: FieldErrorsType.MinLength,
							},
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								type="password"
								placeholder={t("WaiterSettings.Password.Fields.Old")}
								onChangeValue={field.onChange}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
								errorValue={{
									minLength: 6,
								}}
							/>
						)}
					/>

					<Controller
						name="new"
						control={control}
						rules={{
							required: {
								value: true,
								message: FieldErrorsType.Required,
							},
							minLength: {
								value: 6,
								message: FieldErrorsType.MinLength,
							},
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								type="password"
								placeholder={t("WaiterSettings.Password.Fields.New")}
								onChangeValue={field.onChange}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
								errorValue={{
									minLength: 6,
								}}
							/>
						)}
					/>

					<Controller
						name="confirm"
						control={control}
						rules={{
							required: {
								value: true,
								message: FieldErrorsType.Required,
							},
							minLength: {
								value: 6,
								message: FieldErrorsType.MinLength,
							},
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								type="password"
								placeholder={t("WaiterSettings.Password.Fields.Confirm")}
								onChangeValue={field.onChange}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
								errorValue={{
									minLength: 6,
								}}
							/>
						)}
					/>
				</S.Form>
				<Button
					variant="filled"
					theme="secondary"
					onClick={handleSubmit(onSave)}
					disabled={!formState.isValid || !formState.isDirty}
					loading={saving}
				>
					{t("WaiterSettings.Password.Buttons.Save")}
				</Button>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterSettingsPasswordPage;
