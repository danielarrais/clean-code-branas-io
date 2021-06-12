import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import EnrollStudentValidation from "../validation/EnrollmentRequest.validation";
import EnrollStudent from "../model/EnrollStudent";

export default class EnrollStudentService {
    enrollStudentRepository: EnrollStudentRepositoryMemory;
    enrollStudentValidation: EnrollStudentValidation;

    constructor() {
        this.enrollStudentRepository = new EnrollStudentRepositoryMemory();
        this.enrollStudentValidation = new EnrollStudentValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): string {
        this.enrollStudentValidation.execute(enrollmentRequest)
        this.enroll(enrollmentRequest);

        return enrollmentRequest.student.enrollNumber
    }

    private enroll(enrollmentRequest: EnrollmentRequest) {
        const enrollStudent = new EnrollStudent(
            enrollmentRequest.student,  
            enrollmentRequest.level, 
            enrollmentRequest.module,
            enrollmentRequest.classroom)

        const nextSequenceEnrollNumber = this.enrollStudentRepository.getNextSequenceEnrollNumber();
        enrollStudent.generateEnrollNumber(nextSequenceEnrollNumber);

        this.enrollStudentRepository.persist(enrollStudent);
    }
}