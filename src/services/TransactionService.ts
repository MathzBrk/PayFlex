import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../domain/transaction/dto/createTransactionDto";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionCreateValidator } from "../domain/transaction/validator/transactionCreateValidator";
import {UserRepository} from "../repositories/UserRepository";
import * as console from "node:console";

export class TransactionService {


    private transactionRepository: TransactionRepository;
    private transactionValidator: TransactionCreateValidator;
    private userRepository: UserRepository;

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.userRepository = new UserRepository();
        this.transactionValidator = new TransactionCreateValidator(this.userRepository);
    }


    executeTransaction = async(transactionDto: CreateTransactionDto): Promise<Transaction> => {
        try{
            await this.transactionValidator.validate(transactionDto);

            console.log("Transaction created successfully.");

            return this.transactionRepository.createTransaction(transactionDto);


        } catch(error){
            console.log("Error during creating transaction ", error);
            throw error;
        }
    }

}