import Student from "./Student";

export default class EnrollmentRequest {
    student: Student;
    module: string;
    level: string;
    classe: string;

    constructor(student: Student, module: string, level: string, classe: string) {
        this.student = student;
        this.module = module;
        this.level = level;
        this.classe = classe;
    }

    public generateEnrollNumber(enrollSequence: string): string {
        const currentYear = new Date().getFullYear();
        const enrollSequencePad = enrollSequence.padStart( 4, "0");

        return `${currentYear}${this.level}${this.module}${this.classe}${enrollSequencePad}`
    }
}