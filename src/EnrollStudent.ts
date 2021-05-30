import CPFValidation from "./CPFValidation";
import StudentRepository from "./StudentRepository";
import EnrollmentRequest from "./EnrollmentRequest";

export default class EnrollStudent {
    studentRepository: StudentRepository

    constructor() {
        this.studentRepository = new StudentRepository();
    }

    execute(enrollmentRequest: EnrollmentRequest): string {
        this.validateEnrollmentRequest(enrollmentRequest);
        this.enroll(enrollmentRequest);

        return enrollmentRequest.student.enrollNumber
    }

    private validateEnrollmentRequest(enrollmentRequest: any) {
        this.validateCPF(enrollmentRequest.student.cpf);
        this.validateName(enrollmentRequest.student.name);
        this.validateUnique(enrollmentRequest.student.cpf);
    }

    private validateUnique(cpf: string): void {
        if (this.studentRepository.findByCpf(cpf)) {
            throw new Error("Enrollment with duplicated student is not allowed");
        }
    }

    private validateName(name: string): void {
        if(!/^([A-Za-z]+ )+([A-Za-z])+$/.test(name)) {
            throw new Error("Invalid student name");
        }
    }

    private validateCPF(cpf: string): void {
        if (!CPFValidation.exec(cpf)) {
            throw new Error("Invalid student cpf");
        }
    }

    private enroll(enrollmentRequest: EnrollmentRequest) {
        const student = enrollmentRequest.student;
        const nextSequenceEnrollNumber = this.studentRepository.getNextSequenceEnrollNumber();

        student.enrollNumber = enrollmentRequest.generateEnrollNumber(nextSequenceEnrollNumber);

        this.studentRepository.persist(student);
    }
}