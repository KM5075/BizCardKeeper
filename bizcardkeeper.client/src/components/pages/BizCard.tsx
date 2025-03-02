import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { User } from "../../classes/User";
import { debugUser } from "../../classes/DebugData";
import axios from "axios";

export const BizCard = () => {
  const params = useParams();
  const user: User = debugUser;

  const featchUser = async () => {
    await axios.get<User>("/api/cards/1").then((res) => {
      console.log(res.data);
    });
  }

  return (
    <div>
      <Heading as={"h1"}>BizCard</Heading>
      <Text>Business Card</Text>
      <PrimaryButton
        label="Load"
        onClick={featchUser}
      />
      <Text>{JSON.stringify(params)}</Text>
      <Text>名前 : {user.name}</Text>
      <Text>自己紹介 : {user.description}</Text>
      <Text>スキル:{user.skills.map((skill) => skill.name).join(",")}</Text>
      <Text>Github : {user.github_id} </Text>
      <Text>Qiita : {user.qiita_id} </Text>
      <Text>X : {user.x_id} </Text>
    </div>
  );
};
