export default class Invoice {
    code: string;
    year: number;
    month: number;
    amount: number;

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.year = year;
        this.month = month;
        this.amount = amount;
    }
}