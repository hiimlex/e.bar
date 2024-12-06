export const ptBr = {
	Login: {
		Subtitle: "Insira suas credenciais para <br/> fazer login",
		Email: "E-mail",
		Password: "Senha",
		Login: "Continuar",
		InvalidCredentials: "Email ou senha inválidos!",
	},
	WaiterCode: {
		Subtitle:
			"Seja bem vindo ao e.bar, para iniciar o atendimento informe código de serviço.",
		Fields: {
			Code: "Código",
		},
		Placeholder: {
			Code: "Digite o código do atendimento",
		},
	},
	StoreProducts: {
		Title: "Meus produtos",
		Buttons: {
			Add: "Adicionar",
		},
		Filters: {
			Category: "Categorias",
			All: "Todos",
			NoStock: "Sem estoque",
		},
	},
	StoreAttendances: {
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
	StoreAttendanceView: {
		GoBack: "Voltar",
		Title: "Atendimento #{{code}}",
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
			Filters: {
				Name: "Nome",
				SearchByName: "Buscar por nome",
				TableNumber: "N° mesa",
			},
			Buttons: {
				Add: "Adicionar",
				Enable: "Ativar",
				Disable: "Desativar",
			},
			Labels: {
				Waiter: "Garçom {{name}}",
				Table: "Mesa {{number}}",
				Order: "Pedido #{{number}}",
			},
		},
	},
	WaiterHome: {
		Subtitle: "Olá, {{name}}",
		Labels: {
			MyOrders: "Meus Pedidos",
			SeeAll: "ver todos",
			Products: "Produtos",
			OrderNumber: "Pedido N° {{number}}",
			TableNumber: "Mesa {{number}}",
		},
		Buttons: {
			NewOrder: "Novo pedido",
			SeeOrder: "ver pedido",
		},
		Filters: {
			All: "Todos",
			NoStock: "Sem estoque",
		},
	},
	WaiterNewOrder: {
		Subtitle: "Nova <br />Comanda",
		Labels: {
			SelectTable: "Selecione a mesa",
			ForHowMany: "Para quantas pessoas?",
		},
		TableCard: {
			TableNumber: "Mesa {{number}}",
			UsedBy: "Garçom {{name}}",
		},
	},
	WaiterOrder: {
		Labels: {
			TableNumber: "Mesa {{number}}",
			Total: "Total",
			OrderNumber: "Pedido N° {{number}}",
		},
		Buttons: {
			Payment: "Pagamento",
			Send: "Enviar",
			MarkAsDelivered: "Marcar como entregue",
			SeeProducts: "ver items",
			pix: "Pix",
			"credit-card": "Cartão de crédito",
			cash: "Dinheiro",
			Cancel: "Cancelar",
		},
		Table: {
			Headers: {
				Products: "Produtos",
				Status: "Status",
				Price: "Preço",
			},
		},
		MarkAsDelivered: {
			Title: "Marcar item como<br/> entregue",
		},
		Cancel: {
			Title: "Cancelar pedido",
			Body: "Tem certeza que deseja cancelar o pedido?",
			Buttons: {
				Yes: "Sim",
				No: "Não",
			},
		},
	},
	WaiterOrderPayment: {
		Title: "Pagamento de<br/>Pedido",
		Labels: {
			Total: "Total",
			PaymentMethod: "Meio de pagamento",
			ReceivedValue: "Valor recebido",
			Name: "Nome",
			PurchaseChange: "Troco",
			NF: "Nota fiscal",
			CreditCard: "Cartão de crédito",
			Pix: "Pix",
			Cash: "Dinheiro",
			Payment: "Pagamento",
			ValuePerPerson: "Valor por pessoa",
			Attachment: "Comprovante",
			SelectFile: "Enviar comprovante",
		},
		Buttons: {
			Cancel: "Cancelar",
			Confirm: "Confirmar",
			AddPayment: "+ Adicionar pagamento",
			Continue: "Continuar",
			Finish: "Finalizar",
		},
		Modals: {
			AddPayment: {
				Title: "+ Adicionar pagamento",
			},
		},
	},
	WaiterOrderProducts: {
		Title: "Items no<br/> Pedido",
		Buttons: {
			SeeAll: "Ver cardápio",
		},
		Labels: {
			Total: "Total",
			SeeServed: "Ver servidos",
		},
	},
	WaiterAddProducts: {
		Title: "Adicionar items<br/> ao pedido",
		Confirm: {
			Title: "Confirmar items",
		},
		Buttons: {
			Add: "Adicionar",
			Confirm: "Confirmar",
			Cancel: "Cancelar",
		},
		Filters: {
			Stock: "Estoque",
			Preço: "Preço",
			All: "Todos",
			NoStock: "Sem estoque",
		},
	},
	WaiterProducts: {
		Title: "Lista de <br/>Produtos",
	},
	WaiterMyOrders: {
		Title: "Meus <br/>Pedidos",
		Filters: {
			Finished: "Finalizados",
		},
		Card: {
			OrderNumber: "Pedido N° {{number}}",
			TableNumber: "Mesa {{number}}",
			Expand: "expandir",
			Reduce: "reduzir",
		},
	},
	WaiterSettings: {
		Title: "Configurações",
		Subtitle: "Ajustes e configurações da conta.",
		Menu: {
			Attendance: "Atendimento",
			EditProfile: "Editar perfil",
			ChangePassword: "Alterar senha",
			Logout: "Sair",
		},
		Profile: {
			Title: "Editar perfil",
			Fields: {
				Name: "Nome",
				Phone: "Telefone",
				Email: "E-mail",
			},
			Buttons: {
				Save: "Salvar",
			},
		},
		Password: {
			Title: "Alterar senha",
			Fields: {
				Old: "Senha atual",
				New: "Nova senha",
				Confirm: "Confirmar nova senha",
			},
			Buttons: {
				Save: "Salvar",
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
	Loaders: {
		AttendanceWaiters: "Carregando garçons...",
		AttendanceTables: "Carregando mesas...",
		AttendanceOrders: "Carregando pedidos...",
		Products: "Carregando produtos...",
		Orders: "Carregando pedidos...",
	},
	Empty: {
		Orders: "Nenhum pedido encontrado.",
		Products: "Nenhum produto encontrado.",
		NoAvailableTables: "Nenhuma mesa disponível.",
		Empty: "VAZIA",
	},
	Generics: {
		Buttons: {
			Continue: "Continuar",
			Confirm: "Confirmar",
			Cancel: "Cancelar",
			Add: "Adicionar",
		},
		FieldErrors: {
			Required: "Campo obrigatório",
			InvalidEmail: "E-mail inválido",
			InvalidPhone: "Telefone inválido",
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
		TableStatus: {
			InUse: "OCUPADA",
			Free: "LIVRE",
		},
		WaiterStatus: {
			In: "EM ATENDIMENTO",
			Off: "FORA",
		},
		OrderStatus: {
			PENDING: "Pendente",
			DELIVERED: "Entregue",
			FINISHED: "Finalizado",
			CANCELED: "Cancelado",
		},
		AttendanceStatus: {
			OPEN: "Aberto",
			CLOSED: "Finalizado",
			CANCELLED: "Cancelado",
		},
		Currency: {
			Symbol: "R$",
			Format: "R$ {{value}}",
		},
		PaymentMethods: {
			pix: "Pix",
			"credit-card": "Cartão de crédito",
			cash: "Dinheiro",
		},
	},
	Errors: {
		ID_NOT_PROVIDED: "ID não fornecido.",
		CODE_NOT_PROVIDED: "Código não fornecido.",
		UNAUTHORIZED: "Acesso não autorizado.",
		FORBIDDEN: "Acesso proibido.",
		USER_NOT_FOUND: "Usuário não encontrado.",
		INVALID_PASSWORD: "Senha inválida.",
		INVALID_CEP: "CEP inválido.",
		CATEGORY_NOT_FOUND: "Categoria não encontrada.",
		PRODUCT_NOT_FOUND: "Produto não encontrado.",
		STORE_NOT_FOUND: "Loja não encontrada.",
		STORE_NOT_CREATED: "Loja não criada.",
		STORE_ALREADY_HAS_AN_ACTIVE_ATTENDANCE:
			"A loja já possui um atendimento ativo.",
		STORE_HAS_NO_ACTIVE_ATTENDANCE: "A loja não possui um atendimento ativo.",
		FILE_NOT_FOUND: "Arquivo não encontrado.",
		TABLE_NOT_FOUND: "Mesa não encontrada.",
		WAITER_NOT_FOUND: "Garçom não encontrado.",
		ATTENDANCE_NOT_FOUND: "Atendimento não encontrado.",
		ATTENDANCE_IS_CLOSED: "Atendimento encerrado.",
		ORDER_NOT_FOUND: "Pedido não encontrado.",
		CANNOT_CANCEL_ORDER: "Não é possível cancelar o pedido.",
		ORDER_PRODUCT_NOT_FOUND: "Produto do pedido não encontrado.",
		NO_ORDER_PRODUCTS: "Nenhum produto no pedido.",
		ORDER_ALREADY_PAID: "Pedido já pago.",
		PAYMENT_NOT_FOUND: "Pagamento não encontrado.",
	},
	Links: {
		WaiterHome: "Início",
		WaiterMyOrders: "Meus Pedidos",
		WaiterProducts: "Produtos",
		WaiterTables: "Mesas",
		WaiterSettings: "Configurações",
		LogOut: "Sair",
	},
};
