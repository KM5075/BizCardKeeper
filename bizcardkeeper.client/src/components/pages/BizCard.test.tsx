import { act, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { BizCard } from "./BizCard";
import { User } from "../../classes/User";
import { Skill } from "../../classes/Skill";
import "@testing-library/jest-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUser: User = {
  id: 1,
  userName: "testuser",
  description: "This is a test user.",
  skills: [new Skill(1, "JavaScript"), new Skill(2, "React")],
  githubId: "testgithub",
  qiitaId: "testqiita",
  twitterId: "testtwitter",
  displayUserInfo: () => "User Info",
};

// 各テスト後にモックをクリア
afterEach(() => {
  jest.clearAllMocks();
});

describe("BizCard Component", () => {
  it("renders NoData", () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });
    render(
      <ChakraProvider value={defaultSystem}>
        <BizCard />
      </ChakraProvider>
    );

    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("renders user data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    render(
      <ChakraProvider value={defaultSystem}>
        <BizCard />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    console.log(screen.debug());
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("This is a test user.")).toBeInTheDocument();
    expect(screen.getByText("JavaScript,React")).toBeInTheDocument();
    expect(screen.getByText("自己紹介")).toBeInTheDocument();
    expect(screen.getByText("好きな技術")).toBeInTheDocument();
  });
});
