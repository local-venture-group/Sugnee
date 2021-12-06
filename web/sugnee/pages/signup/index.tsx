import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

// Components
import SignupForm from "../../components/SignupForm/user";
import SignupConfirmation from "../../components/SignupConfirmation/user";

// Contexts
import { AuthContext } from "../../contexts/Auth/index";

// Type
import { NextPage } from "next";
import { SignupFormData } from "../../interfaces/user";

const signUp: NextPage = () => {
  const [formData, setFormData] = useState<SignupFormData>();
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { user, signup } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = useForm<SignupFormData>();

  const signupSubmit = async (data) => {
    setFormData({ ...data, gender: parseInt(data.gender) });
    setIsConfirmed(true);
  };

  const onClickBack = () => {
    setIsConfirmed(false);
  };

  if (user) router.push("/");

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 py-14">
          <div
            className="w-full h-auto hidden bg-white lg:block lg:w-1/2 rounded-l-lg"
            style={{
              backgroundImage: "url(" + "/images/signup.svg" + ")",
              backgroundPosition: "bottom",
              backgroundSize: "550px",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="text-center mb-12">
              <h1 className="mt-6 text-5xl font-bold text-gray-900">SIGN UP</h1>
              <p className="mt-2 text-sm text-gray-500">
                必要項目入力の上、入力内容確認へ進んでください。
              </p>
              <Link href="/login">
                <a className="mt-2 text-sm text-indigo-500 hover:text-gray-500">
                  すでに登録済みの方はこちらからログイン
                </a>
              </Link>
            </div>
            {isConfirmed ? (
              <SignupConfirmation
                formData={formData}
                onClickBack={onClickBack}
                signup={signup}
              />
            ) : (
              <SignupForm
                handleSubmit={handleSubmit}
                signupSubmit={signupSubmit}
                register={register}
                errors={errors}
                watch={watch}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default signUp;
