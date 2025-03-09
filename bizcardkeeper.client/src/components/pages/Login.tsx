import { Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [userId, setUserId] = useState("");
  const { login } = useAuth();

  const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  return (
    <div>
      <Heading
        as={"h1"}
        color={"teal"}>
        Login
      </Heading>
      <Input
        placeholder="User ID"
        value={userId}
        onChange={onChangeUserId}
      />
      <PrimaryButton
        label="Login"
        onClick={() => login(userId)}
      />
    </div>
  );
};
