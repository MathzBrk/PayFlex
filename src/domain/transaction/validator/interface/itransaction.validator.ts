import {CreateTransactionDto} from "../../dto/createTransactionDto";

export interface ITransactionValidator{
    validate(transactionDto: CreateTransactionDto): Promise<void>;
}