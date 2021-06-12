import Student from "./Student";

export default class EnrollStudent {
    student: Student;
    level: string;
    module:  string;
    classroom:  string;

    constructor(student: Student, level: string, module: string, classRoom: string) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classroom = classRoom;
    }

    public generateEnrollNumber(enrollSequence: string): void {
        const currentYear = new Date().getFullYear();
        const enrollSequencePad = enrollSequence.padStart( 4, "0");
        this.student.enrollNumber = `${currentYear}${this.level}${this.module}${this.classroom}${enrollSequencePad}`;
    }
}