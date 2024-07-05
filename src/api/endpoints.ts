export enum Endpoints {
	GetProducts = "/produtos",
	GetProduct = "/produtos/:id",
	CreateProduct = "/produtos",
	UpdateProduct = "/produtos/:productId",
	DeleteProduct = "/produtos/:id",

	Login = "/login",
	Me = "/me",

	GetTables = "/mesas",
	GetTable = "/mesas/:id",
	CreateTable = "/mesas",
	UpdateTable = "/mesas/:tableId",
	DeleteTable = "/mesas/:tableId",

	GetWaiters = "/garcons",
	GetWaiter = "/garcons/:id",
	CreateWaiter = "/garcons",
	UpdateWaiter = "/garcons/:id",
	DeleteWaiter = "/garcons/:id",
}
