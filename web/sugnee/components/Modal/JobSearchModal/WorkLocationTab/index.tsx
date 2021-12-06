import { useContext } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

// Context
import { SearchConditionContext } from "../../../../contexts/SearchCondition";

// Type
import { JobSearchFormData } from "../../../../interfaces/job";
interface TabProps {
  register: UseFormRegister<JobSearchFormData>;
  modalSize: string;
}

const WorkLocationTab = ({ register, modalSize }: TabProps) => {
  const { workLocations } = useContext(SearchConditionContext);

  if (!workLocations) return null;
  return (
    <div className="w-full overflow-y-auto">
      {workLocations.map((location, index) => (
        <div key={index} className="mb-3">
          <label className="cursor-pointer label justify-start bg-primary">
            <input
              id={`area-${index}-${modalSize}`}
              type="checkbox"
              className="checkbox checkbox-xs bg-white"
              value={location.area}
              {...register("locations")}
            />
            <span className="text-white ml-3">{location.area}</span>
          </label>

          <div className="flex flex-wrap">
            {location.city.map((c, i) => (
              <label
                className="cursor-pointer label w-1/2 md:w-1/4 justify-start"
                key={i}
              >
                <input
                  id={`area${index}-city-${i}-${modalSize}`}
                  type="checkbox"
                  className="checkbox checkbox-xs"
                  value={c}
                  {...register("locations")}
                />
                <span className="text-xs ml-2">{c}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkLocationTab;
