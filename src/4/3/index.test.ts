import { describe, expect, spyOn, test } from 'bun:test';
import { getGreet } from '.';
import * as Fetchers from '../fetchers';
import { httpError } from '../fetchers/fixtures';

// Mocking Fetchers
const mockGetMyProfile = spyOn(Fetchers, 'getMyProfile');

describe('getGreet', () => {
	test('データ取得成功時：ユーザー名がない場合', async () => {
		mockGetMyProfile.mockResolvedValueOnce({
			id: 'xxxxxxx-123456',
			email: 'taroyamada@myapi.testing.com',
		});
		await expect(getGreet()).resolves.toBe('Hello, anonymous user!');
	});

	test('データ取得成功時：ユーザー名がある場合', async () => {
		mockGetMyProfile.mockResolvedValueOnce({
			id: 'xxxxxxx-123456',
			email: 'taroyamada@myapi.testing.com',
			name: 'taroYamada',
		});
		await expect(getGreet()).resolves.toBe('Hello, taroYamada!');
	});

	test('データ取得失敗時', async () => {
		// Simulate a rejected value from getMyProfile
		mockGetMyProfile.mockRejectedValueOnce(httpError);
		await expect(getGreet()).rejects.toMatchObject({
			err: { message: 'internal server error' },
		});
	});

	test('データ取得失敗時、エラー相当のデータが例外としてスローされる', async () => {
		// catch側が通っていることを確認するためassertionの数をテストする
		expect.assertions(1);
		mockGetMyProfile.mockRejectedValueOnce(httpError);
		try {
			await getGreet();
		} catch (err) {
			expect(err).toMatchObject(httpError);
		}
	});
});
