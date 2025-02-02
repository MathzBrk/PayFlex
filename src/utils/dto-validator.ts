import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../domain/user/dto/CreateUserDto";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import {DuplicateEmailError} from "../errors/DuplicateEmailError";
import {DuplicateCpfCnpjError} from "../errors/DuplicateCpfCnpjError";
import {InsufficientBalanceError} from "../errors/InsufficientBalanceError";
import {plainToInstance} from "class-transformer";
import {CreateTransactionDto} from "../domain/transaction/dto/createTransactionDto";
import {JsonInputError} from "../errors/JsonInputError";
import {validate, ValidationError} from "class-validator";

export class DtoValidator {

    validate = async (dto: any) => {
        console.log('Validating dto', dto);

        const errors: ValidationError[] = await validate(dto);

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