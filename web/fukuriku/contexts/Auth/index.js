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

  const login = (data) => {
    const { email, password } = data;
    axios.get("http://localhost/sanctum/csrf-cookie").then((response) => {
      axios
        .post("http://localhost/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.user);
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

  const addOmBookmark = async (e, user, jobId) => {
    e.preventDefault();
    if (!user) {
      alert("お気に入り追加はログインが必要です");
      return;
    }

    await axios.get("http://localhost/sanctum/csrf-cookie").then((response) => {
      axios
        .put("http://localhost/api/user/joboffer/favorites", {
          user_id: user.id,
          corporation_joboffer_id: jobId,
        })
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

  const deleteOmBookmark = async (e, user, jobId) => {
    e.preventDefault();

    await axios.get("http://localhost/sanctum/csrf-cookie").then((response) => {
      axios
        .delete("http://localhost/api/user/joboffer/favorites", {
          data: {
            user_id: user.id,
            corporation_joboffer_id: jobId,
          },
        })
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

  const addPickUpJobOfferBookmark = async (e, user, jobId) => {
    e.preventDefault();
    if (!user) {
      alert("お気に入り追加はログインが必要です");
      return;
    }

    await axios.get("http://localhost/sanctum/csrf-cookie").then((response) => {
      axios
        .put(`http://localhost/api/user/frikuJoboffer/${jobId}/favorites`)
        .then((res) => {
          console.log(res);
          // if (res.status === 201) {
          //   console.log("[addFavorite]追加成功", res);
          //   getUser();
          // } else {
          //   console.log(res.data);
          //   console.log("[addFavorite]お気に入り追加失敗");
          // }
        })
        .catch((err) => {
          console.log(err.response);
          console.log("[addFavorite]お気に入り追加失敗");
        });
    });
  };

  const deletePickUpJobOfferBookmark = async (e, user, jobId) => {
    e.preventDefault();

    await axios.get("http://localhost/sanctum/csrf-cookie").then((response) => {
      axios
        .delete(`http://localhost/api/user/frikuJoboffer/${jobId}/favorites`)
        .then((res) => {
          console.log(res);
          // if (res.status === 200) {
          //   console.log("[deleteFavorite]削除成功", res);
          //   getUser();
          // } else {
          //   console.log(res.data);
          //   console.log("[deleteFavorite]お気に入り削除失敗");
          // }
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
        addOmBookmark,
        deleteOmBookmark,
        addPickUpJobOfferBookmark,
        deletePickUpJobOfferBookmark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
