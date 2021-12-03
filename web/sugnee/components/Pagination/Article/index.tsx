import Link from "next/link";
import { useRouter } from "next/router";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Pagination: React.FC<{ totalCount: number }> = ({ totalCount }) => {
  const router = useRouter();
  const pageNum = Number(router.query.page);
  const PER_PAGE = 12;
  const lastPageNum = Math.ceil(totalCount / PER_PAGE);
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex justify-center items-center">
      {pageNum === 1 ? (
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" size="2x" />
      ) : (
        <Link href={`/pickup/page/${pageNum - 1}`}>
          <a>
            <FontAwesomeIcon icon={faChevronLeft} className="mr-3" size="2x" />
          </a>
        </Link>
      )}

      {range(1, lastPageNum).map((number, index) => (
        <li key={index} className="mr-1">
          {pageNum === number ? (
            <button className="btn btn-primary">{number}</button>
          ) : (
            <Link href={`/pickup/page/${number}`}>
              <a className="btn btn-outline btn-primary">{number}</a>
            </Link>
          )}
        </li>
      ))}
      {pageNum === lastPageNum ? (
        <FontAwesomeIcon icon={faChevronRight} className="ml-3" size="2x" />
      ) : (
        <Link href={`/pickup/page/${pageNum + 1}`}>
          <a>
            <FontAwesomeIcon icon={faChevronRight} className="ml-3" size="2x" />
          </a>
        </Link>
      )}
    </ul>
  );
};

export default Pagination;
