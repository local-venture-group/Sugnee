import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Router from "next/router";

const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = () => {
    axios
      .get("/api/admin")
      .then((res) => {
        console.log("[getadmin]ログイン済み");
        setAdmin(res.data);
      })
      .catch((err) => {
        console.log("[getadmin]ログインしてません", err);
      });
  };

  const adminLogin = (data) => {
    const { email, password } = data;
    axios.get("http://localhost/sanctum/csrf-cookie").then((response) => {
      axios
        .post("http://localhost/api/admin/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data) {
            setAdmin(res.data);
            Router.push("/admin");
          } else {
            console.log(res.data);
            console.log("[adminLogin]ログイン失敗");
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("[adminLogin]ログイン失敗");
        });
    });
  };

  const adminLogout = () => {
    axios
      .post("http://localhost/api/admin/logout")
      .then((res) => {
        if (res.status === 200) {
          setAdmin(null);
          alert("ログアウトしました");
          Router.push("/");
        } else {
          console.log(res.data);
          alert("[adminLogout]ログアウト失敗");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("[adminLogout]ログアウト失敗");
      });
  };

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
