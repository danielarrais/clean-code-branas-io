import Student from "./Student";
import Invoice from "./Invoice";
import Module from "./Module";
import Classroom from "./Classroom";
import EnrollmentStudentBuilder from "./builder/EnrollmentStudentBuilder";

export default class EnrollmentStudent {
    student: Student;
    level: string;
    module: Module;
    issueDate: Date;
    classroom: Classroom;
    invoices: Invoice[];
    installments: number;

    constructor(student: Student, level: string, module: Module, classroom: Classroom, issueDate: Date, installments: number) {
        this.student = student;
        this.level = level;
        this.module = module;
        this.classroom = classroom;
        this.issueDate = issueDate;
        this.installments = installments;
        this.invoices = [];
    }

    public generateEnrollNumber(enrollSequence: string): void {
        const currentYear = this.issueDate.getFullYear();
        const enrollSequencePad = enrollSequence.padStart(4, "0");
        this.student.enrollNumber = `${currentYear}${this.level}${this.module.code}${this.classroom.code}${enrollSequencePad}`;
    }

    public generateInvoices(): void {
        let installmentAmount = Math.trunc((this.module.price/this.installments)*100)/100;

        for (let i = 1; i <= this.installments; i++) {
            this.invoices.push(new Invoice(this.student.enrollNumber, i, this.issueDate.getFullYear(), installmentAmount));
        }

        const total = this.invoices.reduce((total, invoice) => {
            total += invoice.amount;
            return total;
        }, 0);
        
        const rest = Math.trunc((this.module.price - total)*100)/100
        this.invoices[this.installments - 1].amount = installmentAmount + rest;
    }

    public getInvoiceBalance(): number {
        return this.invoices.reduce((total, invoice) => {
            total += invoice.getBalance();
            return total;
        }, 0);
    }

    public static builder() {
        return new EnrollmentStudentBuilder();
    }
}