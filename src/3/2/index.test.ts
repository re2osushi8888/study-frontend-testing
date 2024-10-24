import { describe, expect, test } from 'bun:test';
import { add, sub } from './index';

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

// リスト3-4
describe('四則演算', () => {
	describe('add', () => {
		test('1+1は2', () => {
			expect(add(1, 1)).toBe(2);
		});

		test('1+2は3', () => {
			expect(add(1, 2)).toBe(3);
		});
	});

	describe('sub', () => {
		test('1-1は0', () => {
			expect(sub(1, 1)).toBe(0);
		});
		test('2-1は1', () => {
			expect(sub(2, 1)).toBe(1);
		});
	});
});
