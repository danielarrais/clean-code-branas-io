import EnrollmentStudentRepository from "./EnrollmentStudentRepository";
import EnrollmentStudent from "../model/EnrollmentStudent";
import DataBase from "./data-memory/DataBase";

export default class EnrollmentStudentRepositoryMemory implements EnrollmentStudentRepository {
    persist(student: EnrollmentStudent): void {
        DataBase.data.enrollmentStudents.push(student);
    }

    getNextSequenceEnrollNumber(): string {
        return `${DataBase.data.enrollmentStudents.length + 1}`;
    }

    findByStudentEnrollNumber(enrollNumber: string): EnrollmentStudent {
        return DataBase.data.enrollmentStudents.find((enrollmentStudent: EnrollmentStudent) => enrollmentStudent.student.enrollNumber === enrollNumber);
    }

    existByCpf(cpf: string): boolean {
        return DataBase.data.enrollmentStudents.filter((enrollmentStudent: EnrollmentStudent) => enrollmentStudent.student.cpf === cpf).length > 0;
    }

    countBy(classroom: string, level: string, module: string): number {
        return DataBase.data.enrollmentStudents.filter((enrollmentStudent: EnrollmentStudent) => {
            return enrollmentStudent.classroom.code === classroom &&
                enrollmentStudent.module.code === module &&
                enrollmentStudent.level === level
        }).length;
    }
}