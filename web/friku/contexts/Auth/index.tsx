import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";
import Router from "next/router";

// Types
interface AppProviderProps {
  children: ReactNode;
}

// 求人の型はあとでつける
interface User {
  id: number;
  appliedJobs: [];
  applied_at: string;
  birth: string;
  created_at: string;
  email: string;
  email_verified_at: string;
  favorites: [];
  first_name: string;
  first_name_kana: string;
  gender: number;
  img_path: string;
  last_name: string;
  last_name_kana: string;
  name: string;
  phone: string;
  updated_at: string;
}

interface SignupProps {
  firstName: string;
  lastName: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  gender: number;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface BookmarkProps {
  e: React.MouseEvent<HTMLElement>;
  user: User;
  jobId: number;
}

interface AuthContextType {
  user: User | null;
  signup: (props: SignupProps) => void;
  login: (props: LoginProps) => void;
  logout: () => void;
  addFrikuBookmark: (props: BookmarkProps) => Promise<void>;
  deleteFrikuBookmark: (props: BookmarkProps) => Promise<void>;
  addOmBookmark: (props: BookmarkProps) => Promise<void>;
  deleteOmBookmark: (props: BookmarkProps) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider = (props: AppProviderProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`)
      .then((res) => {
        console.log("[getUser]ログイン済み");
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log("[getUser]ログインしてません", err);
      });
  };

  const signup = (data: SignupProps) => {
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

    axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
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
          Router.push("/signup/success");
        } else {
          console.log(res.data.statusText);
          console.log("[signup]会員登録失敗");
          alert("会員登録失敗しました");
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log("[signup]会員登録失敗");
        alert("会員登録失敗しました");
      });
  };

  const login = (data: LoginProps) => {
    const { email, password } = data;
    axios
      .get(process.env.NEXT_PUBLIC_API_AUTH_URL, { withCredentials: true })
      .then(() => {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
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
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logout`)
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

  const addFrikuBookmark = async (props: BookmarkProps) => {
    const { e, user, jobId } = props;
    e.preventDefault();
    if (!user) {
      alert("お気に入り追加はログインが必要です");
      return;
    }

    await axios.get(process.env.NEXT_PUBLIC_API_AUTH_URL).then((response) => {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/frikuJoboffer/${jobId}/favorites/`,
          {
            frikuJoboffer: jobId,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            console.log("[addFavorite]追加成功", res);
            setUser({ ...user, favorites: res.data });
          } else {
            console.log("[addFavorite]お気に入り追加失敗", res.data);
          }
        })
        .catch((err) => {
          console.log("[addFavorite]お気に入り追加失敗", err.response);
        });
    });
  };

  const deleteFrikuBookmark = async (props: BookmarkProps) => {
    const { e, user, jobId } = props;
    e.preventDefault();

    await axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/frikuJoboffer/${jobId}/favorites/`,
          {
            data: {
              frikuJoboffer: jobId,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("[deleteFavorite]削除成功", res);
            setUser({ ...user, favorites: res.data });
          } else {
            console.log("[deleteFavorite]お気に入り削除失敗", res.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("[deleteFavorite]お気に入り削除失敗");
        });
    });
  };

  const addOmBookmark = async (props: BookmarkProps) => {
    const { e, user, jobId } = props;
    e.preventDefault();
    if (!user) {
      alert("お気に入り追加はログインが必要です");
      return;
    }

    await axios.get(process.env.NEXT_PUBLIC_API_AUTH_URL).then((response) => {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/joboffer/favorites`,
          {
            user_id: user.id,
            corporation_joboffer_id: jobId,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setUser({ ...user, favorites: res.data });
          } else {
            console.log("[addFavorite]お気に入り追加失敗", res.data);
          }
        })
        .catch((err) => {
          console.log("[addFavorite]お気に入り追加失敗", err.response);
        });
    });
  };

  const deleteOmBookmark = async (props: BookmarkProps) => {
    const { e, user, jobId } = props;
    e.preventDefault();

    await axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/joboffer/favorites`,
          {
            data: {
              user_id: user.id,
              corporation_joboffer_id: jobId,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setUser({ ...user, favorites: res.data });
          } else {
            console.log("[deleteFavorite]お気に入り削除失敗", res.data);
          }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("[deleteFavorite]お気に入り削除失敗");
        });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        addFrikuBookmark,
        deleteFrikuBookmark,
        addOmBookmark,
        deleteOmBookmark,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
