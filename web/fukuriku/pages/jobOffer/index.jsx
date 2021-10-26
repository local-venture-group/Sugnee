import { useContext, useEffect, useState } from "react";

// context
import { AuthContext } from "../../contexts/Auth";
import { SearchConditionContext } from "../../contexts/SearchCondition";

// component
import JobCard from "../../components/JobCard";

export default function Job() {
  const [jobOffers, setJobOffers] = useState();
  const { searchCondition, searchJobOffers } = useContext(
    SearchConditionContext
  );
  const { user } = useContext(AuthContext);
  const userFavorites = user?.favorites.map(
    (favoriteJob) => favoriteJob.corporation_joboffer_id
  );

  useEffect(async () => {
    const jobData = await searchJobOffers(searchCondition);
    setJobOffers(jobData);
  }, []);

  console.log("検索条件", searchCondition);
  console.log("検索結果", jobOffers);

  if (!jobOffers) {
    return null;
  } else if (!jobOffers.length) {
    return <p>検索条件に一致する求人はありません</p>;
  }

  return (
    <div className="container mx-auto">
      <p>検索結果一覧</p>

      {jobOffers &&
        jobOffers.map((job) => (
          <div className="md:w-1/2 w-full mb-3" key={job.id}>
            <JobCard job={job} user={user} userFavorites={userFavorites} />
          </div>
        ))}
    </div>
  );
}
