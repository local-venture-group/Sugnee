import { useContext, useEffect, useState } from "react";
import Link from "next/link";

// Contexts
import { AuthContext } from "../../contexts/Auth";
import { SearchConditionContext } from "../../contexts/SearchCondition";

// Components
import JobSearchSidebar from "../../components/JobSearchSidebar";
import OmJobCard from "../../components/Card/OmJobCard";

// Types
import { NextPage } from "next";

const job: NextPage = () => {
  const [jobOffers, setJobOffers] = useState();
  const { workTypes, searchCondition, searchJobOffers } = useContext(
    SearchConditionContext
  );
  const { user } = useContext(AuthContext);
  const userFavorites = user?.favorites.map((favoriteJob) => favoriteJob.id);

  useEffect(() => {
    const getJobData = async () => {
      const jobData = await searchJobOffers(searchCondition);
      setJobOffers(jobData);
    };
    getJobData();
  }, []);

  console.log("検索条件", searchCondition);
  console.log("検索結果", jobOffers);

  if (!jobOffers) {
    return null;
  } else if (jobOffers.length === 0) {
    return <p>検索条件に一致する求人はありません</p>;
  }

  return (
    <div className="container mx-auto">
      <p className="my-10 text-xs text-gray-500">
        <Link href="/">TOP</Link>
        <span className="ml-2">&gt;</span>
        <span className="ml-2">
          勤務地：
          {searchCondition.cities.length
            ? searchCondition.cities.map((city, index) => (
                <span key={index}>{city}</span>
              ))
            : "なし"}
        </span>
        <span className="ml-2">
          職種：
          {searchCondition.workTypes.length
            ? searchCondition.workTypes.map((type, index) => (
                <span key={index}>{workTypes[type]}</span>
              ))
            : "なし"}
        </span>
        <span className="ml-2">
          キーワード：
          {searchCondition.keyWords ? searchCondition.keyWords : "なし"}
        </span>
      </p>
      <div className="flex justify-center">
        <div className="w-full hidden lg:block lg:w-1/4">
          <JobSearchSidebar />
        </div>
        <div className="w-full lg:w-3/4 p-5">
          <p>検索結果一覧</p>
          {jobOffers.length &&
            jobOffers.map((job) => (
              <div className="w-full mb-3" key={job.id}>
                <OmJobCard
                  job={job}
                  user={user}
                  userFavorites={userFavorites}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default job;
