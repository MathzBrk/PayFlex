export class PayerIsAMerchantError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'PayerIsAMerchantError';
    }
}