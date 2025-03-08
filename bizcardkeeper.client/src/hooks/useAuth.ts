import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const login = (userId: string) => {
    console.log(`login: ${userId}`);
    navigate("/home");
  };

  return {
    login,
  };
};
