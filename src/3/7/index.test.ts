import { describe, expect, test } from 'bun:test';
import { wait } from '.';

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
		test('[async]指定時間待つと,経過時間を待ってresolveされる', async () => {
			expect(await wait(50)).toBe(50);
		});
	});
});
