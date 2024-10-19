import { describe, expect, test } from 'bun:test';
import { add } from './index';

// リスト3-2
test('add: 1+2は3', () => {
	expect(add(1, 2)).toBe(3);
});

// リスト3-3
describe('add', () => {
	test('1+1は2', () => {
		expect(add(1, 1)).toBe(2);
	});
	test('1+2は3', () => {
		expect(add(1, 2)).toBe(3);
	});
});
