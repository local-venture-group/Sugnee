import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

// Contexts
import { AuthContext } from "../../contexts/Auth";

// Type
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { JobOffer } from "../../interfaces/job";
import { User } from "../../interfaces/user";

const apply: NextPage<{ job: JobOffer }> = ({ job }) => {
  const router = useRouter();
  const { user, applyOmJobOffer } = useContext(AuthContext);

  const applyJobOffer: (
    e: React.MouseEvent,
    user: User,
    job: JobOffer
  ) => Promise<void> = async (e, user, job) => {
    e.preventDefault();
    if (!user) alert("応募はログインが必要です");

    // Fリク求人応募ロジックは仕様確定後
    // OM求人応募仮ロジック
    if (job.type_of_job[0] === 2) {
      await applyOmJobOffer;
      return;
    }
  };

  if (!job) return null;
  return (
    <>
      <section id="hero">
        <p className="my-10 ml-10 text-xs text-gray-500">
          <Link href="/">TOP</Link>
          <span className="ml-2">&gt;</span>
          <span className="ml-2">
            <Link href={`/job/${job.id}`}>{job.company_name}</Link>
          </span>
          <span className="ml-2">&gt;</span>
          <span className="ml-2">応募確認</span>
        </p>
        <div className="hero h-96 bg-gradient-to-b from-primary to-secondary"></div>
      </section>
      <section id="body">
        <div className="container mx-auto mt-10 px-8 md:px-28">
          <p className="bg-primary text-white px-2 py-3 w-full mt-10">応募先</p>
          <div className="border mt-8 p-8">
            <table className="table-fixed w-full mt-8 break-all">
              <tbody>
                <tr className="border-b border-gray-300">
                  <th className="w-1/4 text-left pl-4">企業名</th>
                  <td className="w-3/4 p-8">{job.company_name}</td>
                </tr>
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
          {job.type_of_job[0] === 0 && (
            <p className="text-warning my-6">
              この求人はキャリアアドバイザー面談が必要です
            </p>
          )}
          {/* 一覧から外部リンクへとばすようなら分岐を削除 */}
          {job.type_of_job[0] === 3 ? (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent w-full mt-10"
            >
              応募ページへとぶ（外部リンク）
            </a>
          ) : (
            <button
              onClick={(e) => applyJobOffer(e, user, job)}
              className="btn btn-accent w-full mt-10"
            >
              応募する
            </button>
          )}
        </div>
        <div className="lg:hidden bottom-0 fixed w-full flex justify-center bg-white bg-opacity-90 px-3 pt-8 pb-2">
          <button
            onClick={(e) => applyJobOffer(e, user, job)}
            className="btn btn-accent w-10/12"
          >
            応募する
          </button>
        </div>
      </section>
    </>
  );
};

export default apply;

export const getStaticPaths: GetStaticPaths = async () => {
  const allPickupJobs = await axios
    .get("http://nginx:80/api/user/pickup")
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    paths: allPickupJobs?.map(({ id }) => `/apply/${id}`) ?? [],
    fallback: true,
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
