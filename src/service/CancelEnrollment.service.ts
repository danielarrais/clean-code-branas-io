import EnrollmentStatus from "../model/enum/EnrollmentStatus";
import EnrollmentStudentRepository from "../repository/EnrollmentStudentRepository";
import RepositoryAbstractFactory from "../repository/factory/RepositoryAbstractFactory";

export default class CancelEnrollmentService {

    private studentRepository: EnrollmentStudentRepository;

    constructor(repositoryAbstractFactory: RepositoryAbstractFactory) {
        this.studentRepository = repositoryAbstractFactory.createEnrollmentStudentRepository();
    }

    execute(enrollNumber: string) {
        this.studentRepository.changeStatus(enrollNumber, EnrollmentStatus.CANCELLED);
    }
}

