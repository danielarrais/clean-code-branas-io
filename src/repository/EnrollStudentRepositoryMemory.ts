import EnrollStudentRepository from "./EnrollStudentRepository";
import EnrollStudent from "../model/EnrollStudent";
import DataBase from "../DataBase";

export default class EnrollStudentRepositoryMemory implements EnrollStudentRepository {
    persist(student: EnrollStudent): void {
        DataBase.data.enrollStudents.push(student)
    }

    getNextSequenceEnrollNumber(): string {
        return `${DataBase.data.enrollStudents.length + 1}`;
    }

    existByCpf(cpf: string): boolean {
        return DataBase.data.enrollStudents.filter((enrollStudent: EnrollStudent) => enrollStudent.student.cpf === cpf).length > 0;
    }

    countByClassroomAndModuleAndLevel(classroom: string, level: string, module: string): number {
        return DataBase.data.enrollStudents.filter((enrollStudent: EnrollStudent) => {
            return enrollStudent.classroom === classroom &&
                enrollStudent.module == module &&
                enrollStudent.level == level
        }).length;
    }
}