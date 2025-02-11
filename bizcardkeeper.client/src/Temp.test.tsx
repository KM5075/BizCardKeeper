import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Temp } from "./Temp";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("Temp component", () => {
    test("renders Temp component", () => {
        render(
            <ChakraProvider value={defaultSystem}>
                <Temp />
            </ChakraProvider>
        );
        expect(screen.getByText("Temp")).toBeInTheDocument();
    });

    test("renders Test Button", () => {
        render(
            <ChakraProvider value={defaultSystem}>
                <Temp />
            </ChakraProvider>
        );
        expect(screen.getByText("Test Button")).toBeInTheDocument();
    });
});