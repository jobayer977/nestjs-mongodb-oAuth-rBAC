export const toBool = (val: any): boolean => val === true || val === 'true';

export function paginationOptions(options: any) {
	const page = Number(options.page) ? Number(options.page) : 1;
	const take = Number(options.take) ? Number(options.take) : 10;
	const skip = page === 1 ? 0 : (page - 1) * take;

	const data = {
		take,
		skip,
	};

	return data;
}

export const isBooleanString = (val: any): boolean => {
	if (val === 'true' || val === 'false') {
		return true;
	}
	return false;
};
