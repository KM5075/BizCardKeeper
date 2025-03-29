import { Box, Heading, Input, Text } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { useForm } from "react-hook-form";
import { User } from "../../classes/User";
import { Field } from "../ui/field";
import { SubmitButton } from "../atoms/SubmitButton";

export const AddBizCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      id: 0,
      userName: "",
      description: "",
      skills: [],
      githubId: "",
      qiitaId: "",
      twitterId: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    // ここでAPIにデータを送信する処理を追加します。
    // 例: axios.post('/api/bizcard', data)
    // .then(response => console.log(response))
    // .catch(error => console.error(error));
  });

  return (
    <Box
      bg={"white"}
      p={4}
      borderRadius="md"
      boxShadow="md">
      <Heading
        size="3xl"
        mb={4}>
        New BizCard
      </Heading>
      <Box>
        <form onSubmit={onSubmit}>
          <Text
            fontSize="lg"
            textAlign={"left"}
            mb={2}>
            お名前 *
          </Text>
          <Field
            label="ユーザ名"
            invalid={!!errors.userName}
            errorText={errors.userName?.message}>
            <Input
              mb={4}
              {...register("userName", {
                required: "ユーザ名は必須です。",
                maxLength: {
                  value: 20,
                  message: "20文字以内で入力してください。",
                },
              })}
            />
          </Field>

          <Field
            label="自己紹介"
            invalid={!!errors.description}
            errorText={errors.description?.message}>
            <Input
              mb={4}
              {...register("description", {
                required: "自己紹介は必須です。",
                maxLength: {
                  value: 100,
                  message: "100文字以内で入力してください。",
                },
              })}
            />
          </Field>

          <Text
            fontSize="lg"
            textAlign={"left"}
            mb={2}>
            自己紹介 *
          </Text>

          <Text
            fontSize="lg"
            textAlign={"left"}
            mb={2}>
            好きな技術 *
          </Text>
          <Input mb={4} />

          <Text
            fontSize="lg"
            textAlign={"left"}
            mb={2}>
            Github ID
          </Text>
          <Input mb={4} />

          <Text
            fontSize="lg"
            textAlign={"left"}
            mb={2}>
            Qiita ID
          </Text>
          <Input mb={4} />

          <Text
            fontSize="lg"
            textAlign={"left"}
            mb={2}>
            Twitter ID
          </Text>
          <Input mb={4} />

          <SubmitButton>登録</SubmitButton>
        </form>
      </Box>
    </Box>
  );
};
