export class PartiesInvolvedNotFoundError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'PartiesInvolvedNotFoundError';
    }
}