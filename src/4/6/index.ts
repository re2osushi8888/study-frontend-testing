export class ValidationError extends Error {}

export const checkLength = (value: string) => {
	if (value.length === 0) {
		throw new ValidationError('1文字以上入力してください');
	}
};
