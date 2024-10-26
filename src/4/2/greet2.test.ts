import { expect, jest, test } from 'bun:test';

const greet = jest.fn((name: string) => undefined);

test('挨拶を返さない（本来の実装ではない）', () => {
	expect(greet('Taro')).toBeUndefined();
});
