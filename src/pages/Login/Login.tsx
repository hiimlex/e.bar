import { useState } from "react";
import { Button, Input } from "../../components";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../@types";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const navigation = useNavigate();

	const onLogin = async () => {
		navigation(Pages.Products);
	};

	return (
		<div className="login-container">
			<div className="login-content">
				<h2 className="title">Fazer Login</h2>
				<form className="login-form">
					<Input
						onChangeValue={(value) =>
							setLoginData((curr) => ({ ...curr, email: value }))
						}
						value={loginData.email}
						fieldKey="email"
						placeholder="E-mail"
					/>
					<Input
						fieldKey="password"
						placeholder="Senha"
						onChangeValue={(value) =>
							setLoginData((curr) => ({ ...curr, password: value }))
						}
						value={loginData.password}
						type="password"
					/>
				</form>
				<Button onClick={onLogin}>CONTINUAR</Button>
			</div>
		</div>
	);
};

export default LoginPage;
