import { Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <Heading
        as={"h1"}
        color={"teal"}>
        Login Page
      </Heading>
      <Input
        placeholder="User ID"
        value={userId}
        onChange={onChangeUserId}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <PrimaryButton
        label="Login"
        onClick={() => login(userId, password)}
      />
    </div>
  );
};
