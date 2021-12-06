import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// Contexts
import { SearchConditionContext } from "../../../contexts/SearchCondition";

// Component
import KeyWordTab from "../JobSearchModal/KeyWordTab";
import WorkTypeTab from "../JobSearchModal/WorkTypeTab";
import WorkLocationTab from "../JobSearchModal/WorkLocationTab";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faSuitcase,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

// Types
import { JobSearchFormData } from "../../../interfaces/job";
interface MobileJobSearchModalProps {
  current: string;
}

const MobileSearchModal = (props: MobileJobSearchModalProps) => {
  const { current } = props;
  const [currentTab, setCurrentTab] = useState(current);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<JobSearchFormData>();
  const { addSearchCondition } = useContext(SearchConditionContext);

  const handleClickTab = (e) => {
    e.preventDefault();
    setCurrentTab(e.target.id);
  };

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
    const modalCheck = document.querySelector(
      "#mobileSearchModal"
    ) as HTMLInputElement;
    modalCheck.checked = false;
    router.push("/job");
  };

  return (
    <div className="modal" id="mobileSearchModal">
      <div className="modal-box h-screen w-full lg:max-w-3xl lg:h-4/5">
        <div className="w-full flex flex-col justify-center items-center px-4">
          <div className="w-full">
            <button
              type="button"
              id="location"
              className={`text-gray-400 py-4 w-1/3 rounded-t-lg border-primary border-t-4 border-r-4 border-l-4 hover:text-primary ${
                currentTab === "location" && "text-gray-900 bg-blue-50"
              }`}
              onClick={handleClickTab}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="text-primary mr-2"
                size="sm"
              />
              勤務地
            </button>
            <button
              type="button"
              id="type"
              className={`text-gray-400 py-4 w-1/3 rounded-t-lg border-primary border-t-4 border-r-4 border-l-4 hover:text-primary ${
                currentTab === "type" && "text-gray-900 bg-blue-50"
              }`}
              onClick={handleClickTab}
            >
              <FontAwesomeIcon
                icon={faSuitcase}
                size="sm"
                className="text-primary mr-2"
              />
              職種
            </button>
            <button
              type="button"
              id="word"
              className={`text-gray-400 py-4 w-1/3 rounded-t-lg border-primary border-t-4 border-r-4 border-l-4 hover:text-primary ${
                currentTab === "word" && "text-gray-900 bg-blue-50"
              }`}
              onClick={handleClickTab}
            >
              <FontAwesomeIcon
                icon={faPencilAlt}
                size="sm"
                className="text-primary mr-2"
              />
              ワード
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div
              className="w-full bg-blue-50 p-3 rounded-b-lg border-primary border-r-4 border-l-4 border-b-4 flex flex-col items-center"
              style={{ height: "24rem" }}
            >
              {currentTab === "location" && (
                <WorkLocationTab register={register} modalSize={"sm"} />
              )}
              {currentTab === "type" && (
                <WorkTypeTab register={register} modalSize={"sm"} />
              )}
              {currentTab === "word" && <KeyWordTab register={register} />}
            </div>
            <button type="submit" className="w-full btn btn-primary mt-8">
              さがす
            </button>
          </form>
          <div className="justify-center w-full mt-2">
            <label
              htmlFor="mobileSearchModal"
              className="w-full btn btn-outline btn-primary"
            >
              とじる
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchModal;
