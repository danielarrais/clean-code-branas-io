import CancelEnrollmentService from "../../src/service/CancelEnrollment.service";
import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import EnrollmentStudentRepositoryMemory from "../../src/repository/EnrollmentStudentRepositoryMemory";
import EnrollmentStudentRepository from "../../src/repository/EnrollmentStudentRepository";
import Module from "../../src/model/Module";
import ModuleRepository from "../../src/repository/ModuleRepository";
import DataBase from "../../src/repository/data-memory/DataBase";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";
import EnrollmentStatus from "../../src/model/enum/EnrollmentStatus";

let enrollmentStudentRepository: EnrollmentStudentRepository;
let moduleRepository: ModuleRepository;
let cancelEnrollmentService: CancelEnrollmentService;
let enrollmentStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    enrollmentStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
    moduleRepository = new ModuleRepositoryMemory();
    enrollmentStudentRepository = new EnrollmentStudentRepositoryMemory();
    cancelEnrollmentService = new CancelEnrollmentService(new RepositoryMemoryFactory());
});

test("Should cancel enrollment", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);
    const enrollmentStudent = enrollmentStudentService.execute(enrollmentRequest);
    const enrollNumber = enrollmentStudent.student.enrollNumber;

    cancelEnrollmentService.execute(enrollNumber);
    
    const enrollmentStudentUpdated = enrollmentStudentRepository.findByStudentEnrollNumber(enrollNumber);

    expect(enrollmentStudentUpdated.status).toBe(EnrollmentStatus.CANCELLED);
});

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findBy("1", "EM");
}