import { Skill } from "./Skill";

export class User {
  id: number;
  userName: string;
  description: string;
  githubId: string;
  qiitaId: string;
  twitterId: string;
  skills: Skill[];

  constructor(id: number, name: string, description: string, githubId: string, qiitaId: string, twitterId: string, skills: Skill[]) {
    this.id = id;
    this.userName = name;
    this.description = description;
    this.githubId = githubId;
    this.qiitaId = qiitaId;
    this.twitterId = twitterId;
    this.skills = skills;
  }

  displayUserInfo(): string {
    return `User Info
                ID: ${this.id}
                Name: ${this.userName}
                Description: ${this.description}
                GitHub ID: ${this.githubId}
                Qiita ID: ${this.qiitaId}
                X ID: ${this.twitterId}
                Skills: ${this.skills.map(skill => skill.name).join(', ')}`;
  }
}
