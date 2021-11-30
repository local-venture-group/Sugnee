import Link from "next/link";
import { useRouter } from "next/router";

const Pagination: React.FC<{ totalCount: number }> = ({ totalCount }) => {
  const router = useRouter();
  const pageNum = Number(router.query.page);
  const PER_PAGE = 12;
  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <ul className="flex justify-center">
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
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
    </ul>
  );
};

export default Pagination;
