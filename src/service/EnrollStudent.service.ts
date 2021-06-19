import EnrollStudentRepositoryMemory from "../repository/EnrollStudentRepositoryMemory";
import EnrollStudentValidation from "../validation/EnrollStudent.validation";
import EnrollStudentRepository from "../repository/EnrollStudentRepository";
import ModuleRepository from "../repository/ModuleRepository";
import ModuleRepositoryMemory from "../repository/ModuleRepositoryMemory";
import ClassroomRepository from "../repository/ClassroomRepository";
import ClassroomRepositoryMemory from "../repository/ClassroomRepositoryMemory";
import EnrollmentRequest from "../dto/EnrollmentRequest";
import EnrollStudent from "../model/EnrollStudent";

export default class EnrollStudentService {
    moduleRepository: ModuleRepository;
    classroomRepository: ClassroomRepository;
    enrollStudentRepository: EnrollStudentRepository;
    enrollStudentValidation: EnrollStudentValidation;

    constructor() {
        this.moduleRepository = new ModuleRepositoryMemory();
        this.classroomRepository = new ClassroomRepositoryMemory();
        this.enrollStudentRepository = new EnrollStudentRepositoryMemory();
        this.enrollStudentValidation = new EnrollStudentValidation();
    }

    execute(enrollmentRequest: EnrollmentRequest): EnrollStudent {
        const enrollStudent = this.requestToEntity(enrollmentRequest);
        console.log(enrollStudent);
        this.enrollStudentValidation.execute(enrollStudent);
        this.enroll(enrollStudent);

        return enrollStudent;
    }

    private requestToEntity(enrollmentRequest: EnrollmentRequest): EnrollStudent {
        const module = this.moduleRepository.findBy(enrollmentRequest.module, enrollmentRequest.level);
        const classroom = this.classroomRepository.findBy(enrollmentRequest.classroom, enrollmentRequest.level, module.code);
        return EnrollStudent.builder()
            .student(enrollmentRequest.student)
            .level(enrollmentRequest.level)
            .module(module)
            .classroom(classroom)
            .issueDate(enrollmentRequest.issueDate)
            .installments(enrollmentRequest.installments)
            .build();
    }

    private enroll(enrollStudent: EnrollStudent) {
        const nextSequenceEnrollNumber = this.enrollStudentRepository.getNextSequenceEnrollNumber();
        enrollStudent.generateEnrollNumber(nextSequenceEnrollNumber);
        enrollStudent.generateInvoices();

        this.enrollStudentRepository.persist(enrollStudent);
    }
}