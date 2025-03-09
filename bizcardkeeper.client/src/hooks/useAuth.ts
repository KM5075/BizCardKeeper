import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setLoginUser } = useLoginUser();

  const login = (userId: string) => {
    setLoading(true);

    const loginUser = { id: userId, isAdmin: userId === "admin" };
    setLoginUser(loginUser);
    localStorage.setItem("loginUser", JSON.stringify(loginUser));

    console.log(`login: ${userId}`);

    navigate("/home");
    setLoading(false);
  };

  return {
    login,
    loading,
  };
};
