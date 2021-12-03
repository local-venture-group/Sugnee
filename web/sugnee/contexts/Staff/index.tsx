import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { Staff } from "../../interfaces/staff";

interface SignupProps {
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface StaffContextType {
  staff: Staff | null;
  staffSignup: (props: SignupProps) => void;
  staffLogin: (props: LoginProps) => void;
  staffLogout: () => void;
}

const StaffContext = createContext<StaffContextType>(null);

const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState<Staff | null>(null);

  useEffect(() => {
    getStaff();
  }, []);

  const getStaff = async () => {
    await axios
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
        last_name: data.lastName,
        first_name: data.firstName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          // 空の配列がreturnされている？？
          // setStaff(res.data.staff);
          // Router.push("/staff");
        } else {
          console.log(res.data);
          alert("[staff]登録失敗");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[staff]登録失敗");
      });
  };

  const staffLogin = (data: LoginProps) => {
    const { email, password } = data;
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/api/staff/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            setStaff(res.data.staff);
            Router.push("/staff");
          } else {
            console.log("[staffLogin]ログイン失敗", res.data);
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
      .post("/api/staff/logout")
      .then((res) => {
        if (res.status === 200) {
          setStaff(null);
          Router.push("/");
        } else {
          console.log(res.data);
          console.log("[logout]ログアウト失敗");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[logout]ログアウト失敗");
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
