export default class Student {
    name: string;
    cpf: string;
    birthDate: Date;
    enrollNumber!: string;

    constructor(name: string, cpf: string, birthDate: Date) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
    }
}