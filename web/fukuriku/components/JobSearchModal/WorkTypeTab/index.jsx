import { useContext } from "react";

// context
import { SearchConditionContext } from "../../../contexts/SearchCondition";

export default function WorkTypeTab({ register }) {
  const { workTypes } = useContext(SearchConditionContext);
  if (!workTypes) return null;

  return (
    <div className="w-1/2">
      {workTypes.map((type, i) => (
        <div key={i}>
          <label className="cursor-pointer label justify-start">
            <input
              id={`${type === "勤務地" ? "location" : "workType"}-${i}`}
              type="checkbox"
              className="checkbox checkbox-sm"
              value={i}
              {...register("workType")}
            />
            <span className="text-sm ml-3">{type}</span>
          </label>
        </div>
      ))}
    </div>
  );
}
