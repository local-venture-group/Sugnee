import axios from "axios";
import React, { createContext, useEffect, useState, useMemo } from "react";
import Router from "next/router";
import { Admin } from "../../interfaces/admin";

interface LoginProps {
  email: string;
  password: string;
}

interface AdminContextType {
  admin: Admin;
  adminLogin: (props: LoginProps) => void;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType>(null);

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`)
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
    axios.get(process.env.NEXT_PUBLIC_API_AUTH_URL).then((response) => {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.admin) {
            setAdmin(res.data.admin);
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
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/logout`)
      .then((res) => {
        if (res.status === 200) {
          setAdmin(null);
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
