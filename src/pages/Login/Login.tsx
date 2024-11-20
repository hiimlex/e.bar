import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FieldErrorsType, LoginPayload, Pages } from "../../@types";
import { AUTH_TOKEN_KEY, AuthService } from "../../api";
import { Brands, Button, Input } from "../../components";
import { AppDispatch, RootState, UserActions } from "../../store";
import "./styles.scss";
import { useToast } from "leux";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
	const { t } = useTranslation();
	const ToastService = useToast();

	const { control, handleSubmit, formState } = useForm<LoginPayload>({
		mode: "all",
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const canLogin = useMemo(() => formState.isValid, [formState]);

	const onLogin = async (formData: LoginPayload) => {
		try {
			const { email, password } = formData;

			setLoading(true);

			const { data } = await AuthService.login(email, password);

			const { access_token } = data;

			if (access_token) {
				localStorage.setItem(AUTH_TOKEN_KEY, access_token);

				const {
					data: { waiter, store, is_store },
				} = await AuthService.getCurrentUser();

				if (is_store && store) {
					dispatch(UserActions.setStore(store));
				}

				if (!is_store && waiter) {
					dispatch(UserActions.setWaiter(waiter));
				}

				dispatch(UserActions.setIsAdmin(is_store));
			}

			setLoading(false);
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

			setLoading(false);
		}
	};

	const { isAuthenticated, waiter, isAdmin, store } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (isAuthenticated) {
			if (!isAdmin && waiter) {
				navigate(Pages.WaiterCode);
			}

			if (isAdmin && store) {
				navigate(Pages.StoreProducts);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isAdmin, waiter, store]);

	return (
		<div className="login">
			<div className="login-content">
				<Brands.EBarBrand />

				<h2
					className="login-subtitle"
					dangerouslySetInnerHTML={{ __html: t("Login.Subtitle") }}
				/>

				<form className="login-form" onSubmit={handleSubmit(onLogin)}>
					<Controller
						name="email"
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
						control={control}
						render={({
							field: { name, onChange, onBlur, value },
							fieldState: { error },
						}) => (
							<Input
								onChangeValue={(value) => onChange(value)}
								value={value}
								fieldKey={name}
								placeholder="Login.Email"
								onBlur={onBlur}
								errorMessage={error?.message}
								showError={!!error}
							/>
						)}
					/>

					<Controller
						name="password"
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
								placeholder="Login.Password"
								onBlur={onBlur}
								type="password"
								errorMessage={error?.message}
								errorValue={{ minLength: 6 }}
								showError={!!error}
							/>
						)}
					/>

					<Button disabled={!canLogin} loading={loading} type="submit">
						{t("Generics.Buttons.Continue")}
					</Button>
				</form>
			</div>
		</div>
	);
};

export { LoginPage };
