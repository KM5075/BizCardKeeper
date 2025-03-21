import { render, screen } from "@testing-library/react";
import { Login } from "./Login";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import userEvent from "@testing-library/user-event";

// モック関数を定義
jest.mock("../../hooks/useAuth");

describe("Login Component", () => {
  it("Password input reflects correctly on the screen", async () => {
    const mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <Login />
        </ChakraProvider>
      </MemoryRouter>
    );

    const userIdInput = screen.getByPlaceholderText("User ID");
    const passwordInput = screen.getByPlaceholderText("Password");

    await userEvent.type(userIdInput, "testUser");
    await userEvent.type(passwordInput, "testPassword");

    expect((userIdInput as HTMLInputElement).value).toBe("testUser");
    expect((passwordInput as HTMLInputElement).value).toBe("testPassword");
  });

  it("Login button calls login function with correct arguments", async () => {
    const mockLogin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });

    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <Login />
        </ChakraProvider>
      </MemoryRouter>
    );

    const userIdInput = screen.getByPlaceholderText("User ID");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    await userEvent.type(userIdInput, "testUser");
    await userEvent.type(passwordInput, "testPassword");
    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith("testUser", "testPassword");
  });
});
