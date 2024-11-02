import { afterEach, describe, expect, setSystemTime, test } from 'bun:test';
import { greetByTime } from '.';

describe('greetByTime(', () => {
	afterEach(() => {
		// setSystemTime();
	});

	test('朝は「おはよう」を返す', () => {
		setSystemTime(new Date(2023, 4, 23, 8, 0, 0));
		expect(greetByTime()).toBe('おはよう');
	});

	test('昼は「こんにちは」を返す', () => {
		setSystemTime(new Date(2023, 4, 23, 14, 0, 0));
		expect(greetByTime()).toBe('こんにちは');
	});

	test('夜は「こんばんは」を返す', () => {
		setSystemTime(new Date(2023, 4, 23, 21, 0, 0));
		expect(greetByTime()).toBe('こんばんは');
	});

	test('現在時刻で正しく返す', () => {
		const current_hour = new Date().getHours();
		if (current_hour < 12) {
			const message = 'おはよう';
		}
		if (current_hour < 18) {
			const message = 'こんにちは';
		}
		const message = 'こんばんは';

		expect(greetByTime()).toBe(message);
	});
});
