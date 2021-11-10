import { useContext, useRef } from "react";
import { useRouter } from "next/router";

import axios from "axios";

// Contexts
import { AuthContext } from "../contexts/Auth";

// Components
import OmJobCard from "../components/Card/OmJobCard";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faKey, faStar } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

export default function Home({ omJobs }) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const userFavorites = user?.favorites.map(
    (favoriteJob) => favoriteJob.corporation_joboffer_id
  );
  return (
    <div>
      <section className="w-full h-96 bg-gradient-to-b from-primary to-secondary"></section>

      <section className="flex flex-col justify-center items-center w-full px-4 pt-10 bg-gray-50">
        <FontAwesomeIcon
          icon={faLightbulb}
          className="text-accent mb-2"
          size="3x"
        />
        <h1 className="text-3xl">PickUp求人</h1>
      </section>
      <section className="flex flex-col justify-center items-center w-full px-4 pt-10">
        <FontAwesomeIcon icon={faStar} className="text-accent mb-2" size="3x" />
        <h1 className="text-3xl">特集一覧</h1>
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
              <OmJobCard job={job} user={user} userFavorites={userFavorites} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const omJobs = await axios
    .get("http://nginx:80/api/user/top")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: { omJobs },
  };
}
