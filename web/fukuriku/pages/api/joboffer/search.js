import axios from "axios";

export const searchJobofferByWorkType = async (types) => {
  const resData = await axios
    .get("/api/user/joboffer/search", {
      params: {
        work_type: types,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return resData;
};

export const searchJobofferByWords = async (words) => {
  const resData = await axios
    .get("/api/user/joboffer/search", {
      params: {
        keyword: words,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return resData;
};
