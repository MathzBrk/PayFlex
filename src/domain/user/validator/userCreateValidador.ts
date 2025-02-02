import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/createUserDto";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import {DuplicateEmailError} from "../../../errors/DuplicateEmailError";
import {DuplicateCpfCnpjError} from "../../../errors/DuplicateCpfCnpjError";
import {DocumentIsRequired} from "../../../errors/DocumentIsRequired";
import { CPF, CNPJ } from '@julioakira/cpf-cnpj-utils'
import {InsufficientBalanceError} from "../../../errors/InsufficientBalanceError";


export class UserValidator {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository =  userRepository;
    }

    validate = async (userDto: CreateUserDto, formattedDocument: string) => {

        if ((userDto.balance ?? 0) < 0) {
            throw new InsufficientBalanceError("Balance can't be less than 0");
        }

        const existingUser = await this.userRepository.findFirst(userDto, formattedDocument);

        if(existingUser === null) {
            return;
        } else{
            if(existingUser.email === userDto.email){
                throw new DuplicateEmailError("There is already a user with this email");
            }

            console.log(existingUser)

            if(existingUser.document === formattedDocument){
                throw new DuplicateCpfCnpjError("There is already a user with this cpf/cnpj");
            }
        }

    }
}