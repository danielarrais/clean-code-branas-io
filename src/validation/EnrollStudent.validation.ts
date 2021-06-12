import EnrollmentRequest from "../dto/EnrollmentRequest";
import DateUtil from "../util/Date.util";
import ModuleRepository from "../repository/ModuleRepositoryMemory";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepository from "../repository/ClassroomRepositoryMemory";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";
import CPFValidation from "./CPF.validation";
import EnrollStudentRepository from "../repository/EnrollStudentRepositoryMemory";
import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";

export default class EnrollStudentValidation {
    private moduleRepository: ModuleRepository;
    private classroomRepository: ClassroomRepository;
    private enrollStudentRepository: EnrollStudentRepository;

    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classroomRepository = new ClassroomRepositoryMemory();
        this.enrollStudentRepository = new EnrollStudentRepositoryMemory();
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        const student = enrollmentRequest.student;

        this.validateCPF(student.cpf);
        this.validateName(student.name);
        this.validateUnique(student.cpf);
        this.validateMinimumAge(student.birthDate, enrollmentRequest.module, enrollmentRequest.level);
        this.validateCapacityOfClasse(enrollmentRequest.classroom, enrollmentRequest.module, enrollmentRequest.level);
    }

    private validateUnique(cpf: string): void {
        if (this.enrollStudentRepository.existByCpf(cpf)) {
            throw new Error("Enrollment with duplicated student is not allowed");
        }
    }

    private validateName(name: string): void {
        if (!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)) {
            throw new Error("Invalid student name");
        }
    }

    private validateCPF(cpf: string): void {
        if (!CPFValidation.exec(cpf)) {
            throw new Error("Invalid student cpf");
        }
    }

    validateCapacityOfClasse(classroom: string, module: string, level: string) {
        const classroomCapacity = this.classroomRepository.findCapacityByCodeAndModuleAndLevel(classroom, level, module)
        const actualNumberOfStudents = this.enrollStudentRepository.countByClassroomAndModuleAndLevel(classroom, level, module)
        console.log(actualNumberOfStudents);
        if (actualNumberOfStudents > classroomCapacity) {
            throw new Error("Class is over capacity")
        }
    }

    validateMinimumAge(studentBirthDate: Date, muduleCode: string, level: string) {
        const minimumAgeOfModule = this.moduleRepository.findMinimumAgeByCodeAndLevel(muduleCode, level);
        const age = DateUtil.calculateAge(studentBirthDate)

        if (!minimumAgeOfModule || age < minimumAgeOfModule) {
            throw new Error("Should not enroll student below minimum age")
        }
    }
}