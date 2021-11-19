import { useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { client } from "../../libs/client";
import { handleDate } from "../../utils";

// Contexts
import { AuthContext } from "../../contexts/Auth";

// Components
import Seo from "../../components/Seo";
import PickupJobCard from "../../components/Card/PickupJobCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLine,
} from "@fortawesome/free-brands-svg-icons";

export default function pickUpArticle({ article, companyData }) {
  const { user } = useContext(AuthContext);
  const userFavorites = user?.favorites.map(
    (favoriteJob) => favoriteJob.corporation_joboffer_id
  );

  return (
    <>
      <Seo
        pageTitle={article.title}
        pageDescription={article.description}
        pagePath={`${process.env.NEXT_PUBLIC_APP_URL}/pickup/${article.id}`}
        pageImg={article.thumbnail.url}
      />
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
      <section id="body" className="container mx-auto my-10 px-8 md:px-28">
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
          <div className="mt-6">
            {/* URLとタグは決定後差し替え */}
            <a
              href={`https://twitter.com/share?text=${article.title}&hashtags=F%E3%83%AA%E3%82%AF&url=${process.env.NEXT_PUBLIC_APP_URL}/pickup/${article.id}&related=not_you_die`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-0 mr-3 hover:shadow"
              style={{ backgroundColor: "#1c9cef" }}
            >
              <FontAwesomeIcon icon={faTwitter} />
              シェア
            </a>
            <a
              href={`https://www.facebook.com/share.php?u=${process.env.NEXT_PUBLIC_APP_URL}/pickup/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-0 mr-3 hover:shadow"
              style={{ backgroundColor: "#3b5997" }}
            >
              <FontAwesomeIcon icon={faFacebook} />
              シェア
            </a>
            <a
              href={`https://social-plugins.line.me/lineit/share?url=${process.env.NEXT_PUBLIC_APP_URL}/pickup/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-0 mr-3 hover:shadow"
              style={{ backgroundColor: "#04c655" }}
            >
              <FontAwesomeIcon icon={faLine} />
              シェア
            </a>
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
                {article.twitterUrl && (
                  <a
                    href={article.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info mr-3"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                )}
                {article.facebookUrl && (
                  <a
                    href={article.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mr-3"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="jobOffers" style={{ backgroundColor: "#E6F2F4" }}>
        <div className="container mx-auto px-8 py-28 md:px-28">
          <h2 className="text-2xl font-bold mb-16">求人情報</h2>
          {companyData.frikuJoboffers.map((job) => (
            <div key={job.id} className="mb-3">
              <PickupJobCard
                job={job}
                user={user}
                userFavorites={userFavorites}
              />
            </div>
          ))}
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

  // 今は1しか存在しないので1で対応、のちにarticle.companyIdを渡すよう変更＆エラーハンドリングします
  const companyData = await axios
    .get(`http://nginx:80/api/user/friku/1/joboffers`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      article: article ? article : null,
      companyData: companyData ? companyData : null,
    },
  };
}
