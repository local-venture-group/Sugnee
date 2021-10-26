import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";

// contexts
import { AuthContext } from "../../contexts/Auth";

// components
import Button from "../../components/Button";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const password = () => {
  const [reset, setReset] = useState(false);
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealPasswordConfirm, setIsRevealPasswordConfirm] = useState(false);
  const router = useRouter();
  const params = router.query;

  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const watchPassword = watch("password");

  const resetPassword = async (data) => {
    await axios
      .post("http://localhost/api/user/password/reset", {
        email: params.email,
        token: params.token,
        password: data.password,
        password_confirmation: data.passwordConfirm,
      })
      .then((res) => {
        if (res.status === 200 && res.data.success) {
          console.log("[resetPassword]パスワードリセット成功");
          setReset(true);
        } else {
          // tokenが異なる（successがfalse）の場合
          console.log("[resetPassword]パスワードリセット失敗");
          alert(
            "パスワードリセット失敗しました。お手数ですが再度リセット用メールの送信からやり直してください。"
          );
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[resetPassword]パスワードリセット失敗");
      });
  };

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  const togglePasswordConfirm = () => {
    setIsRevealPasswordConfirm((prevState) => !prevState);
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
            {reset ? (
              <>
                <p className="my-8 text-sm">
                  パスワードリセット完了しました。
                  <br />
                  新しいパスワードでログインしてください。
                </p>

                <Button
                  type={"button"}
                  text={"ログイン"}
                  option={"w-full"}
                  event={() => router.push("/signin")}
                />
              </>
            ) : (
              <>
                <p className="my-8 text-sm">
                  新しいパスワードを入力してください。
                </p>
                <form onSubmit={handleSubmit(resetPassword)}>
                  <div className="w-full px-3 mb-6">
                    <label
                      className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      新しいパスワード
                    </label>
                    <div className="relative">
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
                        id="password"
                        type={isRevealPassword ? "text" : "password"}
                        placeholder="パスワード"
                        {...register("password", {
                          required: true,
                          pattern:
                            /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/,
                        })}
                      />
                      <div
                        onClick={togglePassword}
                        role="presentation"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {isRevealPassword ? (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="hover:text-primary"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="hover:text-primary"
                          />
                        )}
                      </div>
                    </div>

                    {errors.password?.type === "required" && (
                      <p className="text-red-500 text-xs italic">必須です</p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-500 text-xs italic">
                        8文字以上の半角英数字（大文字小文字数字を各1文字ずつ含む）で入力してください
                      </p>
                    )}
                  </div>
                  <div className="w-full px-3 mb-6">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="passwordConfirm"
                    >
                      新しいパスワード（確認用）
                    </label>
                    <div className="relative">
                      <input
                        className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
                        id="passwordConfirm"
                        type={isRevealPasswordConfirm ? "text" : "password"}
                        placeholder="パスワード（確認用）"
                        {...register("passwordConfirm", {
                          required: "パスワード（確認用）は必須です",
                          validate: (value) =>
                            value === watchPassword ||
                            "パスワードが一致していません",
                        })}
                      />
                      <div
                        onClick={togglePasswordConfirm}
                        role="presentation"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {isRevealPasswordConfirm ? (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="hover:text-primary"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="hover:text-primary"
                          />
                        )}
                      </div>
                    </div>
                    {errors.passwordConfirm && (
                      <p className="text-red-500 text-xs italic">
                        {errors.passwordConfirm.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-20">
                    <Button
                      type={"submit"}
                      text={"パスワードを再設定する"}
                      option={"w-full"}
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

export default password;
