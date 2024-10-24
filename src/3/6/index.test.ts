import { describe, expect, test } from 'bun:test';
describe('真偽値の検証', () => {
	test('「真の値」の検証', () => {
		expect(1).toBeTruthy();
		expect('1').toBeTruthy();
		expect(true).toBeTruthy();
		expect(0).not.toBeTruthy();
		expect('').not.toBeTruthy();
		expect(false).not.toBeTruthy();
	});
	test('「偽の値」の検証', () => {
		expect(0).toBeFalsy();
		expect('').toBeFalsy();
		expect(false).toBeFalsy();
		expect(1).not.toBeFalsy();
		expect('1').not.toBeFalsy();
		expect(true).not.toBeFalsy();
	});
	test('「null,undefined」の検証', () => {
		expect(null).toBeFalsy();
		expect(undefined).toBeFalsy();
		expect(null).toBeNull();
		expect(undefined).toBeUndefined();
		expect(undefined).not.toBeDefined();
	});
});

describe('数値の検証', () => {
	const value = 2 + 2;
	test('検証値は期待値と等しい', () => {
		expect(value).toBe(4);
		expect(value).toEqual(4);
	});
	test('検証値は期待値より大きい', () => {
		expect(value).toBeGreaterThan(3);
		expect(value).toBeGreaterThanOrEqual(4);
	});
	test('検証値は期待値より小さい', () => {
		expect(value).toBeLessThan(5);
		expect(value).toBeLessThanOrEqual(4);
	});
	test('小数計算は正確ではない', () => {
		expect(0.1 + 0.2).not.toBe(0.3);
	});
	test('小数計算の指定桁までを比較する', () => {
		expect(0.1 + 0.2).toBeCloseTo(0.3);
		expect(0.1 + 0.2).toBeCloseTo(0.3, 15);
		expect(0.1 + 0.2).not.toBeCloseTo(0.3, 16);
	});
});
