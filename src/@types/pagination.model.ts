import { SafeAny } from "./generic.model";

export interface IPaginationResponse<T = SafeAny> {
	content: T[];
	total_elements?: number;
	total_pages?: number;
	current_page?: number;
	page_size?: number;

	offset?: number;
	limit?: number;
	next?: boolean;
}
