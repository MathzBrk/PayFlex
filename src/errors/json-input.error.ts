export class JsonInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "JsonInputError";
    }
}