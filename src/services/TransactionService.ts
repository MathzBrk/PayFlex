import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../domain/transaction/dto/createTransactionDto";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { UserRepository } from "../repositories/UserRepository";
import { TransactionCreateValidator } from "../domain/transaction/validator/transactionCreateValidator";

export class TransactionService {

    constructor(
        private transactionRepository: TransactionRepository,
        private userRepository: UserRepository,
        private transactionValidator: TransactionCreateValidator
    ) {}

    executeTransaction = async(transactionDto: CreateTransactionDto): Promise<Transaction> => {
        try{
            await this.transactionValidator.validate(transactionDto);


        } catch(error){
            console.log("Error during creating transaction ", error);
            throw error;
        }

        return this.transactionRepository.create(transactionDto);
    }

}