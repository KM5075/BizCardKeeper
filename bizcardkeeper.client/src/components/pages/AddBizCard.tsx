import {
  Box,
  createListCollection,
  Heading,
  Input,
  ListCollection,
} from "@chakra-ui/react";
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
import { useEffect, useState } from "react";

type formData = {
  id: number;
  userName: string;
  description: string;
  skills: ListCollection<{ label: string; value: string }>;
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

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    axios
      .get<Skill[]>("/api/skills")
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const skillCollections = createListCollection({
    items: skills.map((skill) => ({
      label: skill.name,
      value: skill.id.toString(),
    })),
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      // Skillsをstring[]からskill[]に変換
      const convertedSkills: Skill[] = skills.filter((skill) =>
        data.skills.items.some((item) => item.value === skill.id.toString())
      );

      const userData: User = {
        ...data,
        skills: convertedSkills,
        displayUserInfo: () => {
          return `${data.userName} - ${data.description}`;
        },
      };

      await axios.post<User>("/api/cards", userData);
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
                  // value={field.value.items.map((item) => item.value)} // 修正: valueを配列に変更

                  onValueChange={(values) => field.onChange(values)} // 修正: 配列を受け取るように
                  multiple
                  collection={
                    skillCollections || createListCollection({ items: [] })
                  }>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCollections?.items.map((skill) => (
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
