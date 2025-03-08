import { PrimaryButton } from "../atoms/PrimaryButton";
import { Heading, Text } from "@chakra-ui/react";

export const Home = () => {
  return (
    <div>
      <Heading as={"h1"}>Home</Heading>
      <Text>Home</Text>
      <PrimaryButton
        label="Create Card"
        onClick={() => {
          console.log("test");
        }}
      />
    </div>
  );
};
