import Link from "next/link";
import { client } from "../../libs/client";

// Components
import PickupCard from "../../components/Card/PickupCard";

// Types
import { GetStaticProps, NextPage } from "next";
import { pickupArticle } from "../../interfaces/job";
interface ArticlesProps {
  pickupArticles: [pickupArticle];
}

const Articles: NextPage<ArticlesProps> = ({ pickupArticles }) => {
  return (
    <div className="container mx-auto">
      <p className="my-10 text-xs text-gray-500">
        <Link href="/">TOP</Link>
        <span className="ml-2">&gt;</span>
        <span className="ml-2">ピックアップ企業</span>
      </p>
      <div className="grid grid-cols-3 gap-4 my-10">
        {pickupArticles.map((article) => (
          <div className="w-full" key={article.id}>
            <PickupCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  const pickupArticleData = await client.get({
    endpoint: "articles",
  });

  return {
    props: { pickupArticles: pickupArticleData.contents },
  };
};
