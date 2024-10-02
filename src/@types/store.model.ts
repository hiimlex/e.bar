export interface IStore {
	_id: string;
	name: string;
	bio: string;
	phone: number;
	email: string;
	address: {
		cep: number;
		street: string;
		number: number;
		complement: string;
		neighborhood: string;
		city: string;
		state: string;
	};
	avatar?: string;
	thumbnail?: string;
	enabled: boolean;
	created_at: string;
	updated_at: string;
}
