import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useContext } from "react";

import { AuthContext } from "../../contexts/Auth";
import { AdminContext } from "../../contexts/Admin";

const admin = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const { adminLogin } = useContext(AdminContext);

  const onSubmit = async (data) => {
    await adminLogin(data);
    router.push("/admin");
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
              ADMIN LOGIN
            </h1>
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
                <input
                  className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
                  id="password"
                  type="password"
                  placeholder="パスワード"
                  {...register("password", { required: true })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full my-16 flex justify-center bg-gradient-to-r from-gray-500 to-gray-800  hover:bg-gradient-to-l hover:from-gray-500 hover:to-gray-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
              >
                ログイン
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default admin;
