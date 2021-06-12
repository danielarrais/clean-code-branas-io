import Student from "../model/Student";
import EnrollStudent from "../model/EnrollStudent";

export default interface EnrollStudentRepository {
    persist(student: EnrollStudent): void;
    existByCpf(cpf: string): boolean;
    getNextSequenceEnrollNumber(): string;
}