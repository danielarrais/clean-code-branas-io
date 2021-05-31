import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/model/EnrollmentRequest";
import {data} from "../../src/Data";
import ModuleRepository from "../../src/repository/Module.repository";

const LEVEL = data.levels[1];
const CLASSE = data.classes[0];

let moduleRepository: ModuleRepository;
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    moduleRepository = new ModuleRepository();
    enrollStudentService = new EnrollStudentService();
})

test("Should not enroll without valid student name", () => {
    const student = new Student("Daniel", "06412721380", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, getAnyModuleCode(), LEVEL.code, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})

test("Should not enroll without valid student cpf", () => {
    const student = new Student("Daniel Arrais", "06412721381", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, getAnyModuleCode(), LEVEL.code, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
})

test("Should not enroll duplicated student", () => {
    const student = new Student("Daniel Arrais", "06412721380", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, getAnyModuleCode(), LEVEL.code, CLASSE.code);

    enrollStudentService.execute(enrollmentRequest)

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
})

test("Should generate enrollment code", () => {
    const student = new Student("Daniel Arrais", "06412721380", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, getAnyModuleCode(), LEVEL.code, CLASSE.code);
    const enrollNumber = enrollStudentService.execute(enrollmentRequest)
    const expectedEnrollNumber = enrollmentRequest.generateEnrollNumber("1");

    expect(enrollNumber).toEqual(expectedEnrollNumber)
})

test("Should not enroll student below minimum age", () => {
    const module = getAnyModule();
    const invalidBirthDate = getInvalidBirthDateForMinimumAge(module.minimumAge);
    const student = new Student("Daniel Arrais", "06412721380", invalidBirthDate);
    const enrollmentRequest = new EnrollmentRequest(student, module.code, LEVEL.code, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Should not enroll student below minimum age"))
})

const getAnyModuleCode = () => {
    return getAnyModule().code;
}

const getAnyModule = () => {
    return moduleRepository.findAny();
}

const getInvalidBirthDateForMinimumAge = (minimumAge: number): Date => {
    const currentYear = new Date().getFullYear();
    const invalidYear = currentYear - (minimumAge - 1);

    return new Date(invalidYear, 1, 1);
}