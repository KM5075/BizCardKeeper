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

    try {
      await axios.post(
        "api/login",
        { email: userId, password },
        { params: { useSessionCookies: true } }
      );

      const data = await axios.get("api/auth/me");
      console.log(data.data);

      const loginUser = {
        id: data.data.id,
        userName: data.data.userName,
        isAdmin: data.data.isAdmin,
      };

      setLoginUser(loginUser);
      navigate("/home");
    } catch (error) {
      console.error("login error");
      console.error(error);
      navigate("/");
      return;
    } finally {
      setLoading(false);
    }
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
