export default class EnrollmentBalance {
    enrollNumber: string;
    balance: number; 

    constructor(enrollNumber: string, balance: number) {
        this.enrollNumber = enrollNumber;
        this.balance = balance;
    }
}