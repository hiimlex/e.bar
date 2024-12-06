import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FieldErrorsType, IEditWaiterPasswordForm } from "../../@types";
import { Button, Input, MainContainer } from "../../components";
import { Styled } from "../../styles";
import S from "./WaiterSettingsPassword.styles";

const WaiterSettingsPasswordPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { control, handleSubmit, formState } = useForm<IEditWaiterPasswordForm>(
		{
			mode: "all",
		}
	);

	const onSave = (formData: IEditWaiterPasswordForm) => {
		console.log(formData);
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
				>
					{t("WaiterSettings.Password.Buttons.Save")}
				</Button>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterSettingsPasswordPage;
