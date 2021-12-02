import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";

// Contexts
import { AuthContext } from "../../contexts/Auth";
import { SearchConditionContext } from "../../contexts/SearchCondition";

// Components
import JobSearchSidebar from "../../components/JobSearchSidebar";
import OmJobCard from "../../components/Card/OmJobCard";
import PickupJobCard from "../../components/Card/PickupJobCard";
import Pagination from "../../components/Pagination/JobOffer";

// Types
import { NextPage } from "next";
import { JobOffer } from "../../interfaces/job";

const job: NextPage = () => {
  const [jobOffers, setJobOffers] = useState<[JobOffer]>();
  const [totalCount, setTotalCount] = useState<number>();
  const [pageNum, setPageNum] = useState<number>(1);
  const PER_PAGE = 12;
  const currentPageNum = pageNum * PER_PAGE - PER_PAGE;
  const lastPageNum = Math.ceil(totalCount / PER_PAGE);
  const paginatedJobOffers =
    currentPageNum + PER_PAGE > jobOffers?.length
      ? jobOffers?.slice(currentPageNum, jobOffers?.length)
      : jobOffers?.slice(currentPageNum, PER_PAGE);

  const handlePageNum = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = (e.target as HTMLButtonElement).value;
    setPageNum(Number(buttonText));
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handlePrev = () => {
    if (pageNum === 1) return;
    setPageNum(pageNum - 1);
    window.scroll({ top: 0, behavior: "smooth" });
  };
  const handleNext = () => {
    setPageNum(pageNum + 1);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const { workTypes, searchCondition, searchJobOffers } = useContext(
    SearchConditionContext
  );
  const { user } = useContext(AuthContext);
  const userFrikuFavorites: number[] = user?.favorites.friku.map(
    (favoriteJob) => favoriteJob.id
  );
  const userOmFavorites: number[] = user?.favorites.friku.map(
    (favoriteJob) => favoriteJob.id
  );

  useEffect(() => {
    const getJobData = async (): Promise<void> => {
      const jobData = await searchJobOffers(searchCondition);
      setJobOffers(jobData);
      setTotalCount(jobData.length);
    };
    getJobData();
  }, []);

  console.log("検索結果", jobOffers);

  if (!jobOffers) {
    return null;
  } else if (!jobOffers.length) {
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
          <p>
            検索結果：{totalCount}件
            <span className="ml-3">
              {pageNum} / {lastPageNum}ページ
            </span>
          </p>
          {paginatedJobOffers.length &&
            paginatedJobOffers.map((job) => {
              return job.type_of_job[0] === 2 || job.type_of_job[0] === 3 ? (
                <div className="mb-3" key={`${job.type_of_job}-${job.id}`}>
                  <OmJobCard
                    job={job}
                    user={user}
                    userFavorites={userOmFavorites}
                  />
                </div>
              ) : (
                <div className="mb-3" key={`${job.type_of_job}-${job.id}`}>
                  <PickupJobCard
                    job={job}
                    user={user}
                    userFavorites={userFrikuFavorites}
                  />
                </div>
              );
            })}
          {totalCount && (
            <Pagination
              totalCount={totalCount}
              PER_PAGE={PER_PAGE}
              pageNum={pageNum}
              lastPageNum={lastPageNum}
              handlePageNum={handlePageNum}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default job;
