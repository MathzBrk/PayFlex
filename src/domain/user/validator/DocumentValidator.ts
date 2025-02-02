import {IUserValidator} from "./interface/IUserValidator";
import {CreateUserDto} from "../dto/CreateUserDto";
import {IUserRepository} from "../../../repositories/interfaces/IUserRepository";
import {DuplicateCpfCnpjError} from "../../../errors/DuplicateCpfCnpjError";

export class DocumentValidator implements IUserValidator {
    constructor(private userRepository: IUserRepository, private formattedDocument: string) {}

    async validate(userDto: CreateUserDto): Promise<void> {

        console.log("Checking if there is anyone with this document")

        const existingUser = await this.userRepository.findFirst(userDto, this.formattedDocument);
        if (existingUser && existingUser.document === this.formattedDocument) {
            throw new DuplicateCpfCnpjError("There is already a user with this cpf/cnpj");
        }

    }

}