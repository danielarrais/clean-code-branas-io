import StudentRepository from "../repository/Student.repository";
import EnrollmentRequest from "../model/EnrollmentRequest";
import StudentValidation from "../validation/Student.validation";
import EnrollmentRequestValidation from "../validation/EnrollmentRequest.validation";

export default class EnrollStudentService {
    studentRepository: StudentRepository;
    studentValidation: StudentValidation;
    enrollmentRequestValidation: EnrollmentRequestValidation;

    constructor() {
        this.studentRepository = new StudentRepository();
        this.studentValidation = new StudentValidation(this.studentRepository);
        this.enrollmentRequestValidation = new EnrollmentRequestValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): string {
        this.studentValidation.execute(enrollmentRequest.student);
        this.enrollmentRequestValidation.execute(enrollmentRequest)

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