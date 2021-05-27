import EnrollStudent from "./EnrollStudent";
import Student from "./Student";
import EnrollmentRequest from "./EnrollmentRequest";

test("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudent();
    const student = new Student("Daniel", "06412721380");
    const enrollmentRequest = new EnrollmentRequest(student);

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})

test("Should not enroll without valid student cpf", () => {
    const enrollStudent = new EnrollStudent();
    const student = new Student("Daniel Arrais", "06412721381");
    const enrollmentRequest = new EnrollmentRequest(student);

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
})