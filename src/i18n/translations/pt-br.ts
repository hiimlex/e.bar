import { getOverlappingDaysInIntervals } from "date-fns";

export const ptBr = {
	Login: {
		Subtitle: "Insira suas credenciais para <br/> fazer login",
		Email: "E-mail",
		Password: "Senha",
		Login: "Continuar",
		InvalidCredentials: "Email ou senha inválidos!",
	},
	StoreProducts: {
		Title: "Meus produtos",
		Buttons: {
			Add: "Adicionar",
		},
		Filters: {
			Category: "Categorias",
		},
	},
	BarAttendances: {
		Title: "Atendimentos",
		Buttons: {
			Add: "Iniciar Atendimento",
		},
		Filters: {
			All: "Todos",
			Finished: "Finalizados",
			Interval: "Data de início",
		},
		Table: {
			Headers: {
				Id: "#ID",
				Status: "Status",
				Start: "Início",
				End: "Fim",
				TablesCount: "Mesas",
				Code: "Código",
				Actions: "",
			},
		},
	},
	BarOnAttendance: {
		GoBack: "Voltar",
		Title: "Atendimento #{{attendanceId}} - {{code}}",
		Tabs: {
			Orders: "Pedidos",
			General: "Geral",
			Sales: "Vendas",
		},
		General: {
			Tabs: {
				Tables: "Mesas",
				Waiters: "Garçons",
			},
		},
	},
	Modals: {
		Product: {
			create: {
				Title: "Adicionar produto",
			},
			edit: {
				Title: "Editar produto",
			},
			Fields: {
				Name: "Nome",
				Category: "Categoria",
				Price: "Preço",
				Stock: "Estoque",
				ImagePreview: "Prévia da imagem",
				Upload: "Clique ou arraste para fazer upload da imagem do produto.",
				ChangeImage: "Alterar a imagem do produto.",
			},
		},
		StartAttendance: {
			Title: "Iniciar Atendimento",
			Fields: {
				Code: "Código",
				General: "Geral",
				FinishActiveAttendances: "Finalizar atendimento ativo",
				SelectWaiters: "Selecione os garçons",
				SelectTables: "Selecione as mesas",
				Quantity: "Quantidade",
			},
			Buttons: {
				Start: "Iniciar",
				GoBack: "Voltar",
			},
		},
		Waiter: {
			create: {
				Title: "Adicionar garçom",
			},
			edit: {
				Title: "Editar garçom",
			},
			Fields: {
				Name: "Nome",
				Phone: "Telefone",
				Email: "E-mail",
				Password: "Senha",
				IsAdmin: "Administrador",
			},
			Buttons: {
				Add: "Adicionar",
				Save: "Salvar",
			},
		},
	},
	Generics: {
		Buttons: {
			Continue: "Continuar",
			Confirm: "Confirmar",
			Cancel: "Cancelar",
		},
		FieldErrors: {
			Required: "Campo obrigatório",
			InvalidEmail: "E-mail inválido",
			MinLength: "Mínimo de {{minLength}} caracteres",
			MaxLength: "Máximo de {{maxLength}} caracteres",
			Min: "Mínimo de {{min}}",
		},
		Dates: {
			Short: {
				Format: "dd/MM/yyyy",
			},
			Long: {
				Format: "dd/MM/yyyy HH:mm",
			},
		},
		EmptySign: "---",
		Status: {
			on: "Ativo",
			off: "Inativo",
		},
	},
};
