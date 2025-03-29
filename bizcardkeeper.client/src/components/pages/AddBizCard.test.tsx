import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { AddBizCard } from "./AddBizCard";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { User } from "../../classes/User";
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const testUserData: User = {
  id: 0,
  userName: "TestUser",
  description: "This is a test user.",
  skills: [],
  githubId: "",
  qiitaId: "",
  twitterId: "",
  displayUserInfo: () => "User Info",
};

describe("AddBizCard", () => {
  const navigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("template test", () => {
    expect(true).toBe(true);
  });
  it("should render some validation", async () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <AddBizCard />
      </ChakraProvider>
    );

    const registrarButton = screen.getByTestId("submit-button");

    userEvent.click(registrarButton);

    expect(await screen.findByText("ユーザ名は必須です。")).toBeInTheDocument();
    expect(await screen.findByText("自己紹介は必須です。")).toBeInTheDocument();
  });

  it("should render home after submit", async () => {
    const response: User = {
      id: 1,
      userName: testUserData.userName,
      description: testUserData.description,
      skills: testUserData.skills,
      githubId: testUserData.githubId,
      qiitaId: testUserData.qiitaId,
      twitterId: testUserData.twitterId,
      displayUserInfo: testUserData.displayUserInfo,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: response });
    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <AddBizCard />
        </ChakraProvider>
      </MemoryRouter>
    );

    await userEvent.type(
      screen.getByLabelText("ユーザ名"),
      testUserData.userName
    );
    await userEvent.type(
      screen.getByLabelText("自己紹介"),
      testUserData.description
    );
    const submitButton = screen.getByTestId("submit-button");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/api/cards",
        expect.any(Object)
      );
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });
});
