export default class EnrollStudent {


    execute(enrollmentRequest: any) {
        if (!/^([A-Za-z]+)+([A-Za-z])+$/.test(enrollmentRequest.student.name)) {
            throw new Error("Invalid student name")
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