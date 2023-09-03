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

export async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}
export function convertUsdToCents(usdAmount) {
	// Multiply the USD amount by 100 and round to nearest integer
	const centsAmount = Math.round(usdAmount * 100);
	return centsAmount;
}
export function calculatePercentage(
	amount: number,
	percentage: number
): number {
	return (amount * percentage) / 100;
}
