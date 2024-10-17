import { AxiosResponse } from "axios";
import {
	IAttendance,
	ICreateAttendancePayload,
	IPaginationResponse,
	SafeAny,
} from "../../@types";
import { queryBuilder } from "../../utils";
import { api } from "../api";
import { Endpoints } from "../endpoints";

const fetchAll = async (
	filters?: SafeAny
): Promise<AxiosResponse<IPaginationResponse<IAttendance>>> => {
	try {
		const url = queryBuilder(Endpoints.AttendanceList, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const getById = async (
	attendanceId: string
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const url = queryBuilder(
			Endpoints.AttendanceListById,
			{},
			{ id: attendanceId }
		);
		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const create = async (
	payload: ICreateAttendancePayload
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const res = await api.post(Endpoints.AttendanceCreate, payload);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const update = async (
	attendanceId: string,
	payload: ICreateAttendancePayload
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const url = queryBuilder(Endpoints.AttendanceUpdate, {}, { attendanceId });
		const res = await api.put(url, payload);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const finish = async (
	attendanceId: string
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const url = queryBuilder(
			Endpoints.AttendanceClose,
			{},
			{ id: attendanceId }
		);
		const res = await api.put(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const addTableToAttendance = async (
	id: string
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const url = queryBuilder(Endpoints.AttendanceAddTable, {}, { id });
		const res = await api.post(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const validateCode = async (
	code: string
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const url = queryBuilder(Endpoints.AttendanceValidateCode, {}, { code });

		const res = await api.post(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export const AttendancesService = {
	fetchAll,
	create,
	getById,
	finish,
	addTableToAttendance,
	validateCode,
	update,
};
