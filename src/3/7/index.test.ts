import { describe, expect, test } from 'bun:test';
import { timeout, wait } from '.';

describe('非同期処理', () => {
	describe('wait', () => {
		test('[Promise]指定時間待つと,経過時間をもってresolveされる', () => {
			return wait(50).then((duration) => {
				expect(duration).toBe(50);
			});
		});
		test('[async]指定時間待つと,経過時間をもってresolveされる', async () => {
			await expect(wait(50)).resolves.toBe(50);
		});
		test('[async]指定時間待つと,経過時間をもってresolveされる', async () => {
			expect(await wait(50)).toBe(50);
		});
	});
	describe('timeout', () => {
		test('[Promise]指定時間待つと,経過時間をもってrejectされる', () => {
			return timeout(50).catch((duration) => {
				expect(duration).toBe(50);
			});
		});
		test('[async]指定時間待つと,経過時間を持ってrejectされる', async () => {
			return expect(timeout(50)).rejects.toBe(50);
		});
		test('[async]指定時間待つと,経過時間を持ってrejectされる', async () => {
			await expect(timeout(50)).rejects.toBe(50);
		});
		test('[try-catch]指定時間待つと,経過時間をもってrejectされる', async () => {
			// catchを通ることを確認するためにassertionの数を確認する
			expect.assertions(1);
			try {
				await timeout(50);
			} catch (err) {
				expect(err).toBe(50);
			}
		});
		test('return していないため、Promise が解決する前にテストが終了してしまう', () => {
			// bun:testだと両方失敗する
			// 失敗を期待して書かれたアサーション
			// expect(wait(2000)).resolves.toBe(3000);
			// 正しくはアサーションを return する
			// return expect(wait(2000)).resolves.toBe(3000);
		});
	});
});
