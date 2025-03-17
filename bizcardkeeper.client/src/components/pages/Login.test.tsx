import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "./Login";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";

test("User ID input reflects correctly on the screen", () => {
  render(
    <MemoryRouter>
      <ChakraProvider value={defaultSystem}>
        <Login />
      </ChakraProvider>
    </MemoryRouter>
  );

  const userIdInput = screen.getByPlaceholderText("User ID");
  fireEvent.change(userIdInput, { target: { value: "testUser" } });

  expect((userIdInput as HTMLInputElement).value).toBe("testUser");
});

test("Password input reflects correctly on the screen", () => {
  render(
    <ChakraProvider value={defaultSystem}>
      <Login />
    </ChakraProvider>
  );

  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: "testPassword" } });

  expect((passwordInput as HTMLInputElement).value).toBe("testPassword");
});

test("Login button calls login function with correct arguments", () => {
  const mockLogin = jest.fn();
  jest.mock("../../hooks/useAuth", () => ({
    useAuth: () => ({
      login: mockLogin,
    }),
  }));

  render(
    <ChakraProvider value={defaultSystem}>
      <Login />
    </ChakraProvider>
  );

  const userIdInput = screen.getByPlaceholderText("User ID");
  const passwordInput = screen.getByPlaceholderText("Password");
  const loginButton = screen.getByText("Login");

  fireEvent.change(userIdInput, { target: { value: "testUser" } });
  fireEvent.change(passwordInput, { target: { value: "testPassword" } });
  fireEvent.click(loginButton);

  expect(mockLogin).toHaveBeenCalledWith("testUser", "testPassword");
});
