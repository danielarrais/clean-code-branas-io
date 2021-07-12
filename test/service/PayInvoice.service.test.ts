import EnrollStudentService from "../../src/service/EnrollStudent.service";
import Student from "../../src/model/Student";
import EnrollmentRequest from "../../src/dto/EnrollmentRequest";
import ModuleRepositoryMemory from "../../src/repository/ModuleRepositoryMemory";
import Module from "../../src/model/Module";
import ModuleRepository from "../../src/repository/ModuleRepository";
import DataBase from "../../src/repository/data-memory/DataBase";
import GetEnrollmentService from "../../src/service/GetEnrollment.service";
import RepositoryMemoryFactory from "../../src/repository/factory/RepositoryMemoryFactory";
import PayInvoice from "../../src/dto/PayInvoice";
import PayInvoiceService from "../../src/service/PayInvoice.service";

let moduleRepository: ModuleRepository;
let getEnrollmentService: GetEnrollmentService;
let payInvoiceService: PayInvoiceService;
let enrollmentStudentService: EnrollStudentService;

beforeEach(() => {
    DataBase.resetDataBase();
    moduleRepository = new ModuleRepositoryMemory();
    enrollmentStudentService = new EnrollStudentService(new RepositoryMemoryFactory());
    payInvoiceService = new PayInvoiceService(new RepositoryMemoryFactory());
    getEnrollmentService = new GetEnrollmentService(new RepositoryMemoryFactory());
});

test("Should pay enrollment invoice", () => {
    const module = getModuleWithClassroom();
    const student = new Student("Daniel Arrais", "33796308023", new Date(1975));
    const enrollmentRequest = new EnrollmentRequest(student, new Date(), module.code, module.level, "A", 12);
    const enrollmentStudent = enrollmentStudentService.execute(enrollmentRequest);
    const enrollNumber = enrollmentStudent.student.enrollNumber;

    const payInvoice = new PayInvoice(enrollNumber, 2, 2021, 500);
    payInvoiceService.execute(payInvoice);
    
    const enrollmentBalance = getEnrollmentService.execute(enrollmentStudent.student.enrollNumber);

    expect(enrollmentBalance.balance).toBe(16499.99);
});

const getModuleWithClassroom = (): Module => {
    return moduleRepository.findBy("1", "EM");
}