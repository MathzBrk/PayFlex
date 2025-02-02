export class DocumentIsRequired extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DocumentIsRequired";
    }
}
