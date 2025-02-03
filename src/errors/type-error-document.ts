export class TypeErrorDocument extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TypeErrorDocument';
    }
}
