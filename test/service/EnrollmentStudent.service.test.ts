import EnrollmentStudentService from "../../src/service/EnrollmentStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import Module from "../../src/model/Module";
import ModuleRepository from "../../src/repository/ModuleRepository";
import DataBase from "../../src/repository/data-memory/DataBase";

let moduleRepository: ModuleRepository;
let enrollmentStudentService: EnrollmentStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    moduleRepository = new ModuleRepositoryMemory();
    enrollmentStudentService = new EnrollmentStudentService();
});

test("Should not enroll without valid student name", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"));
});

test("Should not enroll without valid student cpf", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "06412721381", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"));
});

test("Should not enroll duplicated student", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);

    enrollmentStudentService.execute(enrollmentRequest)

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"));
});

test("Should generate enrollment code", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);
    const enrollNumber = enrollmentStudentService.execute(enrollmentRequest).student.enrollNumber;
    const expectedEnrollNumber = `2021${module.level}${module.code}A0001`;

    expect(enrollNumber).toEqual(expectedEnrollNumber);
});

test("Should not enroll student below minimum age", () => {
    const module = getModuleWithClassroom();
    const invalidBirthDate = new Date();
    const student = new Student("Daniel Arrais", "33796308023", invalidBirthDate);
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Should not enroll student below minimum age"));
});

test("Should not enroll student over class capacity", () => {
    const module = getModuleWithClassroom();

    getValidStudents().forEach(student => {
        const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);
        enrollmentStudentService.execute(enrollmentRequest);
    })

    const student  = new Student("Thiago Silva", "54822460002", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Class is over capacity"));
});

test("Should not enroll after que end of the class", () => {
    const module = getModuleWithClassroomFinished();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "B", 12);

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Class is already finished"));
});

test("Should not enroll after 25% of the start of the class", () => {
    const module = getModuleWithClassroomStarted();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "C", 12);

    expect(() => enrollmentStudentService.execute(enrollmentRequest)).toThrow(new Error("Class is already started"));
});

test("Should generate the invoices based on the number of installments, rounding each amount and applying the rest in the last invoice", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);
    const enrollmentStudent = enrollmentStudentService.execute(enrollmentRequest);

    expect(enrollmentStudent.invoices).toHaveLength(12);
    expect(enrollmentStudent.invoices[0].amount).toBe(1416.66);
    expect(enrollmentStudent.invoices[11].amount).toBe(1416.73);
});

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findBy("1", "EM");
}

const getModuleWithClassroomFinished = (): Module => {
    return moduleRepository.findBy("3", "EM");
}

const getModuleWithClassroomStarted = (): Module => {
    return moduleRepository.findBy("3", "EM");
}

const getValidStudents = (): Student[] => {
    return [
        new Student("Daniel Arrais", "33796308023", new Date(1975)),
        new Student("Matheus Costa", "07905502023", new Date(1975))
    ]
}