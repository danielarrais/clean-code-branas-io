import Student from "../model/Student";

export default class EnrollmentRequest {
    student: Student;
    module: string;
    level: string;
    classroom: string;

    constructor(student: Student, module: string, level: string, classroom: string) {
        this.student = student;
        this.module = module;
        this.level = level;
        this.classroom = classroom;
    }
}