import { useRouter } from "next/router";
import Link from "next/link";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

// Type
import { NextPage } from "next";

const applySuccess: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <section id="hero">
        <p className="my-10 ml-10 text-xs text-gray-500">
          <Link href="/">TOP</Link>
          <span className="ml-2">&gt;</span>
          <span className="ml-2">応募完了</span>
        </p>
        <div className="hero h-96 bg-gradient-to-b from-primary to-secondary"></div>
      </section>
      <section id="body">
        <div className="container mx-auto text-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-primary hover:text-primary mt-20"
            size="5x"
          />
          <h1 className="text-3xl text-primary my-10">応募完了しました</h1>
          <p className="mb-16">
            登録メールアドレスに応募完了メールをお送りしていますので、ご確認ください。
          </p>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => router.push("/")}
          >
            TOPにもどる
          </button>
        </div>
      </section>
    </>
  );
};

export default applySuccess;
