import { useRouter } from "next/router";

import { handleDate } from "../../../utils";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function PickupCard({ article }) {
  const router = useRouter();

  return (
    <div className="card">
      <figure>
        <img src={article.thumbnail.url} />
      </figure>
      <div className="card-body bg-white">
        <h2 className="card-title">
          {article.title}
          <div className="badge mx-2 badge-primary">NEW</div>
        </h2>

        <div className="flex items-center">
          <div className="avatar">
            <div className="rounded-full w-10 h-10">
              <img src={article.companyLogo.url} />
            </div>
          </div>
          {article.companyName}
        </div>
        <div className="justify-between card-actions text-xs text-gray-400">
          <div>
            <FontAwesomeIcon icon={faClock} />
            <span className="ml-1">{handleDate(article.publishedAt)}</span>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/pickup/${article.id}`)}
          >
            More info
          </button>
        </div>
      </div>
    </div>
  );
}
