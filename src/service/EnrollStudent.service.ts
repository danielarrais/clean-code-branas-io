import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import StudentValidation from "../validation/Student.validation";
import EnrollmentRequestValidation from "../validation/EnrollmentRequest.validation";

export default class EnrollStudentService {
    enrollStudentRepository: EnrollStudentRepositoryMemory;
    studentValidation: StudentValidation;
    enrollmentRequestValidation: EnrollmentRequestValidation;

    constructor() {
        this.enrollStudentRepository = new EnrollStudentRepositoryMemory();
        this.studentValidation = new StudentValidation(this.enrollStudentRepository);
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
        const nextSequenceEnrollNumber = this.enrollStudentRepository.getNextSequenceEnrollNumber();

        student.enrollNumber = enrollmentRequest.generateEnrollNumber(nextSequenceEnrollNumber);

        this.enrollStudentRepository.persist(enrollmentRequest);
    }
}