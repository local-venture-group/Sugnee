import axios from "axios";
import { createContext, useEffect, useState } from "react";

const JobContext = createContext(null);

const JobProvider = ({ children }) => {
  const [jobOffers, setJobOffers] = useState([]);
  const [conditions, setConditions] = useState();

  useEffect(() => {
    console.log("条件コンテキスト");
    getConditions();
  }, []);

  const getConditions = () => {
    axios
      .get("/api/user/joboffer/conditions")
      .then((res) => {
        setConditions(res.data);
      })
      .catch((err) => {
        console.log("[getConditions]取得失敗", err);
      });
  };

  const searchJobofferByWorkType = async (types) => {
    const resData = await axios
      .get("/api/user/joboffer/search", {
        params: {
          work_type: types,
        },
      })
      .then((res) => {
        if (res.data) {
          setJobOffers(res.data);
          return res;
        } else {
          console.log(res);
          return res;
        }
      })
      .catch((err) => console.log(err));

    return resData;
  };

  const searchJobofferByWords = async (words) => {
    const resData = await axios
      .get("/api/user/joboffer/search", {
        params: {
          keyword: words,
        },
      })
      .then((res) => {
        if (res.data) {
          setJobOffers(res.data);
          return res;
        } else {
          console.log(res);
          return res;
        }
      })
      .catch((err) => console.log(err));

    return resData;
  };

  return (
    <JobContext.Provider
      value={{
        jobOffers,
        conditions,
        searchJobofferByWorkType,
        searchJobofferByWords,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobProvider };
