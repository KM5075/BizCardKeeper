import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = (userId: string) => {
    setLoading(true);
    console.log(`login: ${userId}`);
    navigate("/home");
    setLoading(false);
  };

  return {
    login,
    loading,
  };
};
