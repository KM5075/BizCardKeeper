import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Flex, Heading } from "@chakra-ui/react";

export const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Heading as={"h1"}>Home</Heading>

      <Flex
        direction="row"
        gap={4}>
        <PrimaryButton
          label="Create Card"
          onClick={() => {
            navigate("/cards/register");
          }}
        />
        <PrimaryButton
          label="Logout"
          onClick={logout}
        />
      </Flex>
    </div>
  );
};
