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
