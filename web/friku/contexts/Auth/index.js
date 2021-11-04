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
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
