import EnrollmentBalance from "../dto/EnrollmentBalance";
import EnrollmentStudentRepository from "../repository/EnrollmentStudentRepository";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";

export default class GetEnrollmentServico {
    private enrollmentStudentRepository: EnrollmentStudentRepository; 

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.enrollmentStudentRepository = repositoryAbstractFactory.createEnrollmentStudentRepository();
    }

    execute(enrollNumber: string): EnrollmentBalance {
        const enrollmentStudent = this.enrollmentStudentRepository.findByStudentEnrollNumber(enrollNumber);
        const invoicesBalance = enrollmentStudent?.getInvoiceBalance();

        return new EnrollmentBalance(enrollmentStudent.student.enrollNumber, invoicesBalance);
    }
}