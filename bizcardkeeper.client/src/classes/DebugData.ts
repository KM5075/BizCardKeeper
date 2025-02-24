import { User } from "./User";
import { Skill } from "./Skill";

const debugSkills: Skill[] = [
  new Skill(1, "React"),
  new Skill(2, "Vue"),
  new Skill(3, "Node.js"),
  new Skill(4, "Express"),
  new Skill(5, "MySQL"),
  new Skill(6, "PostgreSQL"),
  new Skill(7, "Docker"),
  new Skill(8, "AWS"),
];

export const debugUser: User = new User(
  1,
  "John Doe",
  "Software Engineer",
  "Github",
  "Qiita",
  "twitter",
  debugSkills
);
