import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get("/api/user")
      .then((res) => {
        console.log("[getUser]ログイン済み");
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("[getUser]ログインしてません", err);
      });
  };

  const signUp = (data) => {
    const {
      firstName,
      lastName,
      birthYear,
      birthMonth,
      birthDay,
      gender,
      email,
      password,
    } = data;
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;

    const resData = axios
      .post("/api/user/register", {
        firstName,
        lastName,
        email,
        birth,
        gender,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("[signup]会員登録成功");
          return res;
        } else {
          console.log(res.data.statusText);
          console.log("[signup]会員登録失敗");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[signup]会員登録失敗");
      });
    return resData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
