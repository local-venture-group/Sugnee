import { useRouter } from "next/router";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const signupSuccess = () => {
  const router = useRouter();

  return (
    <div className="h-screen bg-gradient-to-b from-primary to-secondary">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 py-24">
          <div
            className="w-full hidden bg-white lg:block lg:w-1/2 rounded-l-lg"
            style={{
              backgroundImage: "url(" + "/images/signup.svg" + ")",
              backgroundPosition: "bottom",
              backgroundSize: "550px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="w-full lg:w-1/2 py-32 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-primary hover:text-primary mb-5"
                size="5x"
              />
              <h1 className="text-3xl text-primary mb-24">
                会員登録完了しました
              </h1>
              <p className="mb-32">
                登録完了メールを送信しています。
                <br />
                ご確認ください。
              </p>
              <button
                className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full mb-3"
                type="button"
                onClick={() => router.push("/login")}
              >
                ログイン
              </button>
              <button
                className="btn btn-outline btn-primary rounded-xl w-full"
                type="button"
                onClick={() => router.push("/")}
              >
                TOPへもどる
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signupSuccess;
