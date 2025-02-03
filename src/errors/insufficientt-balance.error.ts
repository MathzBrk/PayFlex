export class InsufficienttBalanceError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'InsufficienttBalanceError';
    }
}