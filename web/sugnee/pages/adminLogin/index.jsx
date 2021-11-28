import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

// Contexts
import { AuthContext } from "../../contexts/Auth";
import { AdminContext } from "../../contexts/Admin";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const adminLogin = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const { adminLogin } = useContext(AdminContext);
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
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
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="text-center mb-12">
              <h1 className="mt-6 text-5xl font-bold text-gray-900">
                ADMIN LOGIN
              </h1>
              <form
                onSubmit={handleSubmit((data) => adminLogin(data))}
                className="mt-12 pl-8"
              >
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
                <button
                  type="submit"
                  className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full"
                >
                  ログイン
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminLogin;
