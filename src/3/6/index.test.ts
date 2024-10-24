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

describe('配列の検証', () => {
	describe('プリミティブ配列', () => {
		const tags = ['Jest', 'Storybook', 'Playwright', 'React', 'Next.js'];
		test('toContain: リストの中に含まれるか', () => {
			expect(tags).toContain('Jest');
		});
		test('toHaveLength: リストの長さ', () => {
			expect(tags).toHaveLength(5);
		});
	});
	describe('オブジェクトは配列', () => {
		const article1 = { author: 'bob', title: 'Testing Next.js' };
		const article2 = { author: 'michel', title: 'Storybook play function' };
		const article3 = { author: 'karen', title: 'Visual Regression Testing ' };
		const articles = [article1, article2, article3];
		test('toContainEqual: リストの中に含まれるか', () => {
			expect(articles).toContain(article1);
		});
		test('arrayContaining: 配列要素が全て含まれているか', () => {
			expect(articles).toEqual(expect.arrayContaining([article1, article3]));
		});
	});
});

describe('オブジェクトの検証', () => {
	const author = { name: 'taroYamada', age: 38 };
	const article = {
		title: 'Testing with jest',
		author,
	};
	test('toMatchObject: 完全or部分一致', () => {
		expect(author).toMatchObject({ name: 'taroYamada', age: 38 });
		expect(author).toMatchObject({ name: 'taroYamada' });
		expect(author).not.toMatchObject({ gender: 'man' });
	});
	test('toHaveProperty: プロパティを保持しているか', () => {
		expect(author).toHaveProperty('name');
		expect(author).toHaveProperty('age');
	});
	test('objectContaining: オブジェクトに含まれるオブジェクトの検証', () => {
		expect(article).toEqual({
			title: 'Testing with jest',
			author: expect.not.objectContaining({ gender: 'man' }),
		});
		expect(article).toEqual({
			title: 'Testing with jest',
			author: expect.objectContaining({ age: 38, name: 'taroYamada' }),
		});
	});
});
