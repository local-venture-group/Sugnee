export default function SignupConfirmation(props) {
  const { formData, onClickBack, signup } = props;

  return (
    <div>
      <h3 className="text-center mb-6">入力内容確認</h3>
      <div className="flex flex-wrap -mx-3 mb-6">
        <ul className="w-full steps mb-10">
          <li className="step step-primary">必要事項入力</li>
          <li className="step step-primary">入力内容確認</li>
          <li className="step">登録完了</li>
        </ul>
        <div className="w-full px-3 my-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            氏名
          </label>
          {formData.lastName}
          {formData.firstName}
        </div>
        <div className="w-full px-3 my-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            メールアドレス
          </label>
          {formData.email}
        </div>
        <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="birthday"
          >
            生年月日
          </label>
          {formData.birthYear}年{formData.birthMonth}月{formData.birthDay}日
        </div>
        <div className="w-full px-3 my-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="gender"
          >
            性別
          </label>
          {formData.gender === 1 ? "男性" : "女性"}
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full mb-3"
          type="submit"
          onClick={() => signup(formData)}
        >
          登録する
        </button>
        <button
          className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full mb-3"
          type="button"
          onClick={onClickBack}
        >
          修正する
        </button>
      </div>
    </div>
  );
}
