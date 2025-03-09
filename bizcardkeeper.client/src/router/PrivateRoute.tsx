import { Navigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { loginUser } = useLoginUser();
  console.log(loginUser?.id);

  //   const navigate = useNavigate();
  if (!loginUser) {
    // navigate("/");
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};
