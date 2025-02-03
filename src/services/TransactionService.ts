import { Transaction } from "@prisma/client";
import { CreateTransactionDto } from "../domain/transaction/dto/createTransactionDto";
import { TransactionRepository } from "../repositories/TransactionRepository";
import {UserRepository} from "../repositories/user.repository";
import * as console from "node:console";
import axios from "axios";
import {DtoValidator} from "../utils/dto-validator";
import {plainToInstance} from "class-transformer";
import {ITransactionValidator} from "../domain/transaction/validator/interface/itransaction.validator";
import {PayeeValidator} from "../domain/transaction/validator/payee-validator";
import {PayerValidator} from "../domain/transaction/validator/payer-validator";

export class TransactionService {


    private transactionRepository: TransactionRepository;
    private validator: DtoValidator;
    private userRepository: UserRepository;
    private AUTHORIZATION_URL = "https://util.devi.tools/api/v2/authorize";

    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.userRepository = new UserRepository();
        this.validator = new DtoValidator();
    }

    public executeTransaction = async(transactionDto: CreateTransactionDto): Promise<Transaction> => {
        try{
            const createTransactionDto = plainToInstance(CreateTransactionDto,transactionDto);

            await this.validator.validate(createTransactionDto);
            console.log("Transaction dto validated.");

            const bussinessRuleValidators: ITransactionValidator[] = [
                new PayerValidator(this.userRepository),
                new PayeeValidator(this.userRepository)
            ];

            for (const validator of bussinessRuleValidators) {
                await validator.validate(createTransactionDto);
            }

            const isAuthorized = await this.authorizeTransaction();

            if(!isAuthorized){
                throw new Error("Unauthorized transaction");
            }

            console.log("Transaction created successfully.");

            return this.transactionRepository.createTransaction(createTransactionDto);


        } catch(error){
            console.log("Error during creating transaction ", error);
            throw error;
        }
    }

    public getAllTransactions = async(): Promise<Transaction[]> => {

        const transactions: Transaction[] = await this.transactionRepository.getAllTransactions();

        if (!transactions || transactions.length === 0) {
            console.error("No transactions found");
        }

        console.log(`${transactions.length} transactions found.`);
        return transactions;
    }

    public getTransactionsBytime = async(seconds: number): Promise<Transaction[]> => {
        const transactions: Transaction[] = await this.transactionRepository.getTransactionsByTime(seconds);

        if (!transactions || transactions.length === 0) {
            console.error("No transactions found in the given time frame.");
        }

        console.log(`${transactions.length} transactions found in the last ${seconds} seconds.`);
        return transactions;
    }


    private async authorizeTransaction(): Promise<boolean> {
        console.log("Trying to authorize transaction");
        try {

            const response = await axios.get(this.AUTHORIZATION_URL, {timeout: 5000});

            if(response.data.hasOwnProperty('data') && response.data.data && typeof response.data.data.authorization === "boolean"){
                console.log("Transaction authorized", response.data.data.authorization);
                return response.data.data.authorization;
            } else{
                console.log("Error during authorize transaction");
                return false;
            }
        } catch (error) {
            console.error("authorization error ");
            return false;
        }
    }

}