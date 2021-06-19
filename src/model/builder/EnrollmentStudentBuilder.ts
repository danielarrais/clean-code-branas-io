import Student from "../Student";
import Module from "../Module";
import Classroom from "../Classroom";
import Invoice from "../Invoice";
import EnrollmentStudent from "../EnrollmentStudent";

export default class EnrollmentStudentBuilder {
    private _student!: Student;
    private _level!: string;
    private _module!: Module;
    private _issueDate!: Date;
    private _classroom!: Classroom;
    private _installments!: number;

    constructor() {
    }

    student(value: Student): EnrollmentStudentBuilder {
        this._student = value;
        return this;
    }

    level(value: string): EnrollmentStudentBuilder {
        this._level = value;
        return this;
    }

    module(value: Module): EnrollmentStudentBuilder {
        this._module = value;
        return this;
    }

    issueDate(value: Date): EnrollmentStudentBuilder {
        this._issueDate = value;
        return this;
    }

    classroom(value: Classroom): EnrollmentStudentBuilder {
        this._classroom = value;
        return this;
    }

    installments(value: number): EnrollmentStudentBuilder {
        this._installments = value;
        return this;
    }

    public build(): EnrollmentStudent {
        return new EnrollmentStudent(this._student, this._level, this._module, this._classroom, this._issueDate, this._installments);
    }
}