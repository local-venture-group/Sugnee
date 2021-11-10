import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Router from "next/router";

const StaffContext = createContext(null);

const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = () => {
    axios
      .get("/api/staff")
      .then((res) => {
        console.log("[getStaff]ログイン済み");
        setStaff(res.data);
      })
      .catch((err) => {
        console.log("[getStaff]ログインしてません", err);
      });
  };

  const staffSignup = (data) => {
    console.log(data);
    axios
      .post("/api/staff/register", {
        username: data.companyName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[staffSignup]会員登録失敗");
        alert("会員登録失敗しました");
      });
  };

  const staffLogin = (data) => {
    const { email, password } = data;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/api/staff/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data) {
            setStaff(res.data);
            Router.push("/staff");
          } else {
            console.log(res.data);
            console.log("[staffLogin]ログイン失敗");
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("[staffLogin]ログイン失敗");
        });
    });
  };

  const staffLogout = () => {
    axios
      .post("/api/Staff/logout")
      .then((res) => {
        if (res.status === 200) {
          setStaff(null);
          alert("ログアウトしました");
          Router.push("/");
        } else {
          console.log(res.data);
          alert("[staffLogout]ログアウト失敗");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("[staffLogout]ログアウト失敗");
      });
  };

  return (
    <StaffContext.Provider
      value={{ staff, staffSignup, staffLogin, staffLogout }}
    >
      {children}
    </StaffContext.Provider>
  );
};

export { StaffContext, StaffProvider };
