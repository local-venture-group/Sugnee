import { useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// contexts
import { AuthContext } from "../../../contexts/Auth";

// components
import Button from "../../../components/Button";

const forgetPassword = () => {
  const [isSend, setIsSend] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const emailInputRef = useRef();

  const sendPasswordResetEmail = async (e) => {
    e.preventDefault();
    const userEmail = emailInputRef.current.value;
    console.log(userEmail);
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
            <h1 className="mt-6 text-5xl font-bold text-gray-900">
              パスワードリセット
            </h1>
            {/* デザイン決定したら修正（成功したらモーダル表示にするかも） */}
            {isSend ? (
              <p className="my-8 text-sm">
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
                    <Button
                      type={"submit"}
                      text={"送信"}
                      option={"w-full"}
                      event={(e) => sendPasswordResetEmail(e)}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgetPassword;
