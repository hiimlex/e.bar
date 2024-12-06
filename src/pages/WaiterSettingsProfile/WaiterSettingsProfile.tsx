import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FieldErrorsType, IEditWaiterForm } from "../../@types";
import { Button, Input, MainContainer } from "../../components";
import { Styled } from "../../styles";
import S from "./WaiterSettingsProfile.styles";
import { format } from "../../utils";

const WaiterSettingsProfilePage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { control, handleSubmit, formState } = useForm<IEditWaiterForm>({
		mode: "all",
	});

	const onSave = (formData: IEditWaiterForm) => {
		console.log(formData);
	};

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
							}
						}}
						render={({ field, fieldState: { error } }) => (
							<Input
								placeholder={t("WaiterSettings.Profile.Fields.Name")}
								onChangeValue={field.onChange}
								value={field.value}
								errorMessage={error?.message}
								showError={!!error}
								errorValue={{
									minLength: 3
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
				>
					{t("WaiterSettings.Profile.Buttons.Save")}
				</Button>
			</S.Container>
		</MainContainer>
	);
};

export default WaiterSettingsProfilePage;
