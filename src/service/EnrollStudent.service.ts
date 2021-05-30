import StudentRepository from "../repository/Student.repository";
import EnrollmentRequest from "../model/EnrollmentRequest";
import StudentValidation from "../validation/Student.validation";

export default class EnrollStudentService {
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