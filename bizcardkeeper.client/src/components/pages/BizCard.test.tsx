import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BizCard } from "./BizCard";
import { User } from "../../classes/User";
import { Skill } from "../../classes/Skill";
import "@testing-library/jest-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";

// axiosをモック化
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// モックユーザーデータの定義
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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // 明示的にモック化
}));

beforeAll(() => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

// 各テスト後にモックをクリア
afterEach(() => {
  jest.clearAllMocks();
});

describe("BizCard Component", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
  });

  it("renders NoData", () => {
    mockedAxios.get.mockResolvedValueOnce({ data: null });
    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <BizCard />
        </ChakraProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("renders user data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });
    render(
      <MemoryRouter>
        <ChakraProvider value={defaultSystem}>
          <BizCard />
        </ChakraProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText("This is a test user.")).toBeInTheDocument();
    expect(screen.getByText("JavaScript,React")).toBeInTheDocument();
    expect(screen.getByText("自己紹介")).toBeInTheDocument();
    expect(screen.getByText("好きな技術")).toBeInTheDocument();
  });

  it("Back to Top button works", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });
    render(
      <MemoryRouter initialEntries={["/cards/1"]}>
        <ChakraProvider value={defaultSystem}>
          <BizCard />
        </ChakraProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    const backToTopButton = screen.getByTestId("Back-Button");
    await userEvent.click(backToTopButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });
});
