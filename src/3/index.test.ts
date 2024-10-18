import { expect, test } from 'bun:test';
import { add } from './index';

// 3-2
test('add: 1 + 2 は 3', () => {
	expect(add(1, 2)).toBe(3);
});
