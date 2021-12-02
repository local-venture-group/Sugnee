import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Types
import { JobOffer } from "../../interfaces/job";

interface WorkLocations {
  area: string;
  city: string[];
}

interface SearchCondition {
  cities?: string[];
  keyWords?: string[];
  workTypes?: number[];
}

interface SearchConditionContextType {
  workTypes: string[];
  workLocations: WorkLocations[];
  searchCondition: SearchCondition;
  addSearchCondition: (props: SearchCondition) => Promise<void>;
  searchJobOffers: (props: SearchCondition) => Promise<[JobOffer]>;
}

const SearchConditionContext = createContext<SearchConditionContextType>(null);

const SearchConditionProvider = ({ children }) => {
  const [workTypes, setWorkTypes] = useState<[string] | null>(null);
  const [workLocations, setWorkLocations] = useState<WorkLocations[]>(null);
  const [searchCondition, setSearchCondition] = useState<SearchCondition>(null);

  useEffect(() => {
    getConditions();
    setSearchCondition(JSON.parse(localStorage.getItem("searchCondition")));
  }, []);

  const getConditions = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/joboffer/conditions`)
      .then((res) => {
        if (res.status === 200) {
          const locationArr: [string, string[]][] = Object.entries(
            res.data.city
          );
          setWorkLocations(locationArr.map(([area, city]) => ({ area, city })));
          setWorkTypes(res.data.work_type);
        } else {
          console.log("[getCondition]検索条件取得失敗", res.data);
        }
      })
      .catch((err) => {
        console.log("[getConditions]検索条件取得失敗", err.response);
      });
  };

  const addSearchCondition = async (inputConditions) => {
    await setSearchCondition(inputConditions);
    await localStorage.setItem(
      "searchCondition",
      JSON.stringify(inputConditions)
    );
  };

  const searchJobOffers = async (searchCondition) => {
    console.log("API条件", searchCondition);
    const resData = await axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/joboffer/search`, {
        params: {
          city: searchCondition.cities,
          keyword: searchCondition.keyWords,
          work_type: searchCondition.workTypes,
        },
      })
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));

    return resData;
  };

  return (
    <SearchConditionContext.Provider
      value={{
        workTypes,
        workLocations,
        searchCondition,
        addSearchCondition,
        searchJobOffers,
      }}
    >
      {children}
    </SearchConditionContext.Provider>
  );
};

export { SearchConditionContext, SearchConditionProvider };
