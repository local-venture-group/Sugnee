import { useContext } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

// Context
import { SearchConditionContext } from "../../../../contexts/SearchCondition";

// Type
interface TabProps {
  register: UseFormRegister<FieldValues>;
  modalSize: string;
}

const WorkTypeTab = (props: TabProps) => {
  const { register, modalSize } = props;
  const { workTypes } = useContext(SearchConditionContext);
  if (!workTypes) return null;

  return (
    <div className="flex flex-wrap lg:w-1/2">
      {workTypes.map((type, i) => (
        <div key={i} className="w-1/2 lg:w-full">
          <label className="cursor-pointer label justify-start">
            <input
              id={`${
                type === "勤務地" ? "location" : "workType"
              }-${modalSize}-${i}`}
              type="checkbox"
              value={i}
              {...register("workType")}
            />
            <span className="text-xs lg:text-sm ml-3">{type}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default WorkTypeTab;
