export class DocumentIsRequiredError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DocumentIsRequiredError";
    }
}
