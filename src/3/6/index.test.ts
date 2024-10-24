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

describe('文字列の検証', () => {
	const str = 'こんにちは世界';
	const obj = { status: 200, message: str };
	test('検証値は期待値と等しい', () => {
		expect(str).toBe('こんにちは世界');
		expect(str).toEqual('こんにちは世界');
	});
	test('toHaveLength: 文字列の長さ', () => {
		expect(str).toHaveLength(7);
		expect(str).not.toHaveLength(8);
	});
	test('toContain: 文字列部分一致', () => {
		expect(str).toContain('世界');
		expect(str).not.toContain('さようなら');
	});
	test('toMatch: 文字列正規表現一致', () => {
		expect(str).toMatch(/世界/);
	});
	test('stringContaining: オブジェクトの中の文字列部分一致', () => {
		expect(obj).toEqual({
			status: 200,
			message: expect.stringContaining('世界'),
		});
	});
	test('stringMatching: オブジェクトの中の文字列正規表現一致', () => {
		expect(obj).toEqual({
			status: 200,
			message: expect.stringMatching(/世界/),
		});
	});
});
