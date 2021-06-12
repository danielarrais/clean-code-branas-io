import EnrollStudent from "../model/EnrollStudent";

export default interface EnrollStudentRepository {
    persist(student: EnrollStudent): void;
    existByCpf(cpf: string): boolean;
    getNextSequenceEnrollNumber(): string;
    countByClassroomAndModuleAndLevel(classroom: string, level: string, module: string): number;
}