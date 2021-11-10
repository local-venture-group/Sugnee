import { useContext } from "react";
import Link from "next/link";
import { handleDate, isFavorite } from "../../../utils";

// Contexts
import { AuthContext } from "../../../contexts/Auth";

// Components
import BookmarkButton from "../../BookmarkButton";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faYenSign,
  faBookmark as faBookmarked,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faClock } from "@fortawesome/free-regular-svg-icons";

export default function OmJobCard({ job, user, userFavorites }) {
  const { addOmBookmark, deleteOmBookmark } = useContext(AuthContext);

  return (
    <Link href={`/job/${job.id}`}>
      <div className="card shadow-lg lg:card-side w-full bg-white hover:shadow cursor-pointer">
        <div className="card-body">
          <div className="card-title flex justify-between">
            <p
              className={`badge ${
                job.hiring_system === "正社員"
                  ? "badge-success"
                  : "badge-warning"
              } p-3 mb-3`}
            >
              {job.hiring_system ? job.hiring_system : "なし"}
            </p>
            {user && userFavorites && isFavorite(userFavorites, job.id) ? (
              <BookmarkButton
                text={<FontAwesomeIcon icon={faBookmarked} />}
                color={"pink"}
                event={(e) => deleteOmBookmark(e, user, job.id)}
              />
            ) : (
              <BookmarkButton
                text={<FontAwesomeIcon icon={faBookmark} />}
                event={(e) => addOmBookmark(e, user, job.id)}
              />
            )}
          </div>
          <p>{job.company_name}</p>
          <p className="text-xl text-primary h-10">{job.job_type}</p>
          <ul className="mt-6">
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="text-gray-500 text-sm ml-3">{job.city}</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faYenSign} />
              <span className="text-gray-500 text-sm ml-3">
                {job.salary_pattern}
                {job.salary_min}円〜{job.salary_max}円
              </span>
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">
            {job.job_description.substring(0, 45)}・・・
          </p>
          {/* <div className="justify-end card-actions">
            {userFavorites && isFavorite(userFavorites, job.id) ? (
              <BookmarkButton text={<FontAwesomeIcon icon={faBookmarked} />} />
            ) : (
              <BookmarkButton text={<FontAwesomeIcon icon={faBookmark} />} />
            )}
          </div> */}
          <div className="justify-end card-actions text-xs text-gray-400">
            <p>
              <FontAwesomeIcon icon={faClock} />
              <span className="ml-1">{handleDate(job.created_at)}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
