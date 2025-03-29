import { Box, Heading, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { User } from "../../classes/User";
import { Field } from "../ui/field";
import { SubmitButton } from "../atoms/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      const res = await axios.post<User>("/api/cards", data);
      console.log(res.data);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
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

          <Field
            label="好きな技術"
            invalid={!!errors.skills}
            errorText={errors.skills?.message}>
            <Input
              mb={4}
              {...register("skills")}
            />
          </Field>

          <Field
            label="Github ID"
            invalid={!!errors.githubId}
            errorText={errors.githubId?.message}>
            <Input
              mb={4}
              {...register("githubId", {
                maxLength: {
                  value: 50,
                  message: "50文字以内で入力してください。",
                },
              })}
            />
          </Field>

          <Field
            label="Qiita ID"
            invalid={!!errors.qiitaId}
            errorText={errors.qiitaId?.message}>
            <Input
              mb={4}
              {...register("qiitaId", {
                maxLength: {
                  value: 30,
                  message: "30文字以内で入力してください。",
                },
              })}
            />
          </Field>

          <Field
            label="Twitter ID"
            invalid={!!errors.twitterId}
            errorText={errors.twitterId?.message}>
            <Input
              mb={4}
              {...register("twitterId", {
                maxLength: {
                  value: 30,
                  message: "30文字以内で入力してください。",
                },
              })}
            />
          </Field>

          <SubmitButton>登録</SubmitButton>
        </form>
      </Box>
    </Box>
  );
};
