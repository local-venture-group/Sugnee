// Components
import OmJobCard from "../Card/OmJobCard";
import PickupJobCard from "../Card/PickupJobCard";

// Types
import { User } from "../../interfaces/user";

const MypageJobList: React.FC<{ user: User; type: string }> = ({
  user,
  type,
}) => {
  const jobList =
    type === "favorite"
      ? user.favorites.om.concat(user.favorites.friku)
      : user.appliedJobs.om.concat(user.appliedJobs.friku);
  const userOmFavorites = user?.favorites.om.map(
    (favoriteJob) => favoriteJob.id
  );
  const userFrikuFavorites = user?.favorites.friku.map(
    (favoriteJob) => favoriteJob.id
  );

  console.log(jobList);

  return (
    <div>
      <h1>{type}</h1>
      {jobList.length === 0 ? (
        <p>{type === "favorite" ? "お気に入り" : "応募済み"}求人はありません</p>
      ) : (
        jobList.map((job) => (
          <div className="mb-3">
            <OmJobCard job={job} user={user} userFavorites={userOmFavorites} />
          </div>
        ))
        // jobList.map((job) => {
        // job.type_of_job[0] === 2 || 3 ? (
        //   <div className="mb-3">
        //     <OmJobCard
        //       job={job}
        //       user={user}
        //       userFavorites={userOmFavorites}
        //     />
        //   </div>
        // ) : (
        //   <div className="mb-3">
        //     <PickupJobCard
        //       job={job}
        //       user={user}
        //       userFavorites={userFrikuFavorites}
        //     />
        //   </div>
        // );
        // })
      )}
    </div>
  );
};

export default MypageJobList;
