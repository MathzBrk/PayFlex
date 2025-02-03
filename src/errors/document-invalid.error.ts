export class DocumentInvalidError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DocumentInvalidError";
    }
}