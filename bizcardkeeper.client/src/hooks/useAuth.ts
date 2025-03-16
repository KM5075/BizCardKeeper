import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useLoginUser";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setLoginUser } = useLoginUser();

  /**
   * Login処理
   * Cookieを使ってログイン処理を行う。正常にログインできた場合、ログインユーザー情報を取得し、
   * Home画面に遷移する。
   * @param userId : ユーザーID
   * @param password : パスワード
   */
  const login = async (userId: string, password: string) => {
    setLoading(true);

    await axios
      .post(
        "api/login",
        { email: userId, password },
        { params: { useSessionCookies: true } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error("login error");
        console.error(err);
        setLoading(false);
        navigate("/");
        return;
      });

    await axios
      .get("api/auth/me")
      .then((res) => {
        console.log(res.data);

        const loginUser = {
          id: res.data.id,
          userName: res.data.userName,
          isAdmin: res.data.isAdmin,
        };
        setLoginUser(loginUser);

        navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        navigate("/");
      });

    setLoading(false);
  };

  /**
   * Logout処理
   * Cookieを使ってログアウト処理を行う。正常にログアウトできた場合、ログインユーザー情報を削除し、
   * Login画面に遷移する。
   */
  const logout = () => {
    setLoading(true);

    // Cookieの削除
    axios
      .post("api/logout", { text: "logout" })
      .then((res) => {
        console.log(res.data);
        setLoginUser(null);
        console.log("logout");

        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        // 401エラーはログアウト成功とみなす
        if (err.response.status != 401) {
          console.error("logout error");
          console.error(err);
        }

        setLoading(false);
        navigate("/");
      });
  };

  return {
    login,
    logout,
    loading,
  };
};
