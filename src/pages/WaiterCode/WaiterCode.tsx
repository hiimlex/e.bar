import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FieldErrorsType, ICodePayload, Pages } from "../../@types";
import { Brands, Button, Input } from "../../components";
import { AppDispatch, RootState, UserActions } from "../../store";
import "./styles.scss";
import { AttendancesService } from "../../api";
import { AxiosError } from "axios";
import { useToast } from "leux";

interface WaiterCodePageProps {}

const WaiterCodePage: React.FC<WaiterCodePageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();

	const { control, handleSubmit, formState } = useForm<ICodePayload>({
		mode: "all",
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const canVerifyCode = useMemo(() => formState.isValid, [formState]);
	const { attendance } = useSelector((state: RootState) => state.user);

	const onVerifyCode = async (formData: ICodePayload) => {
		try {
			const code = formData.code;

			setLoading(true);

			const { data } = await AttendancesService.validateCode(code);

			dispatch(UserActions.setAttendance(data));

			setLoading(false);
		} catch (error) {
			setLoading(false);

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
		}
	};

	useEffect(() => {
		if (attendance) {
			navigate(Pages.WaiterHome);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [attendance]);

	return (
		<div className="w-code">
			<div className="w-code-content">
				<Brands.EBarBrand />

				<h2
					className="w-code-subtitle"
					dangerouslySetInnerHTML={{ __html: t("WaiterCode.Subtitle") }}
				/>

				<form className="w-code-form" onSubmit={handleSubmit(onVerifyCode)}>
					<Controller
						name="code"
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
						control={control}
						render={({
							field: { name, onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								onChangeValue={(value) => onChange(value)}
								value={value}
								fieldKey={name}
								placeholder="WaiterCode.Fields.Code"
								onBlur={onBlur}
								errorMessage={error?.message}
								errorValue={{ minLength: 6 }}
								showError={!!error}
							/>
						)}
					/>

					<Button disabled={!canVerifyCode} loading={loading} type="submit">
						{t("Generics.Buttons.Continue")}
					</Button>
				</form>
			</div>
		</div>
	);
};

export { WaiterCodePage };
