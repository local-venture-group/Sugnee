import Link from "next/link";
import { client } from "../../libs/client";
import { handleDate } from "../../utils";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function pickUpArticle({ article }) {
  return (
    <>
      <section id="hero">
        <p className="my-10 ml-10 text-xs text-gray-500">
          <Link href="/">TOP</Link>
          <span className="ml-2">&gt;</span>
          <span className="ml-2">ピックアップ求人</span>
          <span className="ml-2">&gt;</span>
          <span className="ml-2">{article.companyName}</span>
        </p>
        <div
          className="hero h-96"
          style={{ backgroundImage: `url(${article.thumbnail.url})` }}
        ></div>
      </section>
      <section id="body" className="container mx-auto mt-10 px-8 md:px-28">
        <div className="w-full flex">
          <div className="w-full">
            <h1 className="text-4xl font-bold mb-10">{article.title}</h1>
            <h2 className="text-2xl text-primary font-bold mb-6">
              {article.companyName}
            </h2>
            <p className="text-sm">
              <FontAwesomeIcon
                icon={faClock}
                size="sm"
                className="text-gray-500"
              />
              <span className="text-gray-400 ml-3">
                {handleDate(article.publishedAt)}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-12 mt-20">
          {/* react-markdown導入検討 */}
          <article
            className="prose lg:prose-lg w-full lg:w-3/5"
            dangerouslySetInnerHTML={{
              __html: `${article.body}`,
            }}
          />
          <div className="w-full lg:w-2/5 max-w-screen-sm">
            <div className="p-8 border-t border-b md:border md:rounded">
              <div className="flex py-2 items-center">
                <img
                  src={article.companyLogo.url}
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                />
                <span className="font-semibold text-gray-700">
                  {article.companyName}
                </span>
              </div>
              <p className="text-gray-500 py-3 text-sm">会社情報</p>
              <div className="text-center">
                {/* 会社のTwitterなど入れるならmicroCMSにコンテンツ追加 */}
                <button className="btn btn-primary mr-3">
                  <a
                    href="https://www.facebook.com/localventuregroup/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </button>
                <button className="btn btn-info mr-3">
                  <a
                    href="https://twitter.com/localventure_jps"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  // デフォルトでlimit10が設定されているので一覧表示件数定まったらlimitパラメータつける
  const pickupArticleData = await client.get({
    endpoint: "articles",
  });

  return {
    paths:
      pickupArticleData?.contents.map((article) => `/pickup/${article.id}`) ??
      [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const article = await client.get({
    endpoint: `articles/${params.id}`,
  });

  return {
    props: { article: article ? article : null },
  };
}
