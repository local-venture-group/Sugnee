import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Router from "next/router";

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

  const signup = (data) => {
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
        } else {
          console.log(res.data.statusText);
          console.log("[signup]会員登録失敗");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[signup]会員登録失敗");
      });
  };

  const login = (data) => {
    const { email, password } = data;
    axios
      .get("http://localhost/sanctum/csrf-cookie", { withCredentials: true })
      .then(() => {
        axios
          .post(
            "http://localhost/api/user/login",
            {
              email,
              password,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.status === 200) {
              setUser(res.data.user);
              Router.push("/");
            } else {
              console.log(res.data);
              alert("[login]ログイン失敗");
            }
          })
          .catch((err) => {
            console.log(err.response);
            console.log("[login]ログイン失敗");
          });
      });
  };

  const logout = () => {
    axios
      .post("http://localhost/api/user/logout")
      .then((res) => {
        if (res.status === 200) {
          alert("ログアウトしました");
          setUser(null);
        } else {
          console.log(res.data);
          console.log("[logout]ログアウト失敗");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[login]ログイン失敗");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
