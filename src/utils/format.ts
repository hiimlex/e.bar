function phone(s: string): string {
	s = s.replace(/\D/g, "");
	s = s.replace(/^(\d{2})(\d)/g, "($1) $2");
	s = s.replace(/(\d{4,5})(\d{4})/, "$1-$2");

	if (s.length > 15) {
		s = s.slice(0, 15);
	}

	return s;
}

export const format = {
	phone,
};
