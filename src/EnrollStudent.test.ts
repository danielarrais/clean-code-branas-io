import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        "student" : {
            "name" : "Daniel",
            "cpf" : "06412721380"
        }
    }

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})

test("Should not enroll without valid student cpf", () => {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        "student" : {
            "name" : "Daniel Arrais",
            "cpf" : "064.127.213-90"
        }
    }

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student cpf"))
})