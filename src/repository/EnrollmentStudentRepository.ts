import EnrollmentStudent from "../model/EnrollmentStudent";

export default interface EnrollmentStudentRepository {
    persist(student: EnrollmentStudent): void;
    findByStudentEnrollNumber(enrollNumber: string): EnrollmentStudent;
    existByCpf(cpf: string): boolean;
    getNextSequenceEnrollNumber(): string;
    countBy(classroom: string, level: string, module: string): number;
}