import { InsufficientBalanceError } from "../../../errors/InsufficientBalanceError";
import { PartiesInvolvedNotFound } from "../../../errors/PartiesInvolvedNotFound";
import { PayerIsAMerchantError } from "../../../errors/PayerIsAMerchantError";
import { UserRepository } from "../../../repositories/UserRepository";
import { CreateTransactionDto } from "../dto/createTransactionDto";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {JsonInputError} from "../../../errors/JsonInputError";

export class TransactionCreateValidator {
    
    constructor(private userRepository: UserRepository) {}

    validate = async(transactionDto: CreateTransactionDto) => {
        console.log("Validating transactionDto...");

        const createTransactionDto = plainToInstance(CreateTransactionDto, transactionDto);
        const errors = await validate(createTransactionDto);

        if (errors.length > 0) {
            const formattedErrors = errors
                .map(err => {
                    const messages = Object.values(err.constraints || {}).join(', ');
                    return `${err.property}: ${messages}`;
                })
                .join('; ');
            throw new JsonInputError(`Validation failed: ${formattedErrors}`)
        }

        const payer = await this.userRepository.findById(createTransactionDto.payer);
        const payee = await this.userRepository.findById(createTransactionDto.payee);

        if(payer === null){
            throw new PartiesInvolvedNotFound(`Payer with id '${createTransactionDto.payer}' not found`);
        } else{
            if(payer.isMerchant){
                throw new PayerIsAMerchantError("Merchants can't send money");
            }

            if(payer.balance < createTransactionDto.value){
                throw new InsufficientBalanceError("Payer doesn't have sufficient balance for this transaction");
            }
        }

        if(payee === null){
            throw new PartiesInvolvedNotFound(`Payee with id '${createTransactionDto.payee}' not found`);
        }
    }

}