import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useLoginUser";
import axios from "axios";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setLoginUser } = useLoginUser();

  /**
   * Login
   * @param userId
   * @param password
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
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    console.log(`login: ${userId}`);

    navigate("/home");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        navigate("/");
      });

    setLoading(false);
  };

  const logout = () => {
    setLoading(true);

    setLoginUser(null);
    localStorage.removeItem("loginUser");
    console.log("logout");

    navigate("/");
    setLoading(false);
  };

  return {
    login,
    logout,
    loading,
  };
};
