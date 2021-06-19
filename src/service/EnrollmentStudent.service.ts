import EnrollmentStudentRepositoryMemory from "../repository/EnrollmentStudentRepositoryMemory";
import EnrollmentStudentValidation from "../validation/EnrollmentStudent.validation";
import EnrollmentStudentRepository from "../repository/EnrollmentStudentRepository";
import ModuleRepository from "../repository/ModuleRepository";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepository from "../repository/ClassroomRepository";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import EnrollmentStudent from "../model/EnrollmentStudent";

export default class EnrollmentStudentService {
    private moduleRepository: ModuleRepository;
    private classroomRepository: ClassroomRepository;
    private enrollmentStudentRepository: EnrollmentStudentRepository;
    private enrollmentStudentValidation: EnrollmentStudentValidation;

    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classroomRepository = new ClassroomRepositoryMemory();
        this.enrollmentStudentRepository = new EnrollmentStudentRepositoryMemory();
        this.enrollmentStudentValidation = new EnrollmentStudentValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): EnrollmentStudent {
        const enrollmentStudent = this.requestToEntity(enrollmentRequest);
        this.enrollmentStudentValidation.execute(enrollmentStudent);
        this.enroll(enrollmentStudent);

        return enrollmentStudent;
    }

    private requestToEntity(enrollmentRequest: EnrollmentRequest): EnrollmentStudent {
        const module = this.moduleRepository.findBy(enrollmentRequest.module, enrollmentRequest.level);
        const classroom = this.classroomRepository.findBy(enrollmentRequest.classroom, enrollmentRequest.level, module.code);
        return EnrollmentStudent.builder()
            .student(enrollmentRequest.student)
            .level(enrollmentRequest.level)
            .module(module)
            .classroom(classroom)
            .issueDate(enrollmentRequest.issueDate)
            .installments(enrollmentRequest.installments)
            .build();
    }

    private enroll(enrollmentStudent: EnrollmentStudent) {
        const nextSequenceEnrollNumber = this.enrollmentStudentRepository.getNextSequenceEnrollNumber();
        enrollmentStudent.generateEnrollNumber(nextSequenceEnrollNumber);
        enrollmentStudent.generateInvoices();

        this.enrollmentStudentRepository.persist(enrollmentStudent);
    }
}