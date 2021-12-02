import Link from "next/link";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

// Type
interface JobOfferPaginationProps {
  totalCount: number;
  PER_PAGE: number;
  pageNum: number;
  lastPageNum: number;
  handlePageNum: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

const Pagination: React.FC<JobOfferPaginationProps> = ({
  totalCount,
  PER_PAGE,
  pageNum,
  lastPageNum,
  handlePageNum,
  handlePrev,
  handleNext,
}) => {
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex justify-center items-center">
      {pageNum === 1 ? (
        <FontAwesomeIcon icon={faChevronLeft} className="mr-3" size="2x" />
      ) : (
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="mr-3"
          size="2x"
          onClick={handlePrev}
        />
      )}

      {range(1, lastPageNum).map((number, index) => (
        <li key={index} className="mr-1">
          {pageNum === number ? (
            <button className="btn btn-primary">{number}</button>
          ) : (
            <button
              value={number}
              className="btn btn-outline btn-primary"
              onClick={(e) => handlePageNum(e)}
            >
              {number}
            </button>
          )}
        </li>
      ))}
      {pageNum === lastPageNum ? (
        <FontAwesomeIcon icon={faChevronRight} className="ml-3" size="2x" />
      ) : (
        <FontAwesomeIcon
          icon={faChevronRight}
          className="ml-3"
          size="2x"
          onClick={handleNext}
        />
      )}
    </ul>
  );
};

export default Pagination;
