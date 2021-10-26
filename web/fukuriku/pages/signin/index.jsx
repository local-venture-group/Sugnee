import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

// contexts
import { AuthContext } from "../../contexts/Auth";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// components
import Button from "../../components/Button";

const signIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { user, login } = useContext(AuthContext);
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  if (user) router.push("/");

  const onSubmit = async (data) => {
    const res = await login(data);
    // 仮でログイン失敗はアラート表示
    // if (res) {
    //   router.push("/");
    //   return;
    // }
    // alert("ログイン失敗しました");
    router.push("/");
  };

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

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
            <h1 className="mt-6 text-5xl font-bold text-gray-900">LOG IN</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-12 pl-8">
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
                  {...register("email", { required: true })}
                  required
                />
              </div>
              <div className="w-full px-3 mb-6 mt-6 smd:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  password
                </label>
                <div className="relative">
                  <input
                    className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
                    id="password"
                    type={isRevealPassword ? "text" : "password"}
                    placeholder="パスワード"
                    {...register("password", { required: true })}
                    required
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
              </div>
              <div className="w-full px-3 my-12 smd:mb-0">
                <Button type={"submit"} text={"ログイン"} option={"w-full"} />
              </div>
            </form>
            <p>
              <Link href="/signup">
                <a className="mt-2 text-sm text-primary hover:text-gray-500">
                  会員登録がまだの方はこちらから新規登録
                </a>
              </Link>
            </p>
            <p>
              <Link href="/signin/forget">
                <a className="mt-2 text-sm text-primary hover:text-gray-500">
                  パスワードを忘れた方はこちら
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signIn;
