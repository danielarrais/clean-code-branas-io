import EnrollmentStudentValidation from "../validation/EnrollmentStudent.validation";
import EnrollmentStudentRepository from "../repository/EnrollmentStudentRepository";
import ModuleRepository from "../repository/ModuleRepository";
import ClassroomRepository from "../repository/ClassroomRepository";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import EnrollmentStudent from "../model/EnrollmentStudent";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";

export default class EnrollStudentService {
    private moduleRepository: ModuleRepository;
    private classroomRepository: ClassroomRepository;
    private enrollmentStudentRepository: EnrollmentStudentRepository;
    private enrollmentStudentValidation: EnrollmentStudentValidation;

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.moduleRepository = repositoryAbstractFactory.createModuleRepository();
        this.classroomRepository = repositoryAbstractFactory.createClassroomRepository();
        this.enrollmentStudentRepository = repositoryAbstractFactory.createEnrollmentStudentRepository();
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