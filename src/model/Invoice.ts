import InvoiceEvent from "./event/EventInvoice";

export default class Invoice {
    code: string;
    year: number;
    month: number;
    amount: number;
    events: InvoiceEvent[];

    constructor(code: string, month: number, year: number, amount: number) {
        this.code = code;
        this.year = year;
        this.month = month;
        this.amount = amount;
        this.events = [];
    }

    public getBalance(): number {
        return this.events.reduce((total, event) => {
            total -= event.amount;
            return total;
        }, this.amount);
    }
}