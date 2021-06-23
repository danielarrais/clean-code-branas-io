import EnrollmentStudent from "../model/EnrollmentStudent";
import EnrollmentStatus from "../model/enum/EnrollmentStatus";

export default interface EnrollmentStudentRepository {
    persist(student: EnrollmentStudent): void;
    findByStudentEnrollNumber(enrollNumber: string): EnrollmentStudent;
    existByCpf(cpf: string): boolean;
    getNextSequenceEnrollNumber(): string;
    countBy(classroom: string, level: string, module: string): number;
    changeStatus(enrollNumber: string, status: EnrollmentStatus): void;
}