import { Skill } from "./Skill";

export class User {
    id: number;
    name: string;
    description: string;
    github_id: string;
    qiita_id: string;
    x_id: string;
    skills: Skill[];

    constructor(id: number, name: string, description: string, github_id: string, qiita_id: string, x_id: string, skills: Skill[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.github_id = github_id;
        this.qiita_id = qiita_id;
        this.x_id = x_id;
        this.skills = skills;
    }

    displayUserInfo(): string {
        return `User Info
                ID: ${this.id}
                Name: ${this.name}
                Description: ${this.description}
                GitHub ID: ${this.github_id}
                Qiita ID: ${this.qiita_id}
                X ID: ${this.x_id}
                Skills: ${this.skills.map(skill => skill.name).join(', ')}`;
    }
}