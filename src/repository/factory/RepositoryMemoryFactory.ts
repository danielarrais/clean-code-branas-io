import ClassroomRepository from "../ClassroomRepository"
import ClassroomRepositoryMemory from "../ClassroomRepositoryMemory";
import EnrollmentStudentRepository from "../EnrollmentStudentRepository";
import EnrollmentStudentRepositoryMemory from "../EnrollmentStudentRepositoryMemory";
import ModuleRepository from "../ModuleRepository"
import ModuleRepositoryMemory from "../ModuleRepositoryMemory";
import RepositoryAbstractFactory from "./RepositoryAbstractFactory";

export default class RepositoryMemoryFactory implements RepositoryAbstractFactory {
    createModuleRepository(): ModuleRepository {
        return new ModuleRepositoryMemory();
    }

    createClassroomRepository(): ClassroomRepository {
        return new ClassroomRepositoryMemory();
    }

    createEnrollmentStudentRepository(): EnrollmentStudentRepository {
        return new EnrollmentStudentRepositoryMemory();
    }
}
