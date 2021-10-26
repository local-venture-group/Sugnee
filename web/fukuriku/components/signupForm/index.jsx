import { useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// components
import Button from "../Button";

export default function SignupForm(props) {
  const { handleSubmit, onSubmit, register, errors, watch } = props;
  const watchPassword = watch("password");
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealPasswordConfirm, setIsRevealPasswordConfirm] = useState(false);

  const setYear = () => {
    const years = [];
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      years.push(
        <option key={`year_${i}`} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };
  const setMonth = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(
        <option key={`month_${i}`} value={i}>
          {i}
        </option>
      );
    }
    return months;
  };
  const setDay = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <option key={`month_${i}`} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  };

  const togglePasswordConfirm = () => {
    setIsRevealPasswordConfirm((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <ul className="w-full steps mb-10">
          <li className="step step-primary">必要事項入力</li>
          <li className="step">入力内容確認</li>
          <li className="step">登録完了</li>
        </ul>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="lastName"
          >
            姓
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="lastName"
            type="text"
            placeholder="姓"
            {...register("lastName", {
              required: true,
              pattern: /^[^0-9]+$/,
            })}
          />
          {errors.lastName?.type === "required" && (
            <p className="text-red-500 text-xs italic">姓は必須です</p>
          )}
          {errors.lastName?.type === "pattern" && (
            <p className="text-red-500 text-xs italic">数字は入力できません</p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="firstName"
          >
            名
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="firstName"
            type="text"
            placeholder="名"
            {...register("firstName", { required: true, pattern: /^[^0-9]+$/ })}
          />
          {errors.firstName?.type === "required" && (
            <p className="text-red-500 text-xs italic">名は必須です</p>
          )}
          {errors.firstName?.type === "pattern" && (
            <p className="text-red-500 text-xs italic">数字は入力できません</p>
          )}
        </div>
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            メールアドレス
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-xs italic">
              メールアドレスは必須です
            </p>
          )}
        </div>
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="gender"
          >
            生年月日
          </label>
          <div className="w-full flex">
            <select
              id="birthYear"
              name="birthYear"
              {...register("birthYear")}
              className="select block w-1/4 text-gray-700 border border-gray-500 rounded cursor-default py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            >
              {setYear()}
            </select>
            <span className="w-1/12 text-center inline-block align-bottom">
              年
            </span>
            <select
              id="birthMonth"
              name="birthMonth"
              {...register("birthMonth")}
              className="select block w-1/4 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            >
              {setMonth()}
            </select>
            <span className="w-1/12 text-center inline-block align-bottom">
              月
            </span>
            <select
              id="birthDay"
              name="birthDay"
              {...register("birthDay")}
              className="select block w-1/4 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            >
              {setDay()}
            </select>
            <span className="w-1/12 text-center inline-block align-bottom">
              日
            </span>
          </div>
        </div>
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6"
            htmlFor="gender"
          >
            性別
          </label>
          <input
            type="radio"
            name="gender"
            value={1}
            className="radio radio-xs"
            {...register("gender", { required: true })}
          />
          <span className="ml-2 mr-5">男性</span>
          <input
            type="radio"
            name="gender"
            value={2}
            className="radio radio-xs"
            {...register("gender", { required: true })}
          />
          <span className="ml-2">女性</span>
          {errors.gender?.type === "required" && (
            <p className="text-red-500 text-xs italic">性別は必須です</p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 relative">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="password"
          >
            パスワード
          </label>
          <div className="relative">
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
              id="password"
              type={isRevealPassword ? "text" : "password"}
              placeholder="パスワード"
              {...register("password", {
                required: true,
                pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/,
              })}
            />
            <div
              onClick={togglePassword}
              role="presentation"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {isRevealPassword ? (
                <FontAwesomeIcon icon={faEye} className="hover:text-primary" />
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
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="passwordConfirm"
          >
            パスワード（確認用）
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
                  value === watchPassword || "パスワードが一致していません",
              })}
            />
            <div
              onClick={togglePasswordConfirm}
              role="presentation"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {isRevealPasswordConfirm ? (
                <FontAwesomeIcon icon={faEye} className="hover:text-primary" />
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
      </div>
      <Button type={"submit"} text={"入力内容確認"} option={"w-full"} />
    </form>
  );
}
