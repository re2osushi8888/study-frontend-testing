import { expect, spyOn, test } from 'bun:test';
import { getMyArticleLinksByCategory } from '.';
import * as Feature from '../fetchers';
import { getMyArticlesData, httpError } from '../fetchers/fixtures';

const mockGetMyArticles = (status = 200) => {
	if (status > 299) {
		spyOn(Feature, 'getMyArticles').mockRejectedValueOnce(httpError);
	}
	return spyOn(Feature, 'getMyArticles').mockResolvedValueOnce(
		getMyArticlesData,
	);
};

test('指定したタグを持つ記事が1件もない場合、nullが返る', async () => {
	mockGetMyArticles();
	const data = await getMyArticleLinksByCategory('playwright');
	expect(data).toBeNull;
});

test('指定したタグを持つ記事が1件以上ある場合、リンク一覧が返る', async () => {
	mockGetMyArticles();
	const data = await getMyArticleLinksByCategory('testing');
	expect(data).toMatchObject([
		{
			link: '/articles/howTo-testing-with-typescript',
			title: 'TypeScript を使ったテストの書き方',
		},
		{
			link: '/articles/react-component-testing-with-jest',
			title: 'Jest ではじめる React のコンポーネントテスト',
		},
	]);
});

test('データ取得に失敗した場合、reject される', async () => {
	mockGetMyArticles(500);
	await getMyArticleLinksByCategory('testing').catch((err) => {
		expect(err).toMatchObject({
			err: { message: 'internal server error' },
		});
	});
});
