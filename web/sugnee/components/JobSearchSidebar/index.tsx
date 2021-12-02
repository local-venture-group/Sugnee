import { useContext } from "react";
import { useForm } from "react-hook-form";

// Contexts
import { SearchConditionContext } from "../../contexts/SearchCondition";

// Components
import WorkLocationTab from "../Modal/JobSearchModal/WorkLocationTab";
import WorkTypeTab from "../Modal/JobSearchModal/WorkTypeTab";
import KeyWordTab from "../Modal/JobSearchModal/KeyWordTab";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSuitcase,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

const JobSearchSidebar = ({ setJobOffers, setTotalCount }) => {
  const { searchCondition, addSearchCondition, searchJobOffers } = useContext(
    SearchConditionContext
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await addSearchCondition({
      cities: data.locations ? data.locations : [],
      keyWords: data.keywords
        ? data.keywords.replaceAll(/　/g, " ").split(" ")
        : [],
      workTypes: data.workType
        ? data.workType.map((type) => parseInt(type))
        : [],
    });
    window.scroll({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="py-10 px-8 bg-gray-100 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-primary mb-2"
            size="2x"
          />
          <h6 className="mb-1 font-semibold text-2xl text-gray-600">勤務地</h6>
          <p className="text-gray-600 font-semibold text-sm mb-6">からさがす</p>
          <WorkLocationTab register={register} modalSize={"sm"} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={faSuitcase}
            className="text-primary my-2"
            size="2x"
          />
          <h6 className="mb-1 font-semibold text-2xl text-gray-600">業種</h6>
          <p className="text-gray-600 font-semibold text-sm mb-6">からさがす</p>
          <WorkTypeTab register={register} modalSize={"sm"} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <FontAwesomeIcon
            icon={faPencilAlt}
            className="text-primary my-2"
            size="2x"
          />
          <h6 className="mb-1 font-semibold text-xl text-gray-600">
            キーワード
          </h6>
          <p className="text-gray-600 font-semibold text-sm mb-6">からさがす</p>
          <KeyWordTab register={register} />
        </div>
        <button type="submit" className="w-full btn btn-primary mt-8">
          さがす
        </button>
      </form>
    </div>
  );
};

export default JobSearchSidebar;
