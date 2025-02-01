export class PartiesInvolvedNotFound extends Error {
    constructor(message: string){
        super(message);
        this.name = 'PartiesInvolvedNotFound';
    }
}