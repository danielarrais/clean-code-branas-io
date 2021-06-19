import Student from "../Student";
import Module from "../Module";
import Classroom from "../Classroom";
import Invoice from "../Invoice";
import EnrollStudent from "../EnrollStudent";

export default class EnrollStudentBuilder {
    private _student!: Student;
    private _level!: string;
    private _module!: Module;
    private _issueDate!: Date;
    private _classroom!: Classroom;
    private _installments!: number;

    constructor() {
    }

    student(value: Student): EnrollStudentBuilder {
        this._student = value;
        return this;
    }

    level(value: string): EnrollStudentBuilder {
        this._level = value;
        return this;
    }

    module(value: Module): EnrollStudentBuilder {
        this._module = value;
        return this;
    }

    issueDate(value: Date): EnrollStudentBuilder {
        this._issueDate = value;
        return this;
    }

    classroom(value: Classroom): EnrollStudentBuilder {
        this._classroom = value;
        return this;
    }

    installments(value: number): EnrollStudentBuilder {
        this._installments = value;
        return this;
    }

    public build(): EnrollStudent {
        return new EnrollStudent(this._student, this._level, this._module, this._classroom, this._issueDate, this._installments);
    }
}