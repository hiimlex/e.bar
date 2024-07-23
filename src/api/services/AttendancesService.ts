import { AxiosResponse } from "axios";
import { IAttendance, SafeAny, StartAttendancePayload } from "../../@types";
import { Endpoints } from "../endpoints";
import { queryBuilder } from "../../utils";
import { api } from "../api";

const fetchAll = async (
	filters?: SafeAny
): Promise<AxiosResponse<IAttendance[]>> => {
	try {
		const url = queryBuilder(Endpoints.GetAttendances, filters);

		const res = await api.get(url);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

const startAttendance = async (
	payload: StartAttendancePayload
): Promise<AxiosResponse<IAttendance>> => {
	try {
		const res = await api.post(Endpoints.CreateAttendance, payload);

		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};

export default { fetchAll, startAttendance };
