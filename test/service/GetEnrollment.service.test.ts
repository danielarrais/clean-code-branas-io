import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import Module from "../../src/model/Module";
import ModuleRepository from "../../src/repository/ModuleRepository";
import DataBase from "../../src/repository/data-memory/DataBase";
import GetEnrollmentService from "../../src/service/GetEnrollment.service";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";

let moduleRepository: ModuleRepository;
let getEnrollmentService: GetEnrollmentService;
let enrollmentStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    moduleRepository = new ModuleRepositoryMemory();
    enrollmentStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
    getEnrollmentService = new GetEnrollmentService(new RepositoryMemoryFactory());
});

test("Should get enrollment by code with invoice balance", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);
    const enrollmentStudent = enrollmentStudentService.execute(enrollmentRequest);

    const enrollmentBalance = getEnrollmentService.execute(enrollmentStudent.student.enrollNumber);

    expect(enrollmentBalance.balance).toBe(16999.99);
    expect(enrollmentBalance.enrollNumber).toBe(enrollmentStudent.student.enrollNumber);
});

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findBy("1", "EM");
}