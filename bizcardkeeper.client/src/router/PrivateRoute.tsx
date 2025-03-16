import { useLoginUser } from "../hooks/useLoginUser";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { loginUser, setLoginUser } = useLoginUser();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log("Private Route:" + loginUser?.id);

  useEffect(() => {
    const fetchLoginUser = async () => {
      const response = await fetch("api/auth/me");
      if (!response.ok) {
        logout();
        return;
      }

      // URLで直接アクセスされた場合、ログインユーザー情報を取得できないため、ローカルストレージから取得する。
      if (!loginUser) {
        const loginUserJson = localStorage.getItem("loginUser");
        if (!loginUserJson) {
          logout();
          return;
        }
        setLoginUser(JSON.parse(loginUserJson));
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
