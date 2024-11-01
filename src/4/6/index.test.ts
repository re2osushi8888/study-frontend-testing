import { expect, spyOn, test } from 'bun:test';
import { checkLength } from '.';
import * as Fetchers from '../fetchers';
import { postMyArticle } from '../fetchers';
import { httpError, postMyArticleData } from '../fetchers/fixtures';
import type { ArticleInput } from '../fetchers/type';

const mockPostMyArticle = (input: ArticleInput, status = 200) => {
	if (status > 299) {
		return spyOn(Fetchers, 'postMyArticle').mockRejectedValueOnce(httpError);
	}
	try {
		checkLength(input.title);
		checkLength(input.body);
		return spyOn(Fetchers, 'postMyArticle').mockResolvedValue({
			...postMyArticleData,
			...input,
		});
	} catch {
		return spyOn(Fetchers, 'postMyArticle').mockRejectedValueOnce(httpError);
	}
};

const inputFactory = (input?: Partial<ArticleInput>) => {
	return {
		tags: ['testing'],
		title: 'TypeScript を使ったテストの書き方',
		body: 'テストを書くとき、TypeScript を使うことで、テストの保守性が向上します。',
		...input,
	};
};

test('バリデーションに成功した場合、成功レスポンスが返る', async () => {
	const input = inputFactory();
	const mock = mockPostMyArticle(input);
	const data = await postMyArticle(input);
	expect(data).toMatchObject(expect.objectContaining(input));
	expect(mock).toBeCalled();
});

test('バリデーションに失敗した場合、reject される', async () => {
	expect.assertions(2);
	const input = inputFactory({ title: '', body: '' });
	const mock = mockPostMyArticle(input);
	await postMyArticle(input).catch((err) => {
		expect(err).toMatchObject({ err: { message: expect.anything() } });
		expect(mock).toBeCalled();
	});
});

test('データ取得に失敗した場合、rejectされる', async () => {
	expect.assertions(2);
	const input = inputFactory();
	const mock = mockPostMyArticle(input, 500);
	await postMyArticle(input).catch((err) => {
		expect(err).toMatchObject({ err: { message: expect.anything() } });
		expect(mock).toBeCalled();
	});
});
