import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../modules/users/dtos/create-user.dto";
import { UserInterfaceRepository } from "../modules/users/repository/interfaces/user.interface.repository";
import {DuplicateEmailError} from "../errors/duplicate-email.error";
import {DuplicateCpfCnpjError} from "../errors/duplicate-cpf-cnpj.error";
import {InsufficienttBalanceError} from "../errors/insufficientt-balance.error";
import {plainToInstance} from "class-transformer";
import {CreateTransactionDto} from "../modules/transactions/dtos/create-transaction.dto";
import {JsonInputError} from "../errors/json-input.error";
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