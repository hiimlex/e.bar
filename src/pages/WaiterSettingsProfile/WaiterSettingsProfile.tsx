import { AxiosError } from "axios";
import { useToast } from "leux";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FieldErrorsType, IEditWaiterProfileForm, SafeAny } from "../../@types";
import { WaitersService } from "../../api";
import { Button, Input, MainContainer } from "../../components";
import { AppDispatch, RootState, UserThunks } from "../../store";
import { Styled } from "../../styles";
import { format } from "../../utils";
import S from "./WaiterSettingsProfile.styles";

const WaiterSettingsProfilePage = () => {
	const { t } = useTranslation();
	const currentWaiter = useSelector((state: RootState) => state.user.waiter);

	const navigate = useNavigate();

	const { control, handleSubmit, formState, setValue, getValues, reset } =
		useForm<IEditWaiterProfileForm>({
			mode: "all",
		});
	const [saving, setSaving] = useState(false);
	const ToastService = useToast();
	const dispatch = useDispatch<AppDispatch>();

	const onSave = async (formData: IEditWaiterProfileForm) => {
		setSaving(true);

		try {
			const { name, email, phone } = formData;

			const unmaskPhone = phone?.replace(/\D/g, "");

			await WaitersService.updateProfile({
				email,
				name,
				phone: unmaskPhone,
			});

			setSaving(false);

			await dispatch(UserThunks.getCurrentUser());

			ToastService.createToast({
				label: t("WaiterSettings.Profile.Success"),
				colorScheme: "success",
			});

			reset(undefined, {
				keepValues: true,
			});
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

	useEffect(() => {
		if (currentWaiter) {
			const formValues = getValues();
			if (currentWaiter.name && formValues.name !== currentWaiter?.name) {
				setValue("name", currentWaiter?.name);
			}

			if (currentWaiter.email && formValues.email !== currentWaiter.email) {
				setValue("email", currentWaiter?.email);
			}

			if (currentWaiter.phone) {
				const formattedPhone = format.phone(currentWaiter.phone.toString());
				if (formValues.phone !== formattedPhone) {
					setValue("phone", formattedPhone);
				}
			}
		}
	}, [currentWaiter]);

	return (
		<MainContainer showGoBack onGoBack={() => navigate(-1)} showMenu={false}>
			<S.Container>
				<S.Header>
					<Styled.Typography.Title>
						{t("WaiterSettings.Profile.Title")}
					</Styled.Typography.Title>
				</S.Header>

				<S.Form>
					<Controller
						name="name"
						control={control}
						rules={{
							required: {
								value: true,
								message: FieldErrorsType.Required,
							},
							minLength: {
								value: 3,
								message: FieldErrorsType.MinLength,
							},
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								placeholder={t("WaiterSettings.Profile.Fields.Name")}
								onChangeValue={field.onChange}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
								errorValue={{
									minLength: 3,
								}}
							/>
						)}
					/>

					<Controller
						name="email"
						control={control}
						rules={{
							required: {
								value: true,
								message: FieldErrorsType.Required,
							},
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: FieldErrorsType.InvalidEmail,
							},
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								type="email"
								placeholder={t("WaiterSettings.Profile.Fields.Email")}
								onChangeValue={field.onChange}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
							/>
						)}
					/>

					<Controller
						name="phone"
						control={control}
						rules={{
							required: {
								value: true,
								message: FieldErrorsType.Required,
							},
							pattern: {
								value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
								message: FieldErrorsType.InvalidPhone,
							},
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								type="tel"
								placeholder={t("WaiterSettings.Profile.Fields.Phone")}
								onChangeValue={(value) => {
									const formattedPhone = format.phone(value);

									field.onChange(formattedPhone);
								}}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
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
					{t("WaiterSettings.Profile.Buttons.Save")}
				</Button>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterSettingsProfilePage;
