import CPFValidation from "./CPFValidation";
import StudentRepository from "./Student.repository";
import Student from "./Student";

export default class StudentValidation {
    studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    execute(student: Student): void {
        this.validateCPF(student.cpf);
        this.validateName(student.name);
        this.validateUnique(student.cpf);
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
}