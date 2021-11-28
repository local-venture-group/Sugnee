import { FormEventHandler, useState } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Type
import { SignupFormData } from "../../../interfaces/user";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  FieldValues,
  FieldError,
} from "react-hook-form";
interface formProps {
  handleSubmit: UseFormHandleSubmit<SignupFormData>;
  signupSubmit: (props: SignupFormData) => void;
  register: UseFormRegister<FieldValues>;
  errors: {
    password?: FieldError;
    lastName?: FieldError;
    firstName?: FieldError;
    lastNameKana?: FieldError;
    firstNameKana?: FieldError;
    email?: FieldError;
    gender?: FieldError;
    passwordConfirm?: FieldError;
    terms?: FieldError;
  };
  watch: (props: string) => void;
}

const SignupForm: React.FC<formProps> = (props) => {
  const { handleSubmit, signupSubmit, register, errors, watch } = props;
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
    <form onSubmit={handleSubmit(signupSubmit)}>
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
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="lastNameKana"
          >
            姓（フリガナ）
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="lastNameKana"
            type="text"
            placeholder="セイ"
            {...register("lastNameKana", {
              required: true,
              pattern: /^[^0-9]+$/,
            })}
          />
          {errors.lastNameKana?.type === "required" && (
            <p className="text-red-500 text-xs italic">姓は必須です</p>
          )}
          {errors.lastNameKana?.type === "pattern" && (
            <p className="text-red-500 text-xs italic">数字は入力できません</p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="firstNameKana"
          >
            名（フリガナ）
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:bg-gray-200"
            id="firstNameKana"
            type="text"
            placeholder="メイ"
            {...register("firstNameKana", {
              required: true,
              pattern: /^[^0-9]+$/,
            })}
          />
          {errors.firstNameKana?.type === "required" && (
            <p className="text-red-500 text-xs italic">名は必須です</p>
          )}
          {errors.firstNameKana?.type === "pattern" && (
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
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="terms"
          >
            利用規約
          </label>
          <div className="w-full text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight overflow-y-scroll h-32">
            <p className="leading-6 text-sm">
              {/* 内容決定次第差し替え */}
              第1条（本規約）
              <br />
              本規約は、「ユーザー」と株式会社熊本日日新聞社、リクルーティング・パートナーズ株式会社（以下それぞれ「熊本日日新聞社」、「リクルーティング・パートナーズ」といいます。）の間の、「本サービス」の利用に係る一切の関係に適用されます。ユーザーは、本規約の定めに従って本サービスを利用してください。なお、本サービスにおいて本規約とは別に個別の利用規約（以下、本規約と個別の利用規約を合わせて「本規約等」といいます。）がある場合には、ユーザーは本規約等に従って本サービスを利用しなければなりません。
              <br />
              第2条（定義）
              <br />
              本規約において、以下の用語は以下に定める意味を有するものとします。
              <br />
              （1）「本サービス」とは、熊本日日新聞社、リクルーティング・パートナーズの運営する「くまリク」と称するウェブサービス又はアプリケーションサービスをいいます。
              <br />
              （2）「ユーザー」とは、本規約に同意の上で本サービスを利用する方をいいます。
              （3）「提携事業者」とは、熊本日日新聞社、リクルーティング・パートナーズと提携し本サービスを通じ求人を行う、個人又は法人をいいます。{" "}
              <br />
              第3条（会員登録） <br />
              1
              本規約等のすべてに同意した上で所定の会員登録手続きをすることにより、ユーザーと熊本日日新聞社、リクルーティング・パートナーズとの間で本規約等の定めを内容とする本サービスの利用に関する契約が成立したものとみなします。なお、所定の会員登録手続きをしない場合であっても、本規約等のすべてに同意したうえで本サービスの利用申し込みをされた場合は、本規約等の定めを内容とする本サービスの利用に関する契約が成立したものとみなします。
              <br />
              2
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーにＩＤ及びパスワードを発行して、これを通知します。熊本日日新聞社、リクルーティング・パートナーズは、ユーザーにＩＤ及びパスワードを発行して、これを通知します。ユーザーは、自己のID及びパスワードを、自己の責任で管理しなければなりません。なお、熊本日日新聞社、リクルーティング・パートナーズは、ユーザーのID及びパスワードを利用して行われた一切の行為を、ユーザーによる行為とみなすことができます。ユーザーによるＩＤ及びパスワードの管理不十分、使用上の過誤、不正使用等によってユーザーが損害を被ったとしても、熊本日日新聞社、リクルーティング・パートナーズは一切責任を負わないものとします。
              <br />
              3
              会員登録内容に変更が生じた場合は、速やかに登録を変更してください。登録情報の変更がなされなかったことによりユーザーに生じた損害について、熊本日日新聞社、リクルーティング・パートナーズは一切の責任を負いません。
              <br />
              4
              ユーザーの本サービスの利用権は、理由を問わず、アカウントの削除をもって消滅します。
              <br />
              5
              自身のアカウント及び当該アカウントに基づく本サービスの利用権は、第三者に譲渡、貸与又は相続させることはできません。
              <br />
              第4条（本サービス） <br />
              1
              本サービスは、ユーザーが熊本日日新聞社、リクルーティング・パートナーズ所定の方法により提携事業者への採用応募を行うことができるサービスです。
              <br />
              2
              熊本日日新聞社、リクルーティング・パートナーズは、本サービスを利用するために必要なソフトウェアがある場合には、これをユーザーに提供し、その利用を許諾します。熊本日日新聞社、リクルーティング・パートナーズが提供するソフトウェアは
              本サービスの一部を構成するものであり、本規約等における本サービスの利用に関する定めは、当該ソフトウェアの利用にも適用されます。また、熊本日日新聞社、リクルーティング・パートナーズは、熊本日日新聞社、リクルーティング・パートナーズが提供するソフトウェアのバージョンを最新の状態に保つために、ユーザーへの通知なく適宜、自動又は手動のアップデートを提供する場合があります。なお、熊本日日新聞社、リクルーティング・パートナーズは他社の運営するアプリケーションプラットフォーム上でソフトウェアを提供する場合があり、その場合、ユーザーは、ソフトウェアをダウンロードするためには当該アプリケーションプラットフォームの利用資格を有していなければならず、また、その利用規約も遵守する必要があります。
              によるＩＤ及びパスワードの管理不十分、使用上の過誤、不正使用等によってユーザーが損害を被ったとしても、熊本日日新聞社、リクルーティング・パートナーズは一切責任を負わないものとします。
              <br />
              3
              ユーザーは、自らの費用と責任で、前項のソフトウェア等のダウンロードを行うものとします。前項のソフトウェアのインストールや利用に関してユーザーに損害が生じても、熊本日日新聞社、リクルーティング・パートナーズは、熊本日日新聞社、リクルーティング・パートナーズが悪意であった場合を除き、予見できたか否かを問わず、一切の責任（債務不履行、原状回復義務、不当利得、不法行為、その他いかなる法理論に基づく責任も含みます）を負いません。
              <br />
              4
              ユーザーの本サービス本サービスを利用するために必要な電子機器（パソコン、スマートフォンなど）、ソフトウェア（OS、アプリケーション、ブラウザなど）、及びインターネット接続環境に関しては、ユーザーが自らの責任と費用で用意するものとします。の利用権は、理由を問わず、アカウントの削除をもって消滅します。
              <br />
              第5条（個人情報等の取扱い） 1
              本サービスの利用において熊本日日新聞社、リクルーティング・パートナーズが取得したユーザーの情報について、熊本日日新聞社、リクルーティング・パートナーズは、本規約等及び別途定める熊本日日新聞社、リクルーティング・パートナーズのプライバシーポリシーに従って取り扱うものとし、ユーザーはこれに同意するものとします。
              <br />
              2
              ユーザーは、熊本日日新聞社、リクルーティング・パートナーズが、ユーザーの個人情報（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含む）を次の目的で収集・利用すること、また次の目的のために提携事業者と共同利用することに同意します。
              <br />
              （1）
              本サービスの提供上必要な事項の通知又は連絡（電子メールによる場合を含みます。以下同じ。）のため
              <br />
              （2）
              本サービスに関する各種問い合わせ対応（ご本人確認等）又はアフターサービス等のため
              <br />
              （3）
              ユーザーのアカウントの管理（ログイン機能の提供、登録や応募に従ったリマインドの実施等）のため
              <br />
              （4）
              本サービスの品質向上、マーケティングデータの収集・分析、新たな商品等の開発・検討のため
              <br />
              （5） メールマガジンやキャンペーン等のお得な案内の配信のため
              <br />
              （6） 前各号の目的達成に付随関連する目的を達成するため
              <br /> 3
              ユーザーは、熊本日日新聞社、リクルーティング・パートナーズが、個人を特定することのできないユーザーに関する情報（端末情報、IPアドレス、Cookieを利用して取得する行動履歴等。以下「端末情報等」といいます。）を次の各号の目的で収集・利用することに同意します。
              <br />
              （1） 本サービスにおける各種機能又はサービスの提供のため
              <br />
              （2） 最適な広告を配信するため
              <br />
              （3） 広告効果の測定及びその結果の広告主への報告のため
              <br /> （4）
              本サービスの品質向上、マーケティングデータの収集・分析、新たな商品等の開発・検討のため
              <br />
              4
              熊本日日新聞社、リクルーティング・パートナーズ及び提携事業者は、熊本日日新聞社、リクルーティング・パートナーズが取得した個人情報（氏名、住所、氏名、年齢、生年月日、連絡先等）及び応募情報、閲覧状況、端末情報等を、第2項及び第3項に掲げる目的のために共同利用し、ユーザーの同意なく第2項及び第3項に掲げる目的外での収集及び利用をいたしません。かかる個人情報及び端末情報等の管理については、リクルーティング・パートナーズが責任を有するものとします。
              <br />
              5
              熊本日日新聞社、リクルーティング・パートナーズは、第2項及び第3項記載の目的の達成に必要な範囲内で個人情報及び端末情報等の取扱いを第三者に委託することがあります。また、法令の定めに基づき個人情報及び端末情報等を開示又は提供することがあります。これらの場合、開示に際し都度ユーザーの同意の取得はいたしません。
              <br />
              第6条（本サービスに関する権利）
              <br />
              本サービス及び本サービスにおいて提供するコンテンツの著作権、商標権その他の知的財産権は、熊本日日新聞社、リクルーティング・パートナーズ又は熊本日日新聞社、リクルーティング・パートナーズに対し権利を許諾する者に帰属します。本規約等に基づく熊本日日新聞社、リクルーティング・パートナーズとユーザーとの本サービスに関する契約の締結は、ユーザーに対する何らの権利移転等を意味するものではありません。
              <br />
              第7条 （禁止事項）
              <br />
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーによる次の各号のいずれかの事由に該当する行為、又はそのおそれのある行為を禁止します。
              <br />
              （1）
              熊本日日新聞社、リクルーティング・パートナーズ、提携事業者、他のユーザー又は第三者の著作権、肖像権、プライバシー等の第三者の権利を侵害する行為。
              <br />
              （2）
              熊本日日新聞社、リクルーティング・パートナーズ、提携事業者、他のユーザー又は第三者を誹謗・中傷若しくは侮辱する行為、又は第三者の名誉若しくは信用を傷つける行為。
              <br />
              （3）
              熊本日日新聞社、リクルーティング・パートナーズの許諾なく、営利の目的で本サービスを利用する行為。
              <br />
              （4）
              他人のアカウント情報等を借用して他人になりすまして本サービスを利用し、又はコンピュータ若しくはシステム等に侵入する行為。
              <br />
              （5）
              本サービス及びその他熊本日日新聞社、リクルーティング・パートナーズが提供するサービスの運営を妨げる行為。
              <br />
              （6） 公序良俗に反する行為。
              <br />
              （7） 反社会的勢力との関係をもつ行為。
              <br />
              （8）
              その他、法令に抵触する行為又は熊本日日新聞社、リクルーティング・パートナーズが不適切と判断する行為。
              <br />
              第8条 （利用停止等）
              <br /> 1
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーが次の各号のいずれかの事由に該当する場合、又はそのおそれがあると熊本日日新聞社、リクルーティング・パートナーズが判断した場合、ユーザーへ事前に通告・催告することなく、かつ、ユーザーの承諾を得ずに、熊本日日新聞社、リクルーティング・パートナーズの裁量によりただちにユーザーによる本サービスの利用を停止、又は会員の登録の取り消し等をすることができます。なお、熊本日日新聞社、リクルーティング・パートナーズはこれらの理由を説明する義務を負いません。
              <br />
              （1） 前条の禁止事項その他本規約等のいずれかの条項に違反した場合
              <br />
              （2） 他人又は架空の個人情報を使って会員登録をした場合
              <br />
              （3） 本サービスの運営を妨害した場合
              <br />
              （4）
              熊本日日新聞社、リクルーティング・パートナーズ又は提携事業者へ長時間の架電若しくは同様な問い合わせの繰り返しを過度に行い、又は義務や理由のないことを熊本日日新聞社、リクルーティング・パートナーズ又は提携事業者へ強要し、熊本日日新聞社、リクルーティング・パートナーズ又は提携事業者の業務に著しく支障をきたした場合
              <br />
              （5） 不正行為が確認された場合
              <br />
              （6）
              その他熊本日日新聞社、リクルーティング・パートナーズがユーザーによる本サービスの利用を不適当と判断する事態が生じた場合
              <br />2
              前項の場合において、熊本日日新聞社、リクルーティング・パートナーズがユーザーによる本サービスの利用を停止又は会員登録の取り消し等をしたことにより、当該ユーザーに生じた不利益、損害について、熊本日日新聞社、リクルーティング・パートナーズは一切の責任を負いません。また、前項のいずれかの項目に該当することにより熊本日日新聞社、リクルーティング・パートナーズ又は第三者が損害を被った場合、ユーザーは熊本日日新聞社、リクルーティング・パートナーズ又は第三者が被った損害を賠償しなければなりません。
              第9条（本サービスの停止・中止・変更・終了
              <br /> 1
              熊本日日新聞社、リクルーティング・パートナーズは、熊本日日新聞社、リクルーティング・パートナーズの判断で、次の各号の事由により本サービスの全部又は一部を停止又は中止することができるものとします。
              <br />
              （1）
              熊本日日新聞社、リクルーティング・パートナーズ又は熊本日日新聞社、リクルーティング・パートナーズが本サービスを提供するために利用する他の事業者のプラットフォームが、定期的又は緊急に、サーバー、ソフトウェア等の点検、修理、補修、改良等を行う場合
              <br />
              （2） コンピュータ、通信回線等の事故、障害のある場合
              <br />
              （3）
              火災・停電、天災地変等の非常事態により本サービスの運営が不能となった場合
              <br />
              （4）
              戦争、内乱、暴動、労働争議等により、本サービスの運営が不能となった場合
              <br />
              （5）
              その他、熊本日日新聞社、リクルーティング・パートナーズが止むを得ないと判断した場合
              <br />
              2
              熊本日日新聞社、リクルーティング・パートナーズは、いつでも本サービスの全部又は一部を終了することができるものとします。
              <br />
              3
              前3項により本サービスの運用を停止、中止、変更又は終了する場合、熊本日日新聞社、リクルーティング・パートナーズは、合理的に必要と判断される範囲で事前にユーザーに対し通知するものとします。ただし、緊急の場合にはこの限りではありません。
              <br />
              4
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーに対し、本条に基づく本サービスの停止、中止、変更又は終了に起因又は関連して生じた損害について、何らの責任も負わないものとします。
              <br />
              第10条 （免責）
              <br /> 1
              熊本日日新聞社、リクルーティング・パートナーズは提携事業者が掲載する情報について、有用性、最新性、適切性、特定目的への適合性等について何ら保証を行いません。
              <br />
              2
              本サービスにかかるウェブサイトに掲示される提携事業者の情報に関連して、ユーザーに生じた損害について、熊本日日新聞社、リクルーティング・パートナーズは何ら責任を負いません。
              <br />
              3
              ユーザーによる登録誤り又は登録漏れによる応募遅延又は不達、若しくは応募不能等について、熊本日日新聞社、リクルーティング・パートナーズは何ら責任を負わないものとします。
              <br />
              4
              本サービスでは、ユーザーのお名前、住所等の個人情報の登録を要します。ユーザーは、通信時のセキュリティ確保のため、最新のブラウザのインストール、セキュリティソフトの利用等を自己の費用と責任において行うものとします。本サービスでは通信時の安全確保のためSSLを用いた暗号化、その他必要と判断されるセキュリティ対策を施しておりますが、通信時の安全性の保証を行うものではありません。
              <br />5
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーが本サービスを利用する際に使用するいかなる機器、ソフトウェアについても、その動作保証を行うものではありません。
              <br />
              6
              熊本日日新聞社、リクルーティング・パートナーズは、本サービスの利用又は利用できなかったことにより発生したユーザーの損害に対し、いかなる責任も負わず、当該損害の賠償をする義務も負いません。ただし、当該損害が熊本日日新聞社、リクルーティング・パートナーズの故意又は重過失により発生した場合には、この限りではありません。
              <br />
              7
              本サービスの利用に関して万一トラブルが生じた際には、ユーザー自身の責任ですみやかに解決するものとします。
              <br />
              8
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーが本サービスの利用により、又は本サービス上に掲載されている広告等よりリンクする外部サイトの事業者等より何らかの処分を受けた場合等の損害について、何らの責任も負わないものとします
              <br />
              9
              熊本日日新聞社、リクルーティング・パートナーズは、ユーザーに対し、本サービスの停止、中止、変更又は終了に起因又は関連して生じた損害について、何らの責任も負わないものとします。
              <br />
              第11条 （本規約の変更）
              <br />
              熊本日日新聞社、リクルーティング・パートナーズは、熊本日日新聞社、リクルーティング・パートナーズの判断によりユーザーの承諾なく随時、本規約等を変更できるものとし、本サービス上に掲載する方法によって、利用者へ通知します。熊本日日新聞社、リクルーティング・パートナーズは、本規約等の変更以降におけるユーザーの本サービスの利用をもって、ユーザーは変更後の本規約等を承諾したものとみなします。なお、本規約等の変更によるユーザへの影響が大きいと判断される場合には、変更後の本規約等を事前にユーザーへ告知のうえで効力発生日より変更するものとします。
              <br />
              第12条 （準拠法）
              <br /> 本規約は、日本法を準拠法として規定されています。
              <br />
              第13条 （裁判管轄）
              <br />
              本サービスに関する一切の紛争について、訴額に応じて福岡地方裁判所又は福岡簡易裁判所をもって、第一審の専属的合意管轄裁判所とします。
              <br />
              2020年8月31日 制定
            </p>
          </div>
          <div className="text-center">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: true })}
            />
            <span className="ml-3 text-gray-700 font-bold">
              利用規約に同意する
            </span>
            {errors.terms?.type === "required" && (
              <p className="text-red-500 text-xs italic">
                利用規約への同意は必須です
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full"
        type="submit"
      >
        入力内容確認
      </button>
    </form>
  );
};

export default SignupForm;
