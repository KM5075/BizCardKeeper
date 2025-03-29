import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AddBizCard } from "./AddBizCard";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

describe("AddBizCard", () => {
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
});
