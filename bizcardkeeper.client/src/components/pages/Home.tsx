import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";

export const Home = () => {
  const [id, setId] = useState<string>("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClickDisplayButton = () => {
    if (id) {
      navigate(`/cards/${id}`);
    } else {
      alert("IDを入力してください。");
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  return (
    <div>
      <Heading
        as={"h1"}
        color="teal"
        mb={10}>
        Home
      </Heading>

      <Input
        placeholder="ID"
        onChange={onChangeInput}
        mb={4}
        value={id}
      />
      <Flex
        direction="row"
        gap={4}
        mb={4}>
        <PrimaryButton
          label="Display Card"
          testId="Display-Button"
          onClick={onClickDisplayButton}
        />
        <PrimaryButton
          label="Create New Card"
          onClick={() => {
            navigate("/cards/register");
          }}
        />
      </Flex>
      <PrimaryButton
        label="Logout"
        onClick={logout}
      />
    </div>
  );
};
