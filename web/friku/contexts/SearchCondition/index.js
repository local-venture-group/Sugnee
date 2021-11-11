import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SearchConditionContext = createContext(null);

const SearchConditionProvider = ({ children }) => {
  const [workTypes, setWorkTypes] = useState();
  const [workLocations, setWorkLocations] = useState();
  const [searchCondition, setSearchCondition] = useState({
    cities: [],
    keyWords: [],
    workTypes: [],
  });

  useEffect(() => {
    console.log("検索条件コンテキスト", searchCondition);
    getConditions();
    setSearchCondition(JSON.parse(localStorage.getItem("searchCondition")));
  }, []);

  const getConditions = () => {
    axios
      .get("/api/user/joboffer/conditions")
      .then((res) => {
        setWorkLocations(
          Object.entries(res.data.city).map(([area, city]) => ({ area, city }))
        );
        setWorkTypes(res.data.work_type);
      })
      .catch((err) => {
        console.log("[getConditions]取得失敗", err);
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
      .get("/api/user/joboffer/search", {
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
