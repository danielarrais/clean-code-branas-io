import Student from "../model/Student";
import EnrollStudentRepository from "./EnrollStudentRepository";
import EnrollStudent from "../model/EnrollStudent";

export default class EnrollStudentRepositoryMemory implements EnrollStudentRepository{
    private enrollStudents: EnrollStudent[] = []

    persist(student: EnrollStudent): void {
        this.enrollStudents.push(student)
    }

    getNextSequenceEnrollNumber(): string {
        return `${this.enrollStudents.length + 1}`;
    }

    existByCpf(cpf: string): boolean {
        return this.enrollStudents.some((enrollStudent) => enrollStudent.student.cpf === cpf);
    }
}