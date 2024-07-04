import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../@types";
import { Brands, Button, Input } from "../../components";
import "./styles.scss";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const onLogin = async () => {
		// navigation(Pages.Products);
		navigate(Pages.WaiterHome);
	};

	return (
		<div className="login">
			<div className="login-brands">
				<Brands.JobucBrand size={100} />
				<Brands.SocialSipsBrand size={145} />
			</div>
			<div className="login-content">
				<h2 className="page-title">Fazer Login</h2>
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
