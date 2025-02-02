import {IUserValidator} from "./interface/IUserValidator";
import {CreateUserDto} from "../dto/CreateUserDto";
import {DuplicateCpfCnpjError} from "../../../errors/DuplicateCpfCnpjError";
import {IUserRepository} from "../../../repositories/interfaces/IUserRepository";
import {DuplicateEmailError} from "../../../errors/DuplicateEmailError";

export class EmailValidator implements IUserValidator{

    constructor(private userRepository: IUserRepository){}


    async validate(userDto: CreateUserDto): Promise<void> {

        console.log("checking if there is anyone with this email")

        const existingUser = await this.userRepository.findByEmail(userDto.email);
        if(existingUser && existingUser.email === userDto.email){
            throw new DuplicateEmailError("There is already a user with this email");
        }

    }

}