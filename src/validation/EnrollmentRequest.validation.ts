import EnrollmentRequest from "../model/EnrollmentRequest";
import DateUtil from "../util/Date.util";
import ModuleRepository from "../repository/Module.repository";

export default class EnrollmentRequestValidation {
    private moduleRepository: ModuleRepository

    constructor() {
        this.moduleRepository = new ModuleRepository();
    }

    public execute(enrollmentRequest: EnrollmentRequest): void {
        const student = enrollmentRequest.student;

        this.validateMinimumAge(student.birthDate, enrollmentRequest.module);
    }

    validateMinimumAge(studentBirthDate: Date, muduleCode: string) {
        const minimumAgeOfModule = this.moduleRepository.findMinimumAgeByCode(muduleCode);
        const age = DateUtil.calculateAge(studentBirthDate)

        if (!minimumAgeOfModule || age < minimumAgeOfModule) {
            throw new Error("Should not enroll student below minimum age")
        }
    }
}