import Student from "../model/Student";

export default class EnrollmentRequest {
    student: Student;
    module: string;
    level: string;
    classroom: string;
    installments: number;
    issueDate: Date;

    constructor(student: Student, issueDate: Date, module: string, level: string, classroom: string, installments: number) {
        this.student = student;
        this.module = module;
        this.level = level;
        this.classroom = classroom;
        this.installments = installments;
        this.issueDate = issueDate;
    }
}