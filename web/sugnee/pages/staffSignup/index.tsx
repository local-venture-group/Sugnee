import Link from "next/link";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

// Components
import StaffSignupForm from "../../components/SignupForm/staff";
import StaffSignupConfirmation from "../../components/SignupConfirmation/staff";

// Contexts
import { StaffContext } from "../../contexts/Staff";

// Types
import { NextPage } from "next";
import { SignupFormData } from "../../interfaces/staff";

const signUp: NextPage = () => {
  const [formData, setFormData] = useState<SignupFormData>();
  const [isConfirmed, setIsConfirmed] = useState<Boolean>(false);
  const { staff, staffSignup } = useContext(StaffContext);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignupFormData>();

  const onSubmit = (data) => {
    setFormData(data);
    setIsConfirmed(true);
  };

  const onClickBack = () => {
    setIsConfirmed(false);
  };

  console.log("どう", staff);

  // userやadminだった場合も追加予定
  if (staff) router.push("/staff");
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
          <div className="w-full lg:w-1/2 bg-white p-20 rounded-lg lg:rounded-l-none">
            <div className="text-center mb-12">
              <h1 className="mt-6 text-5xl font-bold text-gray-900">
                COMPANY SIGN UP
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                必要項目入力の上、入力内容確認へ進んでください。
              </p>
              <Link href="/staffLogin">
                <a className="mt-2 text-sm text-indigo-500 hover:text-gray-500">
                  すでに登録済みのご担当者様はこちらからログイン
                </a>
              </Link>
            </div>
            {isConfirmed ? (
              <StaffSignupConfirmation
                formData={formData}
                onClickBack={onClickBack}
                staffSignup={staffSignup}
              />
            ) : (
              <StaffSignupForm
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
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
