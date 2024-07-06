/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum Endpoints {
	GetProducts = "/produtos",
	GetProduct = "/produtos/:productId",
	CreateProduct = "/produtos",
	UpdateProduct = "/produtos/:productId",
	DeleteProduct = "/produtos/:productId",

	Login = "/login",
	Me = "/me",

	GetTables = "/mesas",
	GetTable = "/mesas/:id",
	CreateTable = "/mesas",
	UpdateTable = "/mesas/:tableId",
	DeleteTable = "/mesas/:tableId",

	GetWaiters = "/garcons",
	GetWaiter = "/garcons/:waiterId",
	CreateWaiter = "/garcons",
	UpdateWaiter = "/garcons/:waiterId",
	DeleteWaiter = "/garcons/:waiterId",
}
