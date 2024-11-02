import { getMyArticles } from '../fetchers';

export const getMyArticleLinksByCategory = async (category: string) => {
	// データを取得する関数
	const data = await getMyArticles();

	// 取得したデータのうち、指定したタグが含まれている記事に絞り込む
	const articles = data.articles.filter((article) =>
		article.tags.includes(category),
	);

	if (!articles.length) {
		// 該当記事がない場合、nullを返す
		return null;
	}
	return articles.map((article) => ({
		title: article.title,
		link: `/articles/${article.id}`,
	}));
};
