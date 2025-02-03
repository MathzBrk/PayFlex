
export class TransactionStats {
    count: number;
    sum: number;
    min: number;
    max: number;
    avg: number;

    constructor(count: number, sum: number, min: number, max: number, avg: number) {
        this.count = count;
        this.sum = sum;
        this.min = min;
        this.max = max;
        this.avg = avg;
    }
}