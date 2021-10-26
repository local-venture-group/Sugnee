import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

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
        console.log(res.data);
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
          console.log(res);
          if (res.data) {
            console.log(res.data);
            setAdmin(res.data);
          } else {
            console.log(res.data);
            console.log("[login]ログイン失敗");
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("[login]ログイン失敗");
        });
    });
  };

  const adminLogout = () => {
    axios
      .post("http://localhost/api/admin/logout")
      .then((res) => {
        setAdmin(null);
        alert("ログアウトしました");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AdminContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminProvider };
