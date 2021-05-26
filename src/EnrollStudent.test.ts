import EnrollStudent from "./EnrollStudent";

test("Should not enroll without valid student name", function () {
    const enrollStudent = new EnrollStudent();
    const enrollmentRequest = {
        "student" : {
            "name" : "Daniel Arrais"
        }
    }

    expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error("Invalid student name"))
})