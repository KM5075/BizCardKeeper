import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router";
import { User } from "../../classes/User";
import axios from "axios";
import { useEffect, useState } from "react";

export const BizCard = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();

  const featchUser = async () => {
    await axios.get<User>("/api/cards/" + id).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  };

  useEffect(() => {
    setTimeout(() => featchUser(), 1000);
  }, []);

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
          p={4}
          borderWidth={1}
          textAlign={"left"}
          borderRadius={8}
          boxShadow={"md"}
          bg={"white"}>
          <Heading
            size={"3xl"}
            mb={4}>
            {user.userName}
          </Heading>
          <Text>ID : {id}</Text>
          <Text>自己紹介 : {user.description}</Text>
          <Text>スキル:{user.skills.map((skill) => skill.name).join(",")}</Text>
          <Text>Github : {user.githubId} </Text>
          <Text>Qiita : {user.qiitaId} </Text>
          <Text>X : {user.twitterId} </Text>
        </Box>
      ) : (
        <Text>データがありません</Text>
      )}
    </Box>
  );
};
