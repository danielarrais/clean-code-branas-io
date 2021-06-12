import Student from "../model/Student";
import StudentRepository from "./StudentRepository";

export default class StudentRepositoryMemory implements StudentRepository{
    private students: Student[] = []

    persist(student: Student): void {
        this.students.push(student)
    }

    getNextSequenceEnrollNumber(): string {
        return `${this.students.length + 1}`;
    }

    existByCpf(cpf: string): boolean {
        return this.students.some((student) => student.cpf === cpf);
    }
}