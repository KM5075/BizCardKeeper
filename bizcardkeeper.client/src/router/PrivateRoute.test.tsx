import { render, screen, waitFor } from "@testing-library/react";
import { PrivateRoute } from "./PrivateRoute";
import { useLoginUser } from "../hooks/useLoginUser";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import "@testing-library/jest-dom";

// Mock hooks and axios
jest.mock("../hooks/useLoginUser");
jest.mock("../hooks/useAuth");
jest.mock("axios");

const mockUseLoginUser = useLoginUser as jest.MockedFunction<
  typeof useLoginUser
>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockAxios = axios as jest.Mocked<typeof axios>;
const mockAxiosGet = mockAxios.get;

describe("PrivateRoute", () => {
  beforeEach(() => {
    mockUseLoginUser.mockReturnValue({
      loginUser: null,
      setLoginUser: jest.fn(),
    });
    mockUseAuth.mockReturnValue({
      logout: jest.fn(),
      login: jest.fn(),
      loading: false,
    });
  });

  it("should display loading initially", () => {
    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should logout if no user data is returned", async () => {
    mockAxiosGet.mockResolvedValue({ data: null });
    const { logout } = mockUseAuth();

    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });

  it("should set login user if user data is returned", async () => {
    const userData = { id: 1, userName: "testuser", isAdmin: false };
    mockAxiosGet.mockResolvedValue({ data: userData });
    const { setLoginUser } = mockUseLoginUser();

    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );

    await waitFor(() => {
      expect(setLoginUser).toHaveBeenCalledWith(userData);
    });
  });

  it("should render children if user is logged in", async () => {
    const userData = { id: "1", userName: "testuser", isAdmin: false };
    mockAxiosGet.mockResolvedValue({ data: userData });
    mockUseLoginUser.mockReturnValue({
      loginUser: userData,
      setLoginUser: jest.fn(),
    });

    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );

    await waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });
  });

  it("should logout if axios throws an error", async () => {
    mockAxiosGet.mockRejectedValue(new Error("Network Error"));
    const { logout } = mockUseAuth();

    render(
      <PrivateRoute>
        <div>Protected Content</div>
      </PrivateRoute>
    );

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });
});
