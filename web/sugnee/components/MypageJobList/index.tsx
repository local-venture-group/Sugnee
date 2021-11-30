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
      {jobList.map((job) => (
        <OmJobCard job={job} user={user} userFavorites={userOmFavorites} />
      ))}
    </div>
  );
};

export default MypageJobList;
