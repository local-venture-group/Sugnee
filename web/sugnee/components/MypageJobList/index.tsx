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
      ? user.favorites.friku.concat(user.favorites.om)
      : user.appliedJobs.friku.concat(user.appliedJobs.om);
  const userOmFavorites = user?.favorites.om.map(
    (favoriteJob) => favoriteJob.id
  );
  const userFrikuFavorites = user?.favorites.friku.map(
    (favoriteJob) => favoriteJob.id
  );

  return (
    <div>
      {jobList.length === 0 ? (
        <p>{type === "favorite" ? "お気に入り" : "応募済み"}求人はありません</p>
      ) : (
        jobList.map((job) => {
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
        })
      )}
    </div>
  );
};

export default MypageJobList;
