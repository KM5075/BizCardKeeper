import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Temp } from "./Temp";

describe("Temp component", () => {
    test("renders Temp component", () => {
        render(<Temp />);
        expect(screen.getByText("FailCheck")).toBeInTheDocument();
    });
});