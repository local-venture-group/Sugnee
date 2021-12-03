import { SignupFormData } from "../../../interfaces/staff";

interface ConfirmationProps {
  formData: SignupFormData;
  onClickBack: () => void;
  staffSignup: (props: SignupFormData) => void;
}

const StaffSignupConfirmation: React.FC<ConfirmationProps> = (props) => {
  const { formData, onClickBack, staffSignup } = props;

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
            htmlFor="companyName"
          >
            企業名
          </label>
          {formData.companyName}
        </div>
        <div className="w-full px-3 my-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            担当者氏名
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
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary border-0 hover:shadow px-8 rounded-xl w-full mb-3"
          type="submit"
          onClick={() => staffSignup(formData)}
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
};

export default StaffSignupConfirmation;
