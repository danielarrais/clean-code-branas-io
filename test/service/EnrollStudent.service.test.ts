import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/model/EnrollmentRequest";
import {data} from "../../src/Data";

const LEVEL = data.levels[1];
const MODULE = data.modules[1];
const CLASSE = data.classes[0];

test("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudentService();
    const student = new Student("Daniel", "06412721380", new Date());
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASSE.code);

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})

test("Should not enroll without valid student cpf", () => {
    const enrollStudent = new EnrollStudentService();
    const student = new Student("Daniel Arrais", "06412721381", new Date());
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASSE.code);

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
})

test("Should not enroll duplicated student", () => {
    const enrollStudent = new EnrollStudentService();
    const student = new Student("Daniel Arrais", "06412721380", new Date());
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASSE.code);

    enrollStudent.execute(enrollmentRequest)

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Enrollment with duplicated student is not allowed"))
})

test("Should generate enrollment code", () => {
    const enrollStudent = new EnrollStudentService();
    const student = new Student("Daniel Arrais", "06412721380", new Date());
    const enrollmentRequest = new EnrollmentRequest(student, LEVEL.code, MODULE.code, CLASSE.code);
    const enrollNumber = enrollStudent.execute(enrollmentRequest)
    const expectedEnrollNumber = enrollmentRequest.generateEnrollNumber("1");

    expect(enrollNumber).toEqual(expectedEnrollNumber)
})

