export class Skill {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    displaySkillInfo(): string {
        return `Skill Info
                ID: ${this.id}
                Name: ${this.name}`;
    }
}