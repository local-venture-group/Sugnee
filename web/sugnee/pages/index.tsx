import Link from "next/link";
import { useContext, useRef } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { client } from "../libs/client";

// Contexts
import { AuthContext } from "../contexts/Auth";
import { SearchConditionContext } from "../contexts/SearchCondition";

// Components
import Seo from "../components/Seo";
import OmJobCard from "../components/Card/OmJobCard";
import PickupCard from "../components/Card/PickupCard";
import SearchTypeCard from "../components/Card/SearchTypeCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faKey,
  faStar,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

// Types
import { GetStaticProps, NextPage } from "next";
import { JobOffer, pickupArticle } from "../interfaces/job";
interface HomeProps {
  omJobs: [JobOffer];
  pickupArticles: [pickupArticle];
}

const Home: NextPage<HomeProps> = ({ omJobs, pickupArticles }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const userFavorites = user?.favorites.map((favoriteJob) => favoriteJob.id);
  const { addSearchCondition } = useContext(SearchConditionContext);
  const searchWordsInputRef = useRef<HTMLInputElement>();

  const searchJobByWord = async (e) => {
    e.preventDefault();
    const keyword = searchWordsInputRef.current.value
      .replaceAll(/　/g, " ")
      .split(" ");
    addSearchCondition({
      cities: [],
      keyWords: keyword,
      workTypes: [],
    });
    router.push("/job");
  };

  const onClickKeyword = async (e) => {
    e.preventDefault();
    addSearchCondition({
      cities: [],
      keyWords: [e.target.value],
      workTypes: [],
    });
    router.push("/job");
  };

  return (
    <>
      <Seo />
      <div>
        <section className="w-full h-96 bg-gradient-to-b from-primary to-secondary"></section>

        <section className="flex flex-col justify-center items-center w-full px-4 pt-10 bg-gray-50">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-accent mb-2"
            size="3x"
          />
          <h1 className="text-3xl">ピックアップ企業</h1>
          <p className="mt-4 mb-10 text-sm hover:text-gray-400">
            <Link href="/pickup">
              <a>
                すべて見る
                <span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-1 text-primary"
                  />
                </span>
              </a>
            </Link>
          </p>
          <div className="w-full mb-10 p-4 space-x-4 carousel carousel-center rounded-box">
            {pickupArticles.map((article) => (
              <div className="carousel-item md:w-1/3 w-full" key={article.id}>
                <PickupCard article={article} />
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col justify-center items-center w-full px-4 pt-10">
          <FontAwesomeIcon
            icon={faStar}
            className="text-accent mb-2"
            size="3x"
          />
          <h1 className="text-3xl">注目企業</h1>
        </section>
        <section className="flex flex-col justify-center items-center w-full px-4 pt-10 bg-gray-50">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-accent mb-2"
            size="3x"
          />
          <h1 className="text-3xl">新着求人</h1>

          <div className="w-full my-10 p-4 space-x-4 carousel carousel-center rounded-box">
            {omJobs.map((job) => (
              <div className="carousel-item md:w-1/3 w-full" key={job.id}>
                <OmJobCard
                  job={job}
                  user={user}
                  userFavorites={userFavorites}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col justify-center items-center w-full px-4 pt-10 bg-gradient-to-b from-primary to-secondary">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-accent mb-2"
            size="3x"
          />
          <h1 className="text-3xl text-white">求人をさがす</h1>
          <div className="flex justify-center items-center w-10/12 pt-10">
            {["勤務地", "職種"].map((text, i) => (
              <SearchTypeCard text={text} key={i} />
            ))}
          </div>
          <form className="w-full flex flex-col items-center mt-10">
            <div className="relative w-10/12">
              <input
                type="text"
                className="w-full rounded-3xl shadow h-16 p-6 focus:border-0 focus:bg-gray-100"
                placeholder="フリーワードで検索"
                ref={searchWordsInputRef}
              />
              <span className="absolute inset-y-2 right-3">
                <button
                  type="submit"
                  className="btn-circle btn-accent btn-md"
                  onClick={searchJobByWord}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="hover:text-white"
                  />
                </button>
              </span>
            </div>
          </form>
          <div className="container w-10/12 mx-auto mt-3">
            <p>
              <FontAwesomeIcon icon={faKey} size="lg" className="text-accent" />
              人気の検索ワード
            </p>

            <button
              type="button"
              value="フレックス"
              className="text-sm bg-white px-6 py-2 m-3 rounded-full hover:bg-blue-200"
              onClick={onClickKeyword}
            >
              フレックス
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const omJobs = await axios
    .get("http://nginx:80/api/user/top")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const pickupArticleData = await client.get({
    endpoint: "articles",
  });

  return {
    props: { omJobs, pickupArticles: pickupArticleData.contents },
  };
};
