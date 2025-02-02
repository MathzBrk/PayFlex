import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/createUserDto";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import {DuplicateEmailError} from "../../../errors/DuplicateEmailError";
import {DuplicateCpfCnpjError} from "../../../errors/DuplicateCpfCnpjError";
import {DocumentIsRequired} from "../../../errors/DocumentIsRequired";
import {DocumentIsNotRequired} from "../../../errors/DocumentIsNotRequired";

export class UserValidator {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository =  userRepository;
    }

    validate = async (userDto: CreateUserDto) => {

        if (userDto.isMerchant) {
            if (!userDto.cnpj) {
                throw new DocumentIsRequired("CNPJ is required to create a merchant");
            }
            if (userDto.cpf) {
                throw new DocumentIsNotRequired("A merchant can't have CPF");
            }
        } else {
            if (!userDto.cpf) {
                throw new DocumentIsRequired("CPF is required to create a normal user");
            }
            if (userDto.cnpj) {
                throw new DocumentIsNotRequired("A normal user can't have CNPJ");
            }
        }

        const existingUser = await this.userRepository.findFirst(userDto);

        if(existingUser === null) {
            return;
        } else{
            if(existingUser.email === userDto.email){
                throw new DuplicateEmailError("There is already a user with this email");
            }

            if(existingUser.cpf === userDto.cpf || existingUser.cnpj === userDto.cnpj){
                throw new DuplicateCpfCnpjError("There is already a user with this cpf/cnpj");
            }
        }

    }
}