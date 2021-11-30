import Link from "next/link";
import { client } from "../../../libs/client";

// Components
import Pagenation from "../../../components/Pagination";
import PickupCard from "../../../components/Card/PickupCard";

// Types
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { pickupArticle } from "../../../interfaces/job";
interface ArticlesProps {
  pickupArticles: [pickupArticle];
  totalCount: number;
}

const Articles: NextPage<ArticlesProps> = ({ pickupArticles, totalCount }) => {
  return (
    <div className="container mx-auto px-3">
      <p className="my-10 text-xs text-gray-500">
        <Link href="/">TOP</Link>
        <span className="ml-2">&gt;</span>
        <span className="ml-2">ピックアップ企業</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
        {pickupArticles.map((article) => (
          <div className="w-full" key={article.id}>
            <PickupCard article={article} />
          </div>
        ))}
      </div>
      <div>
        <Pagenation totalCount={totalCount} />
      </div>
    </div>
  );
};

export default Articles;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await client.get({
    endpoint: "articles",
  });
  const PER_PAGE = 12;
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(articles.totalCount / PER_PAGE)).map(
    (repo) => `/pickup/page/${repo}`
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const offset = params?.page ? String(params?.page) : "0";

  const pickupArticleData = await client.get({
    endpoint: "articles",
    queries: {
      offset: Math.ceil(Number.parseInt(offset, 10) - 1) * 12,
      limit: 12,
    },
  });

  return {
    props: {
      pickupArticles: pickupArticleData.contents,
      totalCount: pickupArticleData.totalCount,
    },
  };
};
