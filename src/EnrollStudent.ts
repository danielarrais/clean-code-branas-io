import CPFValidation from "./CPFValidation";
import StudentRepository from "./StudentRepository";

export default class EnrollStudent {
    studentRepository: StudentRepository

    constructor() {
        this.studentRepository = new StudentRepository();
    }
    }

    private validateEnrollmentRequest(enrollmentRequest: any) {
        this.validateCPF(enrollmentRequest.student.cpf);
        this.validateName(enrollmentRequest.student.name);
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
}