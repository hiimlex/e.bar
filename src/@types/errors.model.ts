import { AxiosError } from "axios";

export enum FieldErrorsType {
	Required = "Generics.FieldErrors.Required",
	InvalidEmail = "Generics.FieldErrors.InvalidEmail",
	InvalidPhone = "Generics.FieldErrors.InvalidPhone",
	MinLength = "Generics.FieldErrors.MinLength",
	MaxLength = "Generics.FieldErrors.MaxLength",
	Min = "Generics.FieldErrors.Min",
}

export enum SystemErrors {
	// General
	ID_NOT_PROVIDED = "ID_NOT_PROVIDED",
	CODE_NOT_PROVIDED = "CODE_NOT_PROVIDED",
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	// Auth
	USER_NOT_FOUND = "USER_NOT_FOUND",
	INVALID_PASSWORD = "INVALID_PASSWORD",
	// Address
	INVALID_CEP = "INVALID_CEP",
	// Category
	CATEGORY_NOT_FOUND = "CATEGORY_NOT_FOUND",
	// Product
	PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
	// Store
	STORE_NOT_FOUND = "STORE_NOT_FOUND",
	STORE_NOT_CREATED = "STORE_NOT_CREATED",
	STORE_ALREADY_HAS_AN_ACTIVE_ATTENDANCE = "STORE_ALREADY_HAS_AN_ACTIVE_ATTENDANCE",
	// Files
	FILE_NOT_FOUND = "FILE_NOT_FOUND",
	// Table
	TABLE_NOT_FOUND = "TABLE_NOT_FOUND",
	// Waiter
	WAITER_NOT_FOUND = "WAITER_NOT_FOUND",
	// Attendance
	ATTENDANCE_NOT_FOUND = "ATTENDANCE_NOT_FOUND",
	// Order
	ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
	CANNOT_CANCEL_ORDER = "CANNOT_CANCEL_ORDER",
}

export type TSystemErrors = keyof typeof SystemErrors;

export interface HTTPError extends Error {
	status: number;
	text: string;
	method: string;
	path: string;
}

export interface AxiosErrorResponse {
	data: {
		message: string;
	};
}

export type ThunkOnError = { onError?: (error: AxiosError) => void };
