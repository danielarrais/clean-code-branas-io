import EnrollmentBalance from "../dto/EnrollmentBalance";
import PayInvoice from "../dto/PayInvoice";
import EnrollmentStudentRepository from "../repository/EnrollmentStudentRepository";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";

export default class PayInvoiceService {
    private enrollmentStudentRepository: EnrollmentStudentRepository; 

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.enrollmentStudentRepository = repositoryAbstractFactory.createEnrollmentStudentRepository();
    }

    execute(payInvoice: PayInvoice): void {
        const enrollmentStudent = this.enrollmentStudentRepository.findByStudentEnrollNumber(payInvoice.enrollNumber);
        if (!enrollmentStudent) throw new Error("Enrollment student not found");
        enrollmentStudent.payInvoice(payInvoice.month, payInvoice.year, payInvoice.amount);
    }
}