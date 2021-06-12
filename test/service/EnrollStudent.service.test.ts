import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/model/EnrollmentRequest";
import {data} from "../../src/Data";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import ClassroomRepository from "../../src/repository/ClassroomRepository";
import ClassroomRepositoryMemory from "../../src/repository/ClassroomRepositoryMemory";
import Module from "../../src/model/Module";

const LEVEL = data.levels[1];
const CLASSE = data.classes[0];

let classroomRepository: ClassroomRepository;
let moduleRepository: ModuleRepositoryMemory;
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    classroomRepository = new ClassroomRepositoryMemory();
    moduleRepository = new ModuleRepositoryMemory();
    enrollStudentService = new EnrollStudentService();
})

test("Should not enroll without valid student name", () => {
    const module = getAnyModule();
    const student = new Student("Daniel", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})

test("Should not enroll without valid student cpf", () => {
    const module = getAnyModule();
    const student = new Student("Daniel Arrais", "06412721381", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
})

test("Should not enroll duplicated student", () => {
    const module = getAnyModule();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);

    enrollStudentService.execute(enrollmentRequest)

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
})

test("Should generate enrollment code", () => {
    const module = getAnyModule();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);
    const enrollNumber = enrollStudentService.execute(enrollmentRequest)
    const expectedEnrollNumber = enrollmentRequest.generateEnrollNumber("1");

    expect(enrollNumber).toEqual(expectedEnrollNumber)
})

test("Should not enroll student below minimum age", () => {
    const module = getAnyModule();
    const invalidBirthDate = new Date();
    const student = new Student("Daniel Arrais", "33796308023", invalidBirthDate);
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Should not enroll student below minimum age"))
})

test("Should not enroll student over class capacity", () => {
    const module = getAnyModule();

    getValidStudents().forEach(student => {
        const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);
        enrollStudentService.execute(enrollmentRequest);
    })

    const student  = new Student("Thiago Silva", "07905502023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, CLASSE.code);

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"))
})

const getAnyModule = (): Module => {
    return moduleRepository.findAny();
}

const getValidStudents = (): Student[] => {
    return [
        new Student("Daniel Arrais", "33796308023", new Date(1975)),
        new Student("Thiago Silva", "07905502023", new Date(1975))
    ]
}