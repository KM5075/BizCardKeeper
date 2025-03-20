import { useLoginUser } from "../hooks/useLoginUser";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginUser } from "../providers/LoginUserProvider";
import axios from "axios";

export const PrivateRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { loginUser, setLoginUser } = useLoginUser();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log("Private Route:" + loginUser?.id);

  useEffect(() => {
    const fetchLoginUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        if (!response.data) {
          logout();
          return;
        }

        // URLで直接アクセスされた場合、ログインユーザー情報を取得できないため再設定する。
        if (!loginUser) {
          const user: LoginUser = {
            id: response.data.id,
            userName: response.data.userName,
            isAdmin: response.data.isAdmin,
          };
          setLoginUser(user);
        }
      } catch (error) {
        console.error(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchLoginUser();
  }, []);

  // ログインユーザー情報が取得できるまでローディング表示
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
