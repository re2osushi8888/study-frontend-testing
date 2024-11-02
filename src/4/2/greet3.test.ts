import { expect, jest, test } from 'bun:test';

const greet = jest.fn().mockReturnValue(undefined);
const sayGoodBye = jest.fn((name: string) => `Good bye ${name}.`);

test('挨拶が未実装(本来の実装ではない)', () => {
	expect(greet()).toBeUndefined();
});

test('さよならを返す(本来の実装ではない)', () => {
	const message = `${sayGoodBye('Taro')} See you`;
	expect(message).toBe('Good bye Taro. See you');
});
