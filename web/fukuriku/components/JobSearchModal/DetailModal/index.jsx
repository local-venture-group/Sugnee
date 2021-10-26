import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// context
import { SearchConditionContext } from "../../../contexts/SearchCondition";

export default function DetailJobSearchModal({ type }) {
  const router = useRouter();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { workTypes, workLocations, addSearchCondition, searchCondition } =
    useContext(SearchConditionContext);

  const onSubmit = async (data) => {
    if (data.workType) {
      const selectedTypes = data.workType.map((type) => parseInt(type));
      addSearchCondition({
        cities: [],
        keyWords: [],
        workTypes: [...selectedTypes],
      });
    } else if (data.locations) {
      addSearchCondition({
        cities: data.locations,
        keyWords: [],
        workTypes: [],
      });
    }

    router.push("/jobOffer");
  };

  if (!workTypes) return null;
  return (
    <div className="modal">
      <div className="modal-box">
        <p className="text-2xl text-center">{type}からさがす</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "勤務地" &&
            workLocations.map((location, i) => (
              <div key={i} className="1-full">
                <label className="cursor-pointer label bg-blue-100">
                  <input
                    id={`${type === "勤務地" ? "area" : "workType"}-${i}`}
                    type="checkbox"
                    className="checkbox checkbox-sm "
                    value={location.area}
                    {...register("locations")}
                  />
                  <span className="text-sm">{location.area}</span>
                </label>
                <div className="flex flex-wrap">
                  {location.city.map((c, i) => (
                    <label
                      className="cursor-pointer label bg-white  w-1/4"
                      key={i}
                    >
                      <input
                        id={`${type === "勤務地" ? "city" : "workType"}-${i}`}
                        type="checkbox"
                        className="checkbox checkbox-xs"
                        value={c}
                        {...register("locations")}
                      />
                      <span className="text-xs">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          {type === "職種" &&
            workTypes.map((type, i) => (
              <div key={i}>
                <label className="cursor-pointer label">
                  <input
                    id={`${type === "勤務地" ? "location" : "workType"}-${i}`}
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    value={i}
                    {...register("workType")}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              </div>
            ))}
          <button type="submit" className="w-full btn mt-12">
            さがす
          </button>
        </form>
        <div className="modal-action justify-center">
          <label
            htmlFor={`${type === "勤務地" ? "placeModal" : "typeModal"}`}
            className="w-full btn btn-outline"
          >
            とじる
          </label>
        </div>
      </div>
    </div>
  );
}
