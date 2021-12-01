import { useEffect, useContext, useState, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../contexts/Auth/index";

// Components
import Profile from "../../components/Profile";
import MypageJobList from "../../components/MypageJobList";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faFileAlt } from "@fortawesome/free-solid-svg-icons";

const Mypage: React.FC = () => {
  const [currentMenu, setCurrentMenu] = useState("profile");
  const { user, updateProfile } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const handleClickMenu = (e) => {
    e.preventDefault();
    setCurrentMenu(e.target.id);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-4 pt-10">
      <div className="mt-10 w-1/2">
        <button
          type="button"
          id="profile"
          className={`text-sm text-gray-400 py-4 w-1/4 rounded-t-lg ${
            currentMenu === "profile" && "text-gray-900 bg-gray-100"
          }`}
          onClick={handleClickMenu}
        >
          <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
          プロフィール
        </button>
        <button
          type="button"
          id="favorite"
          className={`text-sm text-gray-400 py-4 w-1/4 rounded-t-lg ${
            currentMenu === "favorite" && "text-gray-900 bg-gray-100"
          }`}
          onClick={handleClickMenu}
        >
          <FontAwesomeIcon icon={faHeart} size="lg" className="mr-2" />
          お気に入り求人
        </button>
        <button
          type="button"
          id="apply"
          className={`text-sm text-gray-400 py-4 w-1/4 rounded-t-lg ${
            currentMenu === "apply" && "text-gray-900 bg-gray-100"
          }`}
          onClick={handleClickMenu}
        >
          <FontAwesomeIcon icon={faFileAlt} size="lg" className="mr-2" />
          応募済み求人
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-10/12 bg-gray-100 p-10 rounded-lg">
        {user && currentMenu === "profile" && (
          <Profile user={user} updateProfile={updateProfile} />
        )}
        {user && currentMenu === "favorite" && (
          <MypageJobList user={user} type={"favorite"} />
        )}
        {user && currentMenu === "apply" && (
          <MypageJobList user={user} type={"apply"} />
        )}
      </div>
    </div>
  );
};

export default Mypage;
