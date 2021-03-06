import { UseFormRegister, FieldValues } from "react-hook-form";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

// Type
import { JobSearchFormData } from "../../../../interfaces/job";
interface TabProps {
  register: UseFormRegister<JobSearchFormData>;
}

export const KeyWordTab = (props: TabProps) => {
  const { register } = props;
  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full rounded-full shadow h-16 p-6 focus:border-0 focus:bg-gray-100"
        placeholder="フリーワードで検索"
        {...register("keyWords")}
      />

      <div className="container mt-8">
        <p>
          <FontAwesomeIcon icon={faKey} size="lg" className="text-primary" />
          人気の検索ワード
        </p>

        <button
          type="button"
          value="フレックス"
          className="text-sm bg-blue-100 px-6 py-2 m-3 rounded-full hover:bg-blue-200"
        >
          フレックス
        </button>
      </div>
    </div>
  );
};

export default KeyWordTab;
