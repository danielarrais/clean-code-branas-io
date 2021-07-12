export default class PayInvoice {
    enrollNumber: string;
    month: number;
    year: number;
    amount: number;

    constructor(enrollNumber: string, month: number, year: number, amount: number) {
        this.enrollNumber = enrollNumber;
        this.month = month;
        this.year = year;
        this.amount = amount;
    }
}