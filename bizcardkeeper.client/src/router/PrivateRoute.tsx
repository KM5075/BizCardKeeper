import { Navigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";
import { useEffect, useState } from "react";

export const PrivateRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { loginUser, setLoginUser } = useLoginUser();
  const [loading, setLoading] = useState(true);
  console.log("Private Route:" + loginUser?.id);

  useEffect(() => {
    if (!loginUser) {
      const storageLoginUser = JSON.parse(
        localStorage.getItem("loginUser") || "null"
      );
      if (storageLoginUser) {
        setLoginUser(storageLoginUser);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  //   const navigate = useNavigate();
  if (!loginUser) {
    // navigate("/");
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};
