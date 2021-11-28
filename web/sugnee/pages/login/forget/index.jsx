import { useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Contexts
import { AuthContext } from "../../../contexts/Auth";

const forgetPassword = () => {
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const emailInputRef = useRef();

  const sendPasswordResetEmail = async (e) => {
    e.preventDefault();
    const userEmail = emailInputRef.current.value;
    await axios
      .post("http://localhost/api/user/password/request", {
        email: userEmail,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("[sendResetPasswordEmail]PWリセットメール送信成功");
          setIsSend(true);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[sendResetPasswordEmail]PWリセットメールリクエスト失敗");
      });
  };

  if (user) router.push("/");
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
          <div className="w-full lg:w-1/2 bg-white px-5 py-24 rounded-lg lg:rounded-l-none">
            <div className="text-center mb-12">
              <h1 className="mt-6 text-5xl font-bold text-gray-900">
                パスワードリセット
              </h1>
              {/* デザイン決定したら修正（成功したらモーダル表示にするかも） */}
              {isSend ? (
                <p className="my-24 text-sm">
                  ご入力いただいたメールアドレスに
                  <br />
                  パスワードリセット用のメールを送信しました。
                  <br />
                  メールをご確認ください。
                </p>
              ) : (
                <>
                  <p className="my-8 text-sm">
                    メールアドレスを入力の上、送信ボタンを押してください。
                    <br />
                    パスワードリセット用のメールをお送りします。
                  </p>
                  <form>
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        ref={emailInputRef}
                        required
                      />
                    </div>
                    <div className="w-full px-3 my-12 smd:mb-0">
                      <button
                        className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full"
                        type="submit"
                        onClick={(e) => sendPasswordResetEmail(e)}
                      >
                        送信
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgetPassword;
