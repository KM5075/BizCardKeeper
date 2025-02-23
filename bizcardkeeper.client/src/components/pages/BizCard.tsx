import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router";
import { PrimaryButton } from "../atoms/PrimaryButton";

export const BizCard = () => {
  const params = useParams();

  return (
    <div>
      <Heading as={"h1"}>BizCard</Heading>
      <Text>Business Card</Text>
      <PrimaryButton
        label="Save"
        onClick={() => {
          console.log("test");
        }}
      />
      <Text>{params.id}</Text>
    </div>
  );
};
