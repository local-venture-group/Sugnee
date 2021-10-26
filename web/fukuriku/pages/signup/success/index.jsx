import { useRouter } from "next/router";

// components
import Button from "../../../components/Button";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

const signupSuccess = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center px-6 my-10">
        <div
          className="w-full h-auto hidden lg:block lg:w-1/2 rounded-l-lg"
          style={{
            backgroundImage:
              "url(" +
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1" +
              ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div className="text-center mb-12">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-primary hover:text-primary"
              size="5x"
            />
            <h1 className="text-2xl mb-6">会員登録完了しました</h1>
            <p className="text-sm mb-10">
              登録完了メールを送信しています。
              <br />
              ご確認ください。
            </p>
            <Button
              type={"button"}
              text={"ログイン"}
              option={"w-full"}
              event={() => router.push("/signin")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default signupSuccess;
