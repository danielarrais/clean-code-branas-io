import EnrollmentRequest from "../dto/EnrollmentRequest";
import DateUtil from "../util/Date.util";
import ModuleRepository from "../repository/ModuleRepositoryMemory";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepository from "../repository/ClassroomRepositoryMemory";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";
import CPFValidation from "./CPF.validation";
import EnrollmentStudentRepository from "../repository/EnrollmentStudentRepositoryMemory";
import EnrollmentStudentRepositoryMemory from "../repository/EnrollmentStudentRepositoryMemory";
import EnrollmentStudent from "../model/EnrollmentStudent";

export default class EnrollmentStudentValidation {
    private moduleRepository: ModuleRepository;
    private classroomRepository: ClassroomRepository;
    private enrollmentStudentRepository: EnrollmentStudentRepository;

    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classroomRepository = new ClassroomRepositoryMemory();
        this.enrollmentStudentRepository = new EnrollmentStudentRepositoryMemory();
    }

    public execute(enrollmentStudent: EnrollmentStudent): void {
        const student = enrollmentStudent.student;

        this.validateCPF(student.cpf);
        this.validateName(student.name);
        this.validateUnique(student.cpf);
        this.validateMinimumAge(student.birthDate, enrollmentStudent.module.code, enrollmentStudent.level);
        this.validateClassroomNotFinished(enrollmentStudent.classroom.code, enrollmentStudent.module.code, enrollmentStudent.level);
        this.validateClassroomStarted(enrollmentStudent.classroom.code, enrollmentStudent.module.code, enrollmentStudent.level);
        this.validateCapacityOfClasse(enrollmentStudent.classroom.code, enrollmentStudent.module.code, enrollmentStudent.level);
    }

    private validateUnique(cpf: string): void {
        if (this.enrollmentStudentRepository.existByCpf(cpf)) {
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
        const classroomCapacity = this.classroomRepository.findCapacityBy(classroom, level, module)
        const totalEnrollmentInTheClassroom = this.enrollmentStudentRepository.countBy(classroom, level, module)
        if (totalEnrollmentInTheClassroom === classroomCapacity) {
            throw new Error("Class is over capacity")
        }
    }

    validateMinimumAge(studentBirthDate: Date, muduleCode: string, level: string) {
        const minimumAgeOfModule = this.moduleRepository.findMinimumAgeBy(muduleCode, level);
        const age = DateUtil.calculateAge(studentBirthDate)

        if (!minimumAgeOfModule || age < minimumAgeOfModule) {
            throw new Error("Should not enroll student below minimum age")
        }
    }

    validateClassroomNotFinished(classroom: string, module: string, level: string): void {
        const endDate = this.classroomRepository.findEndDateBy(classroom, level, module);
        const currentDate = new Date();

        if (currentDate.getTime() > endDate.getTime()) {
            throw new Error("Class is already finished")
        }
    }

    validateClassroomStarted(classroom: string, module: string, level: string): void {
        const startDate = this.classroomRepository.findStartDateBy(classroom, level, module);
        const endDate = this.classroomRepository.findEndDateBy(classroom, level, module);

        const everyDayOfTheRange = DateUtil.calculateDaysOfRange(startDate, endDate);
        const everyDayUntilToday = DateUtil.calculateDaysOfRange(startDate, new Date());

        const percentageOfDaysLost = (100 * everyDayUntilToday) / everyDayOfTheRange;
        const daysLatePercentageLimit = 25;

        if (percentageOfDaysLost > daysLatePercentageLimit) {
            throw new Error("Class is already started")
        }
    }
}