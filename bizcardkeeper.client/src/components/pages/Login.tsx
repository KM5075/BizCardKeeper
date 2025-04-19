import { Box, Heading, Input } from "@chakra-ui/react";
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

  const normalUserSet = () => {
    setUserId("user@contoso.com");
    setPassword("Pass@word1");
  };

  const adminUserSet = () => {
    setUserId("admin@contoso.com");
    setPassword("Pass@word1");
  };

  return (
    <div>
      <Heading
        as={"h1"}
        color={"teal"}
        mb={10}>
        Login Page
      </Heading>
      <Box
        mb={4}
        spaceX={4}>
        <PrimaryButton
          label="Normal User"
          onClick={normalUserSet}
        />
        <PrimaryButton
          label="Admin User"
          onClick={adminUserSet}
        />
      </Box>
      <Input
        placeholder="User ID"
        value={userId}
        onChange={onChangeUserId}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        mb={4}
        onChange={onChangePassword}
      />
      <PrimaryButton
        label="Login"
        onClick={() => login(userId, password)}
      />
    </div>
  );
};
