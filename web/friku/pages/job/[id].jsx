import axios from "axios";

import { handleDate } from "../../utils";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faYenSign,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function pickUpJobOffer({ job }) {
  return (
    <>
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
                  {job.salary_min}円〜{job.salary_max}円
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
            <button className="btn btn-outline btn-primary w-3/4 mb-4">
              お気に入りに追加
            </button>
            <button className="btn btn-primary w-3/4">応募する</button>
          </div>
        </div>

        <p className="bg-primary text-white px-2 py-3 w-full mt-10">仕事内容</p>
        <p className="mt-8">{job.job_description}</p>
        <p className="bg-primary text-white px-2 py-3 w-full mt-10">募集要項</p>
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
                  {job.salary_min}円〜{job.salary_max}円
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
        <button className="btn btn-outline w-2/5 mr-2">お気に入りに追加</button>
        <button className="btn w-2/5">応募する</button>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const allPickupJobs = await axios
    .get("http://nginx:80/api/user/pickup")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    paths: allPickupJobs?.map(({ id }) => `/jobOffer/job/${id}`) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const job = await axios
    .get(`http://nginx:80/api/user/joboffer/${params.id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: { job: job ? job : null },
  };
}
