import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../createUserDto";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import {DuplicateEmailError} from "../../../errors/DuplicateEmailError";
import {DuplicateCpfCnpjError} from "../../../errors/DuplicateCpfCnpjError";

export class UserValidator {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository =  userRepository;
    }

    validate = async (userDto: CreateUserDto) => {
        const existingUser = await this.userRepository.findFirst(userDto);

        if(existingUser === null)
            return;

        if(existingUser.email === userDto.email){
            throw new DuplicateEmailError("There is already a user with this email");
        }
        
        if(existingUser.cpf == userDto.cpf || existingUser.cnpj === userDto.cnpj){
            throw new DuplicateCpfCnpjError("There is already a user with this cpf/cnpj");
        }
    }
}