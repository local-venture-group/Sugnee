import { useContext, useRef } from "react";
import { useRouter } from "next/router";

import axios from "axios";

// context
import { AuthContext } from "../contexts/Auth";
import { SearchConditionContext } from "../contexts/SearchCondition";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faKey, faStar } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

// components
import Button from "../components/Button";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import JobSearchModal from "../components/JobSearchModal";
import SearchButton from "../components/Button/SearchButton";
import SearchCard from "../components/SearchCard";

export default function Home({ pickUpJobs }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const userFavorites = user?.favorites.map(
    (favoriteJob) => favoriteJob.corporation_joboffer_id
  );
  const { addSearchCondition, searchCondition } = useContext(
    SearchConditionContext
  );
  const searchWordsInputRef = useRef();

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
    router.push("/jobOffer");
  };

  const onClickKeyword = async (e) => {
    e.preventDefault();
    addSearchCondition({
      cities: [],
      keyWords: [e.target.value],
      workTypes: [],
    });
    router.push("/jobOffer");
  };

  return (
    <div className="align-center">
      <Hero SearchCard={SearchCard} />
      <form className="relative w-10/12 left-1/2 transform -translate-x-1/2">
        <input
          type="text"
          className="w-full rounded-full shadow absolute -top-8 h-16 z-10 p-6 focus:border-0 focus:bg-gray-100"
          placeholder="フリーワードで検索"
          ref={searchWordsInputRef}
        />
        <div
          role="presentation"
          className="absolute -inset-y-8 right-3 flex items-center text-sm leading-5 z-20"
        >
          <Button
            type={"submit"}
            option={"btn-circle"}
            size={"md"}
            text={
              <FontAwesomeIcon icon={faSearch} className="hover:text-primary" />
            }
            event={searchJobByWord}
          />
        </div>
      </form>
      <div className="container w-10/12 mx-auto mt-16">
        <p>
          <FontAwesomeIcon icon={faKey} size="lg" className="text-primary" />
          人気の検索ワード
        </p>

        <button
          type="button"
          value="フレックス"
          className="text-sm bg-blue-100 px-6 py-2 m-3 rounded-full hover:bg-blue-200"
          onClick={onClickKeyword}
        >
          フレックス
        </button>
      </div>
      <section className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
          <div className="relative lg:w-1/2">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
            <h5 className="mb-3 text-lg font-extrabold leading-none sm:text-2xl">
              Fリクなら、
              <br />
              あなたに合った求人が見つかります
            </h5>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center w-full px-4 pt-10 bg-gray-50">
        <FontAwesomeIcon
          icon={faLightbulb}
          className="text-accent mb-2"
          size="3x"
        />
        <h1 className="text-3xl">PickUp求人</h1>
        <div className="w-full my-10 p-4 space-x-4 carousel carousel-center rounded-box">
          {pickUpJobs.map((job) => (
            <div className="carousel-item md:w-1/3 w-full" key={job.id}>
              <JobCard job={job} user={user} userFavorites={userFavorites} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-center items-center w-full px-4 pt-10">
        <FontAwesomeIcon icon={faStar} className="text-accent mb-2" size="3x" />
        <h1 className="text-3xl">特集一覧</h1>
        <div className="w-full my-10 p-4 space-x-4 carousel carousel-center rounded-box">
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/500/256/144"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/501/256/144"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/502/256/144"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/503/256/144"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/504/256/144"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/505/256/144"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/id/506/256/144"
              className="rounded-box"
            />
          </div>
        </div>
        <div className="fixed bottom-0 w-full flex justify-end pr-10 pb-10">
          <label
            htmlFor="jobSearchModal"
            className="btn rounded-full border-0 hover:shadow h-24 w-24 bg-gradient-to-r from-primary to-secondary"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-white text-2xl"
              size="2x"
            />
          </label>
          <input type="checkbox" id="jobSearchModal" className="modal-toggle" />
          <JobSearchModal current={"location"} />
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const resData = await axios
    .get("http://nginx:80/api/user/top")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const { pickUpJobs } = resData;

  return {
    props: { pickUpJobs },
  };
}
