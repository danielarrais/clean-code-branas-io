import EnrollmentRequest from "../model/EnrollmentRequest";
import DateUtil from "../util/Date.util";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";

export default class EnrollmentRequestValidation {
    private moduleRepository: ModuleRepositoryMemory
    private classeRepository: ClassroomRepositoryMemory

    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classeRepository = new ClassroomRepositoryMemory();
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        const student = enrollmentRequest.student;

        this.validateMinimumAge(student.birthDate, enrollmentRequest.module, enrollmentRequest.level);
        // this.validateCapacityOfClasse(enrollmentRequest.classe);
    }

    validateCapacityOfClasse() {

    }

    validateMinimumAge(studentBirthDate: Date, muduleCode: string, level: string) {
        const minimumAgeOfModule = this.moduleRepository.findMinimumAgeByCodeAndLevel(muduleCode, level);
        const age = DateUtil.calculateAge(studentBirthDate)

        if (!minimumAgeOfModule || age < minimumAgeOfModule) {
            throw new Error("Should not enroll student below minimum age")
        }
    }
}