import { Box, createListCollection, Heading, Input } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { User } from "../../classes/User";
import { Field } from "../ui/field";
import { SubmitButton } from "../atoms/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Skill } from "../../classes/Skill";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

type formData = {
  id: number;
  userName: string;
  description: string;
  skills: string[];
  githubId: string;
  qiitaId: string;
  twitterId: string;
};

export const AddBizCard = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formData>({
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

  const tempSkills: Skill[] = [
    { id: 1, name: "JavaScript", displaySkillInfo: () => "JavaScript" },
    { id: 2, name: "TypeScript", displaySkillInfo: () => "TypeScript" },
    { id: 3, name: "React", displaySkillInfo: () => "React" },
    { id: 4, name: "Node.js", displaySkillInfo: () => "Node.js" },
    { id: 5, name: "Python", displaySkillInfo: () => "Python" },
  ];

  const skills = createListCollection({
    items: tempSkills.map((skill) => ({
      label: skill.name,
      value: skill.id.toString(),
    })),
  });

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
            <Controller
              name="skills"
              control={control}
              rules={{
                required: "好きな技術の入力は必須です",
              }}
              render={({ field }) => (
                <SelectRoot
                  name={field.name}
                  value={field.value}
                  onValueChange={(values) => field.onChange(values)} // 修正: 配列を受け取るように
                  multiple
                  collection={skills || createListCollection({ items: [] })}>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills?.items.map((skill) => (
                      <SelectItem
                        item={skill}
                        key={skill.value}>
                        {skill.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              )}
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
