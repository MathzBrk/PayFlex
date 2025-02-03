export class DuplicateCpfCnpjError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'DuplicateCpfCnpjError';
    }

}