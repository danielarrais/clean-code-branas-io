import Student from "../model/Student";

export default interface StudentRepository {
    persist(student: Student): void;
    existByCpf(cpf: string): boolean;
    getNextSequenceEnrollNumber(): string;
}