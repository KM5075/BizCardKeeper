import { useLoginUser } from "../hooks/useLoginUser";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginUser } from "../providers/LoginUserProvider";

export const PrivateRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { loginUser, setLoginUser } = useLoginUser();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log("Private Route:" + loginUser?.id);

  useEffect(() => {
    const fetchLoginUser = async () => {
      console.log("fetchLoginUser");
      const response = await fetch("api/auth/me");
      if (!response.ok) {
        logout();
        return;
      }

      // URLで直接アクセスされた場合、ログインユーザー情報を取得できないため再設定する。
      if (!loginUser) {
        const responseData = await response.json();
        const user: LoginUser = {
          id: responseData.id,
          userName: responseData.userName,
          isAdmin: responseData.isAdmin,
        };
        setLoginUser(user);
      }

      setLoading(false);
    };

    fetchLoginUser();
  }, []);

  // ログインユーザー情報が取得できるまでローディング表示
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
