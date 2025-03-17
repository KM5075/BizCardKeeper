import { renderHook, act } from "@testing-library/react";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useLoginUser";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("./useLoginUser");

describe("useAuth", () => {
  const navigate = jest.fn();
  const setLoginUser = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useLoginUser as jest.Mock).mockReturnValue({ setLoginUser });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully", async () => {
    const { result } = renderHook(() => useAuth());

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { id: 1, userName: "testUser", isAdmin: false },
    });

    await act(async () => {
      await result.current.login("testUser", "password");
    });

    expect(axios.post).toHaveBeenCalledWith(
      "api/login",
      { email: "testUser", password: "password" },
      { params: { useSessionCookies: true } }
    );
    expect(axios.get).toHaveBeenCalledWith("api/auth/me");
    expect(setLoginUser).toHaveBeenCalledWith({
      id: 1,
      userName: "testUser",
      isAdmin: false,
    });
    expect(navigate).toHaveBeenCalledWith("/home");
  });

  it("should handle login error", async () => {
    const { result } = renderHook(() => useAuth());

    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { status: 401 },
    });

    await act(async () => {
      await result.current.login("testUser", "password");
    });

    expect(axios.post).toHaveBeenCalledWith(
      "api/login",
      { email: "testUser", password: "password" },
      { params: { useSessionCookies: true } }
    );
    expect(navigate).toHaveBeenCalledWith("/");
    expect(result.current.loading).toBe(false);
  });

  it("should logout successfully", async () => {
    const { result } = renderHook(() => useAuth());

    (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    await act(async () => {
      await result.current.logout();
    });

    expect(axios.post).toHaveBeenCalledWith("api/logout", { text: "logout" });
    expect(setLoginUser).toHaveBeenCalledWith(null);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should handle logout error", async () => {
    const { result } = renderHook(() => useAuth());

    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { status: 500 },
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(axios.post).toHaveBeenCalledWith("api/logout", { text: "logout" });
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("should handle logout 401 error", async () => {
    const { result } = renderHook(() => useAuth());

    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { status: 401 },
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(axios.post).toHaveBeenCalledWith("api/logout", { text: "logout" });
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
