import { useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { client } from "../../../libs/client";
import { handleDate } from "../../../utils";

// Contexts
import { AuthContext } from "../../../contexts/Auth";

// Components
import Seo from "../../../components/Seo";
import PickupJobCard from "../../../components/Card/PickupJobCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faLink,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLine,
} from "@fortawesome/free-brands-svg-icons";

// Type
import { pickupArticle, JobOffer } from "../../../interfaces/job";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
interface pickUpArticleProps {
  article: pickupArticle;
  jobData?: [JobOffer];
}

const pickUpArticle: NextPage<pickUpArticleProps> = ({ article, jobData }) => {
  const { user } = useContext(AuthContext);
  const userFavorites = user?.favorites.friku.map(
    (favoriteJob) => favoriteJob.id
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
          <span className="ml-2">
            <Link href="/pickup/page/1">ピックアップ企業</Link>
          </span>
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
              <ul className="my-6">
                <li>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-gray-500"
                  />
                  <span className="text-gray-500 ml-3">
                    {article.companyAddress}
                  </span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faLink} className="text-gray-500" />
                  <a
                    href={article.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 ml-3 hover:text-primary"
                  >
                    {article.companyUrl}
                  </a>
                </li>
              </ul>
              <div>
                {article.twitterUrl && (
                  <a
                    href={article.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info mr-3"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
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
          {jobData ? (
            jobData.map((job) => (
              <div key={job.id} className="mb-3">
                <PickupJobCard
                  job={job}
                  user={user}
                  userFavorites={userFavorites}
                />
              </div>
            ))
          ) : (
            <p>求人情報はありません</p>
          )}
        </div>
      </section>
    </>
  );
};

export default pickUpArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  const pickupArticleData = await client.get({
    endpoint: "articles",
    queries: { limit: 100 },
  });

  return {
    paths:
      pickupArticleData?.contents.map((article) => `/pickup/${article.id}`) ??
      [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article = await client.get({
    endpoint: `articles/${params.id}`,
  });

  const jobData = await axios
    .get(`http://nginx:80/api/user/friku/1/joboffers/pickup`)
    .then((res) => {
      if (res.data.message) return;
      return res.data;
    })
    .catch((err) => console.log(err.response));

  return {
    props: {
      article: article ? article : null,
      jobData: jobData ? jobData : null,
    },
  };
};
