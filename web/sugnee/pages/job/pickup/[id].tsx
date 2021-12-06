import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { handleDate, isFavorite } from "../../../utils";

// Contexts
import { AuthContext } from "../../../contexts/Auth";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faYenSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

// Types
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { JobOffer } from "../../../interfaces/job";

const jobOffer: NextPage<{ job: JobOffer }> = ({ job }) => {
  const router = useRouter();
  const { user, addOmBookmark, deleteOmBookmark } = useContext(AuthContext);
  const userFavorites: number[] = user?.favorites.om.map(
    (favoriteJob) => favoriteJob.id
  );

  const applyJobOffer = (): void => {
    // 人材紹介だった場合は導線分けるかも、仕様確定後修正します
    if (user) {
      router.push(`/apply/${job.id}`);
      return;
    }
    alert("応募はログインが必要です");
  };

  if (!job) return null;
  return (
    <>
      <section id="hero">
        <p className="my-10 ml-10 text-xs text-gray-500">
          <Link href="/">TOP</Link>
          <span className="ml-2">&gt;</span>
          <span className="ml-2">{job.company_name}</span>
        </p>
        <div className="hero h-96 bg-gradient-to-b from-primary to-secondary"></div>
      </section>
      <section id="body">
        <div className="container mx-auto mt-10 px-8 md:px-28">
          <div className="w-full flex">
            <div className="w-full lg:w-3/4">
              <h2 className="text-lg text-primary font-bold">
                {job.company_name}
              </h2>
              <h1 className="text-2xl font-bold">{job.job_type}</h1>
              <ul className="my-6">
                <li>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-gray-500"
                  />
                  <span className="text-gray-500 ml-3">{job.city}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faYenSign} className="text-gray-500" />
                  <span className="text-gray-500 ml-3">
                    {parseInt(job.salary_min).toLocaleString()}〜
                    {parseInt(job.salary_max).toLocaleString()}円
                  </span>
                </li>
              </ul>
              <p className="text-sm">
                <FontAwesomeIcon
                  icon={faClock}
                  size="sm"
                  className="text-gray-500"
                />
                <span className="text-gray-400 ml-3">
                  {handleDate(job.created_at)}
                </span>
              </p>
            </div>
            <div className="hidden lg:flex flex-col justify-end w-1/4">
              {user && userFavorites && isFavorite(userFavorites, job.id) ? (
                <button
                  className="btn btn-outline btn-primary w-3/4 mb-4"
                  onClick={(e) => deleteOmBookmark({ e, user, jobId: job.id })}
                >
                  お気に入りから削除
                </button>
              ) : (
                <button
                  className="btn btn-outline btn-primary w-3/4 mb-4"
                  onClick={(e) => addOmBookmark({ e, user, jobId: job.id })}
                >
                  お気に入りに追加
                </button>
              )}
              <button className="btn btn-primary w-3/4" onClick={applyJobOffer}>
                応募する
              </button>
            </div>
          </div>

          <p className="bg-primary text-white px-2 py-3 w-full mt-10">
            仕事内容
          </p>
          <p className="mt-8">{job.job_description}</p>
          <p className="bg-primary text-white px-2 py-3 w-full mt-10">
            募集要項
          </p>
          <div className="border mt-8 p-8">
            <table className="table-fixed w-full mt-8 break-all">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">職種</th>
                  <td className="w-3/4 p-8">{job.job_type}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">雇用形態</th>
                  <td className="w-3/4 p-8">{job.hiring_system}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">給与</th>
                  <td className="w-3/4 p-8">
                    {job.salary_pattern}
                    {parseInt(job.salary_min).toLocaleString()}〜
                    {parseInt(job.salary_max).toLocaleString()}円
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">勤務地</th>
                  <td className="w-3/4 p-8">
                    {job.zip_code}
                    <br />
                    福岡県{job.city}
                    {job.building}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">勤務時間</th>
                  <td className="w-3/4 p-8">{job.work_time}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">休日・休暇</th>
                  <td className="w-3/4 p-8 ">{job.holiday_description}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">交通費</th>
                  <td className="w-3/4 p-8">
                    {job.travel_cost === "なし"
                      ? "支給なし"
                      : job.travel_cost_description}
                  </td>
                </tr>
                <tr>
                  <th className="w-1/4 text-left pl-4">試用・研修</th>
                  <td className="w-3/4 p-8">
                    {job.trial}
                    <br />
                    {job.trial_period}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:hidden bottom-0 fixed w-full flex justify-center bg-white bg-opacity-90 px-3 pt-8 pb-2">
          {user && userFavorites && isFavorite(userFavorites, job.id) ? (
            <button
              className="btn btn-outline btn-primary w-2/5 mr-3"
              onClick={(e) => deleteOmBookmark({ e, user, jobId: job.id })}
            >
              お気に入りから削除
            </button>
          ) : (
            <button
              className="btn btn-outline btn-primary w-2/5 mr-3"
              onClick={(e) => addOmBookmark({ e, user, jobId: job.id })}
            >
              お気に入りに追加
            </button>
          )}
          <button
            className="btn btn-primary w-2/5"
            onClick={() => router.push(`/apply/${job.id}`)}
          >
            応募する
          </button>
        </div>
      </section>
    </>
  );
};

export default jobOffer;

export const getStaticPaths: GetStaticPaths = async () => {
  const allPickupJobs = await axios
    // 要修正、ピックアップ全求人取得API
    .get("http://nginx:80/api/user/top")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    paths: allPickupJobs?.map(({ id }) => `/job/pickup/${id}`) ?? [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const job = await axios
    .get(`http://nginx:80/api/user/joboffer/${params.id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: { job: job ? job : null },
  };
};
