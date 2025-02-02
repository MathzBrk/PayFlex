import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../domain/transaction/dto/createTransactionDto";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionCreateValidator } from "../domain/transaction/validator/transactionCreateValidator";
import {UserRepository} from "../repositories/UserRepository";
import * as console from "node:console";
import axios from "axios";

export class TransactionService {


    private transactionRepository: TransactionRepository;
    private transactionValidator: TransactionCreateValidator;
    private userRepository: UserRepository;
    private AUTHORIZATION_URL = "https://util.devi.tools/api/v2/authorize";

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.userRepository = new UserRepository();
        this.transactionValidator = new TransactionCreateValidator(this.userRepository);
    }


    executeTransaction = async(transactionDto: CreateTransactionDto): Promise<Transaction> => {
        try{

            await this.transactionValidator.validate(transactionDto);
            console.log("Transaction dto validated.");

            const isAuthorized = await this.authorizeTransaction();

            if(!isAuthorized){
                throw new Error("Unauthorized transaction");
            }

            console.log("Transaction created successfully.");

            return this.transactionRepository.createTransaction(transactionDto);


        } catch(error){
            console.log("Error during creating transaction ", error);
            throw error;
        }
    }

    private async authorizeTransaction(): Promise<boolean> {
        try {
            const response = await axios.get(this.AUTHORIZATION_URL);

            if(response.data.hasOwnProperty('data') && response.data.data && typeof response.data.data.authorization === "boolean"){
                console.log("Transaction authorized", response.data.data.authorization);
                return response.data.data.authorization;
            } else{
                console.log("Error during authorize transaction", response);
                return false;
            }
        } catch (error) {
            console.error("authorization error ", error);
            return false;
        }
    }

}