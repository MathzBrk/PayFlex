import {UserValidatorInterface} from "./interface/user-validator.interface";
import {CreateUserDto} from "../dto/create-user.dto";
import {UserInterfaceRepository} from "../../../repositories/interfaces/user.interface.repository";
import {DuplicateCpfCnpjError} from "../../../errors/duplicate-cpf-cnpj.error";

export class DocumentValidator implements UserValidatorInterface {
    constructor(private userRepository: UserInterfaceRepository, private formattedDocument: string) {}

    async validate(userDto: CreateUserDto): Promise<void> {

        console.log("Checking if there is anyone with this document")

        const existingUser = await this.userRepository.findFirst(userDto, this.formattedDocument);
        if (existingUser && existingUser.document === this.formattedDocument) {
            throw new DuplicateCpfCnpjError("There is already a user with this cpf/cnpj");
        }

    }

}