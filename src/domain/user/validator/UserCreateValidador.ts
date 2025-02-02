import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/CreateUserDto";
import { IUserRepository } from "../../../repositories/interfaces/IUserRepository";
import {DuplicateEmailError} from "../../../errors/DuplicateEmailError";
import {DuplicateCpfCnpjError} from "../../../errors/DuplicateCpfCnpjError";
import {InsufficientBalanceError} from "../../../errors/InsufficientBalanceError";
import {plainToInstance} from "class-transformer";
import {CreateTransactionDto} from "../../transaction/dto/createTransactionDto";
import {JsonInputError} from "../../../errors/JsonInputError";
import {validate, ValidationError} from "class-validator";

export class UserValidator {

    validate = async (userDto: CreateUserDto) => {
        console.log('Validating userDto...', userDto);

        const createUserDto = plainToInstance(CreateUserDto,userDto);
        const errors: ValidationError[] = await validate(createUserDto);

        if (errors.length > 0) {
            const formattedErrors = errors
                .map((err: ValidationError) => {
                    const messages = Object.values(err.constraints || {}).join(', ');
                    return `${err.property}: ${messages}`;
                })
                .join('; ');
            throw new JsonInputError(`Validation failed: ${formattedErrors}`);
        }

    }

}