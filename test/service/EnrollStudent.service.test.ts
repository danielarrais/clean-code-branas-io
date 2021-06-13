import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import ClassroomRepository from "../../src/repository/ClassroomRepository";
import ClassroomRepositoryMemory from "../../src/repository/ClassroomRepositoryMemory";
import Module from "../../src/model/Module";
import ModuleRepository from "../../src/repository/ModuleRepository";
import DataBase from "../../src/repository/data-memory/DataBase";

let classroomRepository: ClassroomRepository;
let moduleRepository: ModuleRepository;
let enrollStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    classroomRepository = new ClassroomRepositoryMemory();
    moduleRepository = new ModuleRepositoryMemory();
    enrollStudentService = new EnrollStudentService();
})

test("Should not enroll without valid student name", () => {
    const module = getModuleThatHasClassroom();
    const student = new Student("Daniel", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})

test("Should not enroll without valid student cpf", () => {
    const module = getModuleThatHasClassroom();
    const student = new Student("Daniel Arrais", "06412721381", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
})

test("Should not enroll duplicated student", () => {
    const module = getModuleThatHasClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");

    enrollStudentService.execute(enrollmentRequest)

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
})

test("Should generate enrollment code", () => {
    const module = getModuleThatHasClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");
    const enrollNumber = enrollStudentService.execute(enrollmentRequest)
    const expectedEnrollNumber = `2021${module.level}${module.code}A0001`;

    expect(enrollNumber).toEqual(expectedEnrollNumber)
})

test("Should not enroll student below minimum age", () => {
    const module = getModuleThatHasClassroom();
    const invalidBirthDate = new Date();
    const student = new Student("Daniel Arrais", "33796308023", invalidBirthDate);
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Should not enroll student below minimum age"))
})

test("Should not enroll student over class capacity", () => {
    const module = getModuleThatHasClassroom();

    getValidStudents().forEach(student => {
        const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");
        enrollStudentService.execute(enrollmentRequest);
    })

    const student  = new Student("Thiago Silva", "54822460002", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "A");

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"))
})

test("Should not enroll after que end of the class", () => {
    const module = getModuleThatHasClassroomFinished();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, module.code, module.level, "B");

    expect(() => enrollStudentService.execute(enrollmentRequest)).toThrow(new Error("Class is already finished"))
})

const getModuleThatHasClassroom = (): Module => {
    return moduleRepository.findBy("1", "EM");
}

const getModuleThatHasClassroomFinished = (): Module => {
    return moduleRepository.findBy("3", "EM");
}

const getValidStudents = (): Student[] => {
    return [
        new Student("Daniel Arrais", "33796308023", new Date(1975)),
        new Student("Matheus Costa", "07905502023", new Date(1975))
    ]
}