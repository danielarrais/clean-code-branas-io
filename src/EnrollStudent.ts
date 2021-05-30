import StudentRepository from "./Student.repository";
import EnrollmentRequest from "./EnrollmentRequest";
import StudentValidation from "./Student.validation";

export default class EnrollStudent {
    studentRepository: StudentRepository;
    studentValidation: StudentValidation;

    constructor() {
        this.studentRepository = new StudentRepository();
        this.studentValidation = new StudentValidation(this.studentRepository);
    }

    execute(enrollmentRequest: EnrollmentRequest): string {
        this.studentValidation.execute(enrollmentRequest.student);

        this.enroll(enrollmentRequest);

        return enrollmentRequest.student.enrollNumber
    }

    private enroll(enrollmentRequest: EnrollmentRequest) {
        const student = enrollmentRequest.student;
        const nextSequenceEnrollNumber = this.studentRepository.getNextSequenceEnrollNumber();

        student.enrollNumber = enrollmentRequest.generateEnrollNumber(nextSequenceEnrollNumber);

        this.studentRepository.persist(student);
    }
}