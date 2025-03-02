import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router";
import { PrimaryButton } from "../atoms/PrimaryButton";
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
  }

  useEffect(() => {
    setTimeout(() => featchUser(), 1000);
  }, []);

  return (
    <div>
      <Heading as={"h1"}>BizCard</Heading>
      <Text>Business Card</Text>
      <PrimaryButton
        label="Load"
        onClick={featchUser}
      />
      {user ?
        <div>
          <Text>ID : {id}</Text>
          <Text>名前 : {user.name}</Text>
          <Text>自己紹介 : {user.description}</Text>
          <Text>スキル:{user.skills.map((skill) => skill.name).join(",")}</Text>
          <Text>Github : {user.github_id} </Text>
          <Text>Qiita : {user.qiita_id} </Text>
          <Text>X : {user.x_id} </Text>
        </div>
        :
        <Text>データがありません</Text>
      }
    </div>
  );
};
