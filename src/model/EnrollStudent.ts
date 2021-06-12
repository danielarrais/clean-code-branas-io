import Student from "./Student";
import EnrollmentRequest from "../dto/EnrollmentRequest";

export default class EnrollStudent {
    student: Student;
    level: string;
    module: string;
    classroom: string;

    constructor(enrollmentRequest: EnrollmentRequest) {
        this.student = enrollmentRequest.student;
        this.level = enrollmentRequest.level;
        this.module = enrollmentRequest.module;
        this.classroom = enrollmentRequest.classroom
    }

    public generateEnrollNumber(enrollSequence: string): void {
        const currentYear = new Date().getFullYear();
        const enrollSequencePad = enrollSequence.padStart(4, "0");
        this.student.enrollNumber = `${currentYear}${this.level}${this.module}${this.classroom}${enrollSequencePad}`;
    }
}