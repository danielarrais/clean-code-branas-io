import Student from "../model/Student";
import EnrollmentRequest from "../model/EnrollmentRequest";
import DateUtil from "../util/Date.util";

export default class EnrollmentRequestValidation {

    public execute(enrollmentRequest: EnrollmentRequest): void {

    }

    validateMinimumAge(studentBirthDate: Date, muduleCode: string) {
        const mudule = "";
        const age = DateUtil.calculateAge(studentBirthDate)
    }
}