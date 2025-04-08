import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";

export const Home = () => {
  const [id, setId] = useState<string>();
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
      <Heading as={"h1"}>Home</Heading>

      <Flex
        direction="row"
        gap={4}
        mb={4}>
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

      <Input
        placeholder="ID"
        onChange={onChangeInput}
        mb={4}
        value={id}
      />
      <PrimaryButton
        label="表示"
        testId="Display-Button"
        onClick={onClickDisplayButton}
      />
    </div>
  );
};
