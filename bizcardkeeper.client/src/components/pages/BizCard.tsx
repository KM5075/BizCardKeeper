import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../classes/User";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { PrimaryButton } from "../atoms/PrimaryButton";

export const BizCard = () => {
  const { id } = useParams<{ id: string }>()!;
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  const fetchUser = () => {
    axios
      .get<User>("/api/cards/" + id)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
        } else {
          setUser(undefined);
        }
      })
      .catch((err) => {
        console.error(err);
        setUser(undefined);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onClickBackButton = () => {
    navigate("/home");
  };

  return (
    <Box>
      <Heading
        as={"h1"}
        color={"teal"}>
        BizCard
      </Heading>
      {user ? (
        <Box
          alignItems={"start"}
          mt={4}
          mb={4}
          p={4}
          borderWidth={1}
          textAlign={"left"}
          borderRadius={8}
          boxShadow={"md"}
          bg={"white"}
          data-testid={"bizcard"}>
          <Heading
            size={"3xl"}
            mb={4}>
            {user.userName}
          </Heading>
          <Text fontWeight={"bold"}>自己紹介</Text>
          <Text>{user.description}</Text>
          <br />
          <Text fontWeight={"bold"}>好きな技術</Text>
          <Text>{user.skills.map((skill) => skill.name).join(",")}</Text>
          <br />
          <Box
            display="flex"
            justifyContent="space-between"
            mt={0}>
            <Box>
              <a href={`https://github.com/${user.githubId}`}>
                <svg
                  fill="currentColor"
                  color="black"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.003 10.003 0 0022 12c0-5.52-4.48-10-10-10z"
                  />
                </svg>
              </a>
            </Box>
            <Box>
              <a href={`https://qiita.com/${user.qiitaId}`}>
                <FaFileAlt
                  size={24}
                  color="black"
                />
              </a>
            </Box>
            <Box>
              <a href={`https://twitter.com/${user.twitterId}`}>
                <svg
                  fill="currentColor"
                  color="black"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.27 4.27 0 00-7.29 3.89A12.13 12.13 0 013 4.8a4.27 4.27 0 001.32 5.7 4.27 4.27 0 01-1.93-.53v.05a4.27 4.27 0 003.42 4.18 4.27 4.27 0 01-1.92.07 4.27 4.27 0 003.99 2.97A8.56 8.56 0 012 19.54a12.07 12.07 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.39-.01-.58A8.72 8.72 0 0024 5.54a8.59 8.59 0 01-2.54.7z" />
                </svg>
              </a>
            </Box>
          </Box>
        </Box>
      ) : (
        <Text>No Data</Text>
      )}
      <PrimaryButton
        label="戻る"
        testId="Back-Button"
        onClick={onClickBackButton}
      />
    </Box>
  );
};
