import {UserInterfaceValidator} from "./interface/user.interface.validator";
import {CreateUserDto} from "../dto/create-user.dto";
import {DuplicateCpfCnpjError} from "../../../errors/duplicate-cpf-cnpj.error";
import {UserInterfaceRepository} from "../../../repositories/interfaces/user.interface.repository";
import {DuplicateEmailError} from "../../../errors/duplicate-email.error";

export class EmailValidator implements UserInterfaceValidator{

    constructor(private userRepository: UserInterfaceRepository){}


    async validate(userDto: CreateUserDto): Promise<void> {

        console.log("checking if there is anyone with this email")

        const existingUser = await this.userRepository.findByEmail(userDto.email);
        if(existingUser && existingUser.email === userDto.email){
            throw new DuplicateEmailError("There is already a user with this email");
        }

    }

}