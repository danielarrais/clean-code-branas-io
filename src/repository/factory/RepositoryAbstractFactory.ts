import ClassroomRepository from "../ClassroomRepository";
import EnrollmentStudentRepository from "../EnrollmentStudentRepository";
import ModuleRepository from "../ModuleRepository";

export default interface RepositoryAbstractFactory {
    createModuleRepository(): ModuleRepository;
    createClassroomRepository(): ClassroomRepository;
    createEnrollmentRepository(): EnrollmentStudentRepository;
}